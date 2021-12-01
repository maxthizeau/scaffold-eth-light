/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { ReactElement, useContext, useEffect, useState } from 'react'
import { Input, Button, Form } from 'antd'
import { useAppContracts } from 'src/hooks/useAppContracts'
import { useContractLoader, useContractReader, useGasPrice } from 'eth-hooks'
import { useEthersContext } from 'eth-hooks/context'
import {
  StaticJsonRpcProvider,
  TransactionRequest,
} from '@ethersproject/providers'
import { MyFirstContract } from 'src/generated/contract-types'
import { transactor, TTransactor } from 'eth-components/functions'
import { EthComponentsSettingsContext } from 'eth-components/models'
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  TransactionReceipt,
  TransactionResponse,
} from '@ethersproject/abstract-provider'
import { toEth } from 'src/helpers/utils'
import { formatEther, parseEther } from '@ethersproject/units'
import { BigNumber } from '@ethersproject/bignumber'
import { useIsMounted } from 'usehooks-ts'
import { IScaffoldAppProviders } from '../hooks/useScaffoldAppProviders'

export interface IDebugPageProps {
  mainnetProvider: StaticJsonRpcProvider
  scaffoldAppProviders: IScaffoldAppProviders
  yourCurrentBalance: any
  price: number
}

export type ITransactionReceiptAndResponse = TransactionReceipt &
  TransactionResponse

export const Debug = (
  props: IDebugPageProps
): ReactElement<IDebugPageProps> => {
  const [newPurpose, setNewPurpose] = useState('loading...')

  const ethersContext = useEthersContext()

  // ⚙ contract config
  // get the contracts configuration for the app
  const appContractConfig = useAppContracts()
  // Load in your 📝 readonly contract and read a value from it:
  const readContracts = useContractLoader(appContractConfig)
  // If you want to make 🔐 write transactions to your contracts, pass the signer:
  const writeContracts = useContractLoader(
    appContractConfig,
    ethersContext?.signer
  )

  const myFirstContractRead = readContracts[
    'MyFirstContract'
  ] as MyFirstContract

  const myFirstContractWrite = writeContracts[
    'MyFirstContract'
  ] as MyFirstContract

  const purpose =
    useContractReader<string>(myFirstContractRead, {
      contractName: 'MyFirstContract',
      functionName: 'purpose',
    }) ?? ''

  // const test = readContracts['MyFirstContract'] as MyFirstContract
  // const contractBalance = myFirstContractRead.balance()

  const isMounted = useIsMounted()
  const [contractBalance, setContractBalance] = useState<
    BigNumber | string | null
  >(null)
  useEffect(() => {
    const callFunc = async () => {
      if (isMounted() && myFirstContractRead) {
        const res = await myFirstContractRead.balance()
        setContractBalance(formatEther(res))
      }
    }
    callFunc()
  }, [isMounted, purpose, props.scaffoldAppProviders])

  const signer = ethersContext.signer
  const address = ethersContext.account ?? ''

  const ethComponentsSettings = useContext(EthComponentsSettingsContext)
  const gasPrice = useGasPrice(ethersContext.chainId, 'fast')

  const tx = transactor(ethComponentsSettings, ethersContext?.signer, gasPrice)

  const { mainnetProvider, yourCurrentBalance, price } = props

  return (
    <div
      style={{
        border: '1px solid #cccccc',
        padding: 32,
        width: 600,
        margin: 'auto',
        marginTop: 64,
      }}
    >
      <h2>Debug page</h2>
      <p style={{ textAlign: 'center' }}>
        <b>Purpose :</b> {`"${purpose}"`}
      </p>

      <Form
        layout="inline"
        // onFinish={onFinish}
        style={{ justifyContent: 'center', margin: '12px' }}
      >
        <Form.Item>
          <Input
            placeholder="Set a new purpose"
            onChange={(e) => setNewPurpose(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            onClick={async () => {
              const result = tx?.(
                myFirstContractWrite?.setPurpose(newPurpose),
                (update: ITransactionReceiptAndResponse) => {
                  console.log('📡 Transaction Update:', update)
                  if (update && update.status === 1) {
                    console.log(` 🍾 Transaction ' ${update.hash} ' finished!`)
                    console.log(
                      ` ⛽️ ' + ${update.gasUsed}'/'${update.gasLimit}' @ ' ${update.gasPrice}' gwei`
                    )
                  }
                }
              )
              console.log('awaiting metamask/web3 confirm result...', result)
              console.log(await result)
            }}
          >
            Set purpose
          </Button>
        </Form.Item>
      </Form>
      <div style={{ margin: 8 }}>
        <Button
          onClick={async () => {
            /* look how we call setPurpose AND send some value along */
            const res = tx?.(
              myFirstContractWrite?.setPurpose('💵 Paying for this one!', {
                value: parseEther('0.002'),
              }),
              (update: ITransactionReceiptAndResponse) => {
                console.log('📡 Transaction Update:', update)
                if (update && update.status === 1) {
                  console.log(` 🍾 Transaction ' ${update.hash} ' finished!`)
                  console.log(
                    ` ⛽️ ' + ${update.gasUsed}'/'${update.gasLimit}' @ ' ${update.gasPrice}' gwei`
                  )
                }
              }
            )
            console.log('awaiting metamask/web3 confirm result...', res)
            console.log(await res)
            /* this will fail until you make the setPurpose function payable */
          }}
        >
          Set Purpose With Value
        </Button>
      </div>
      <div>
        <span>Contract Balance : {contractBalance} ETH</span>
      </div>
    </div>
  )
}
