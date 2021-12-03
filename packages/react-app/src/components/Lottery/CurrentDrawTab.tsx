import { Tabs, Button, Typography, List, InputNumber, Space } from 'antd'
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { Balance, MyTicket, StyledCard, TicketNumbers } from 'src/views/Lottery'
import Text from 'antd/lib/typography/Text'
import { BigNumber } from '@ethersproject/bignumber'
import { round } from 'src/helpers/utils'
import { splitRatio } from '../../views/Lottery'

const { TabPane } = Tabs

interface ICurrentDrawTabProps {
  contractBalance: string | BigNumber | null
  buyTickets: () => void
  tickets: any[] | undefined
  onChange: (value: number) => void
}

const CurrentDrawTab = ({
  onChange,
  contractBalance,
  buyTickets,
  tickets,
}: ICurrentDrawTabProps) => {
  return (
    <>
      <StyledCard title="Balance / Split">
        <div>
          <Balance>💰 {contractBalance ?? '...'} ETH</Balance>
          <List
            itemLayout="horizontal"
            dataSource={splitRatio}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={
                    <a href="https://ant.design">
                      {item.goodNumbers} winning numbers
                    </a>
                  }
                  description={`Winners split ${Math.round(
                    item.percentOfBalance * 100
                  )}% of balance (${round(
                    item.percentOfBalance * Number(contractBalance ?? 0),
                    6
                  )} ETH)`}
                />
              </List.Item>
            )}
          />
        </div>
      </StyledCard>
      {/* Buy tickets for next draw */}
      <StyledCard title="Buy Tickets for next draw">
        {/* <Row> */}
        <Space>
          <InputNumber
            min={1}
            max={100}
            defaultValue={1}
            onChange={(e) => {
              onChange(e)
            }}
            style={{ width: '100%' }}
          />
          <Button style={{ width: '100%' }} type="primary" onClick={buyTickets}>
            Buy
          </Button>
        </Space>
        {/* </Row> */}
      </StyledCard>

      {/* Tickets for next draw */}
      <StyledCard title="My Tickets">
        <List
          //   grid={{ gutter: 16, column: 5 }}

          dataSource={tickets ?? []}
          renderItem={(item: any[]) => {
            if (!item || item.length === 0) {
              return
            }
            return (
              <List.Item>
                <MyTicket>
                  <span className="ticketId">
                    Ticket #{item?.[0].toString()}
                  </span>
                  <TicketNumbers>
                    {item?.[1].map((x: BigNumber, index: number) => (
                      <span key={index}>{x.toString()}</span>
                    ))}
                  </TicketNumbers>
                </MyTicket>
              </List.Item>
            )
          }}
        />
      </StyledCard>
    </>
  )
}

export default CurrentDrawTab
