import { Button, Tabs, Card, List, InputNumber, Space, Collapse } from 'antd'
import Countdown from 'antd/lib/statistic/Countdown'
import {
  useContractLoader,
  useGasPrice,
  useContractReader,
  useBlockNumber,
} from 'eth-hooks'
import { useBlockNumberContext, useEthersContext } from 'eth-hooks/context'
import React, { ReactElement, useContext } from 'react'
// import { LotteryFactory as LotteryContract } from 'src/generated/contract-types'
import { Lottery as LotteryContract } from 'src/generated/contract-types'
import styled from 'styled-components'
import { useAppContracts } from '../hooks/useAppContracts'
import { transactor } from 'eth-components/functions'
import { EthComponentsSettingsContext } from 'eth-components/models'
import { useIsMounted } from 'usehooks-ts'
import { useState, useEffect, useCallback } from 'react'
import { parseEther, formatEther } from '@ethersproject/units'
import { BigNumber } from '@ethersproject/bignumber'
import { round } from 'src/helpers/utils'
import PreviousDrawTab from 'src/components/Lottery/PreviousDrawTab'
import CurrentDrawTab from 'src/components/Lottery/CurrentDrawTab'
import { isBigNumberish } from '@ethersproject/bignumber/lib/bignumber'
import LotteryBalances from 'src/components/Lottery/LotteryBalances'
import ClaimTab from 'src/components/Lottery/ClaimTab'
import { useContractReaderWithFormatter } from 'src/hooks/useContractReaderWithFormatter'
import {
  formatArrayToBoolean,
  formatBalances,
  formatDraws,
  formatToString,
  formatToTimestamp,
} from 'src/helpers/formatters'

const { TabPane } = Tabs

export interface Draw {
  id: number
  numbers: any[]
  completed: boolean
}

export enum TicketStatus {
  Pending = 'Pending...',
  Lost = 'Loosing ticket',
  TwoWinningNumber = '2 winning numbers',
  ThreeWinningNumber = '3 winning numbers',
  FourWinningNumber = '4 winning numbers',
  FiveWinningNumber = '5 winning numbers',
}

export interface Ticket {
  id: number
  numbers: number[]
  drawNumber: number
  claimed: boolean
  status: TicketStatus
  rewardsAmount: string
}

export interface ContractBalances {
  fullBalance: string
  claimableBalance: string
  devFeeBalance: string
  stakingBalance: string
  burnBalance: string
}

export const splitRatio = [
  {
    goodNumbers: 2,
    percentOfBalance: 0.09,
  },
  {
    goodNumbers: 3,
    percentOfBalance: 0.14,
  },
  {
    goodNumbers: 4,
    percentOfBalance: 0.24,
  },
  {
    goodNumbers: 5,
    percentOfBalance: 0.49,
  },
]

export const StyledCard = styled(Card)`
  margin: 30px auto !important;
  width: '100%';
`

export const MyTicket = styled.div`
  display: flex;
  flex: 1 0 0;
  & span {
    margin: 20px;
  }
`

export const TicketNumbers = styled.div`
  display: flex;
  flex-grow: 1;
  & span {
    flex-grow: 1;
  }
`

export const Balance = styled.div`
  font-size: 2em;
  text-align: center;
`

// let deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30 // Moment is also OK

