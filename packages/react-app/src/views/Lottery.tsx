import {
  Button,
  Tabs,
  Input,
  Form,
  Card,
  List,
  InputNumber,
  Row,
  Col,
  Space,
} from 'antd'
import Countdown from 'antd/lib/statistic/Countdown'
import Text from 'antd/lib/typography/Text'
import React, { ReactElement } from 'react'
import styled from 'styled-components'
const { TabPane } = Tabs

const StyledCard = styled(Card)`
  margin: 30px auto !important;
  width: '100%';
`

const DrawNumber = styled.div`
  background-color: azure;
  padding: 20px;
  display: flex;
  justify-content: center;
  color: black;
`

const MyTicket = styled.div`
  display: block;
  & span {
    margin: 20px;
  }
`

const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30 // Moment is also OK

export const Lottery = (): ReactElement => {
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
      <Countdown
        title="Next draw in..."
        value={deadline}
        onFinish={() => console.log('Done')}
        style={{ position: 'absolute', top: 20, right: 20 }}
      />
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab="Last draw" key="1">
          <StyledCard
            title="Last draw"
            // extra={<a href="#">More</a>}
          >
            <List
              grid={{ gutter: 16, column: 5 }}
              dataSource={[1, 12, 14, 22, 23]}
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
              dataSource={[
                [1, 10, 11, 14, 15],
                [8, 10, 15, 17, 21],
              ]}
              renderItem={(item: number[]) => (
                <List.Item>
                  <MyTicket>
                    <span className="ticketId">Ticket #20132</span>
                    {item.map((x, index) => (
                      <span key={index}>{x}</span>
                    ))}
                  </MyTicket>
                </List.Item>
              )}
            />
          </StyledCard>
        </TabPane>
        <TabPane tab="Next draw" key="2">
          {/* Buy tickets for next draw */}
          <StyledCard title="Buy Tickets for next draw">
            {/* <Row> */}
            <Space>
              <InputNumber
                min={1}
                max={10}
                defaultValue={1}
                onChange={() => console.log('change')}
                style={{ width: '100%' }}
              />
              <Button style={{ width: '100%' }} type="primary">
                Buy
              </Button>
            </Space>
            {/* </Row> */}
          </StyledCard>

          {/* Tickets for next draw */}
          <StyledCard title="My Tickets">
            <List
              //   grid={{ gutter: 16, column: 5 }}
              dataSource={[
                [1, 10, 11, 14, 15],
                [8, 10, 15, 17, 21],
              ]}
              renderItem={(item: number[]) => (
                <List.Item>
                  <MyTicket>
                    <span className="ticketId">Ticket #20132</span>
                    {item.map((x, index) => (
                      <span key={index}>{x}</span>
                    ))}
                  </MyTicket>
                </List.Item>
              )}
            />
          </StyledCard>
        </TabPane>
      </Tabs>
    </div>
  )
}
