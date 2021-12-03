import { Tabs, Button, Typography, List } from 'antd'
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { Draw, MyTicket, StyledCard, Ticket } from 'src/views/Lottery'
import Text from 'antd/lib/typography/Text'
import { useState, useEffect } from 'react'
import { formatEther } from '@ethersproject/units'
import { TicketStatus } from '../../views/Lottery'

const { TabPane } = Tabs

const DrawNumber = styled.div`
  background-color: azure;
  padding: 20px;
  display: flex;
  justify-content: center;
  color: black;
`

interface IPreviousDrawTabProps {
  allDraws: Draw[] | undefined
  getOwnerTicketsForDraw: (drawId: number) => Promise<Ticket[]>
}

const PreviousDrawTab = ({
  allDraws,
  getOwnerTicketsForDraw,
}: IPreviousDrawTabProps) => {
  console.log('Length = ', allDraws?.length)
  const [drawShown, setDrawShown] = useState(
    allDraws ? allDraws?.length - 2 : 0
  )
  const [ticketsOfDrawShown, setTicketsOfDrawShown] = useState<Ticket[]>([])
  const [claimableAmount, setClaimableAmount] = useState(0)

  useEffect(() => {
    const callFunc = async () => {
      console.log('CALL FUNC !')
      const res = await getOwnerTicketsForDraw(drawShown)
      setTicketsOfDrawShown(res)
      let amount = 0
      for (let i = 0; i < res.length; i++) {
        const element = res[i]
        amount += Number(formatEther(element.claimableAmount))
      }
      setClaimableAmount(amount)
    }
    // console.log('Call ? ', allDraws, drawShown, allDraws?.length)
    if (allDraws && drawShown <= allDraws?.length) {
      callFunc()
    }
  }, [drawShown, allDraws])

  if (!allDraws) {
    return <p>Loading...</p>
  }
  if (allDraws.length <= 1)
    return (
      <Typography.Title
        level={3}
        style={{
          flex: '1 0 0',
          justifyItems: 'center',
          display: 'flex',
          justifyContent: 'center',
          margin: 0,
        }}
      >
        No draw have been made yet
      </Typography.Title>
    )
  return (
    <>
      <div
        style={{
          display: 'flex',
          padding: '20px',
          border: '1px solid #CCC',
          alignItems: 'center',
        }}
      >
        {drawShown >= 1 && (
          <Button
            icon={<LeftCircleOutlined style={{ fontSize: '32px' }} disabled />}
            type="text"
            onClick={() => {
              setDrawShown(drawShown - 1)
            }}
          />
        )}
        <Typography.Title
          level={3}
          style={{
            flex: '1 0 0',
            justifyItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            margin: 0,
          }}
        >
          Draw {allDraws[drawShown].id}
        </Typography.Title>
        {drawShown < allDraws.length - 1 && (
          <Button
            icon={<RightCircleOutlined style={{ fontSize: '32px' }} />}
            type="text"
            onClick={() => {
              setDrawShown(drawShown + 1)
            }}
          />
        )}
      </div>
      <p>Amount to claim : {claimableAmount} ETH</p>
      <StyledCard
        title="Last draw"
        // extra={<a href="#">More</a>}
      >
        <List
          grid={{ gutter: 16, column: 5 }}
          dataSource={allDraws[drawShown].numbers}
          renderItem={(item: number) => (
            <List.Item>
              <DrawNumber>{item}</DrawNumber>
            </List.Item>
          )}
        />
        <Text italic>Date : 23/09/2021 - 12:21:39</Text>
      </StyledCard>
      <StyledCard title="My Tickets">
        <List
          //   grid={{ gutter: 16, column: 5 }}
          dataSource={ticketsOfDrawShown}
          renderItem={(item: Ticket) => (
            <List.Item>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  background:
                    item.status !== TicketStatus.Pending &&
                    item.status !== TicketStatus.Lost
                      ? '#4a9e77'
                      : 'inherit',
                }}
              >
                <MyTicket>
                  <span className="ticketId">Ticket #{item.id}</span>
                  {item.numbers.map((x, index) => (
                    <span key={index}>{x}</span>
                  ))}
                </MyTicket>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '0 20px 20px 20px',
                    fontSize: '0.8em',
                    textTransform: 'uppercase',
                  }}
                >
                  <span>Status : {item.status}</span>
                  <span>
                    Claimable Amount : {formatEther(item.claimableAmount)} ETH
                    {/* Claimable Amount : {formatEther(item.claimableAmount)} ETH */}
                  </span>
                </div>
              </div>
            </List.Item>
          )}
        />
      </StyledCard>
    </>
  )
}

export default PreviousDrawTab