export const Lottery = (): ReactElement => {
  const ethersContext = useEthersContext()
  const appContract = useAppContracts()

  const readContracts = useContractLoader(appContract)
  const writeContracts = useContractLoader(appContract, ethersContext.signer)
  const ethComponentsSettings = useContext(EthComponentsSettingsContext)
  const gasPrice = useGasPrice(ethersContext.chainId, 'fast')

  const tx = transactor(ethComponentsSettings, ethersContext?.signer, gasPrice)

  const lotteryWriteContract = writeContracts['Lottery'] as LotteryContract
  const lotteryReadContract = readContracts['Lottery'] as LotteryContract

  const [amountToBuy, setAmountToBuy] = useState(1)
  const ticketPrice = 0.005

  const buyTickets = async () => {
    const value = amountToBuy * ticketPrice
    const result = await tx?.(
      lotteryWriteContract.buyMultipleRandomTicket(amountToBuy, {
        value: parseEther(value.toString()),
      })
    )
  }

  const claimFunction = async () => {
    const result = await tx?.(lotteryWriteContract.claim())
  }

  // Function called when user is looking the previous draws. It request and format tickets of the draw
  const getOwnerTicketsForDraw = async (drawId: number): Promise<Ticket[]> => {
    const result = await lotteryReadContract._getTicketsOfOwnerForDraw(
      ethersContext.account ?? '',
      drawId
    )

    if (!result) return []

    const tickets: Ticket[] = []

    if (result[0]) {
      for (let i = 0; i < result.length; i++) {
        const ticket = result[i]
        let status: TicketStatus
        switch (ticket[3]) {
          case 0:
            status = TicketStatus.Pending
            break
          case 1:
            status = TicketStatus.Lost
            break
          case 2:
            status = TicketStatus.TwoWinningNumber
            break
          case 3:
            status = TicketStatus.ThreeWinningNumber
            break
          case 4:
            status = TicketStatus.FourWinningNumber
            break

          default:
            status = TicketStatus.FiveWinningNumber
            break
        }

        tickets.push({
          id: i,
          numbers: ticket[0],
          drawNumber: ticket[1].toNumber(),
          claimed: ticket[2],
          status,
          rewardsAmount: ticket[4].toString(),
        })
      }
    }

    return tickets
  }

  const draw = async () => {
    const result = await tx?.(lotteryWriteContract.draw())
  }

  const ownerTickets = useContractReader<any[]>(lotteryReadContract, {
    contractName: 'Lottery',
    functionName: '_getCurrentDrawTicketsOfOwner',
    functionArgs: [ethersContext.account],
  })

  const nextLotteryTime = useContractReaderWithFormatter<string, number>(
    lotteryReadContract,
    {
      contractName: 'Lottery',
      functionName: 'nextLotteryAt',
    },
    formatToTimestamp
  )
  console.log(nextLotteryTime)
  console.log(Date.now() / 1000)
  // deadline = deadline + 1

  const draws = useContractReaderWithFormatter<any[], Draw[]>(
    lotteryReadContract,
    {
      contractName: 'Lottery',
      functionName: '_getAllDraws',
    },
    formatDraws
  )

  const contractBalance = useContractReaderWithFormatter<string, string>(
    lotteryReadContract,
    {
      contractName: 'Lottery',
      functionName: '_getBalance',
    },
    formatToString
  )
  // const contractBalance = ''

  // TODO : factorize below
  const blockNumber = useBlockNumberContext()
  const [tickets, setTickets] = useState<any[] | undefined>()
  useEffect(() => {
    const callFunc = async () => {
      if (lotteryReadContract && ownerTickets) {
        const newTickets = []
        for (let i = 0; i < ownerTickets[0].length; i++) {
          const element = ownerTickets[0][i]
          const res = await lotteryReadContract._getTicket(element)

          newTickets.push([element, ...res])
        }
        setTickets(newTickets.length > 0 ? newTickets : undefined)
      }
    }
    void callFunc()
  }, [lotteryReadContract, ownerTickets, blockNumber])

  const allBalances = useContractReaderWithFormatter<any[], ContractBalances>(
    lotteryReadContract,
    {
      contractName: 'Lottery',
      functionName: '_getAllBalances',
    },
    formatBalances
  )

  const claimableAmountOfAddress = useContractReaderWithFormatter<
    string,
    string
  >(
    lotteryReadContract,
    {
      contractName: 'Lottery',
      functionName: 'getClaimableAmountOfAddress',
      functionArgs: [ethersContext.account ?? ''],
    },
    formatToString
  )

  // const [needToDraw, setNeedToDraw] = useState<boolean>(
  //   nextLotteryTime ? nextLotteryTime < Date.now() : false
  // )
  const needToDraw = useContractReaderWithFormatter<boolean[], boolean>(
    lotteryReadContract,
    {
      contractName: 'Lottery',
      functionName: 'needToDraw',
    },
    formatArrayToBoolean
  )
  console.log(needToDraw)

  return (
    <div
      style={{
        border: '1px solid #cccccc',
        padding: 32,
        width: 600,
        margin: 'auto',
        marginTop: 64,
        position: 'relative',
      }}
    >
      <h2>Lottery</h2>
      {needToDraw === false ? (
        <Countdown
          title="Next draw in..."
          value={nextLotteryTime}
          onFinish={() => console.log('done')}
          style={{ position: 'absolute', top: 20, right: 20 }}
        />
      ) : (
        <p
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            color: 'rgba(255,255,255,.85)',
            fontSize: '24px',
          }}
        >
          Waiting for draw...
        </p>
      )}

      {needToDraw && (
        <Button
          style={{ width: '100%', margin: '30px auto' }}
          type="dashed"
          onClick={draw}
        >
          {`Don't want to wait admin ? Draw yourself, it's time !`}
        </Button>
      )}

      <Tabs defaultActiveKey="1" centered>
        <TabPane tab="Next draw" key="1">
          <CurrentDrawTab
            contractBalance={contractBalance}
            buyTickets={buyTickets}
            tickets={tickets}
            onChange={(value: number) => {
              setAmountToBuy(value)
            }}
          />
        </TabPane>
        <TabPane tab="Last draw" key="2">
          <PreviousDrawTab
            allDraws={draws}
            getOwnerTicketsForDraw={getOwnerTicketsForDraw}
          />
        </TabPane>
        <TabPane tab="Balances" key="3">
          <LotteryBalances contractBalances={allBalances} />
        </TabPane>
        <TabPane tab="Claim" key="4">
          <ClaimTab
            claimFunction={claimFunction}
            claimableAmount={claimableAmountOfAddress}
          />
        </TabPane>
      </Tabs>
    </div>
  )
}
