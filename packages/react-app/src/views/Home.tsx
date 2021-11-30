import { Button, Tabs, Input, Form } from 'antd'
import React, { ReactElement } from 'react'
const { TabPane } = Tabs

export const Home = (): ReactElement => {
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
      <h2>dBank : 0x98d2</h2>
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab="Deposit" key="1">
          <Form
            layout="inline"
            // onFinish={onFinish}
            style={{ justifyContent: 'center', margin: '12px' }}
          >
            <Form.Item>
              <Input
                placeholder="Deposit some ETH"
                // autoFocus={props.autoFocus}
                prefix="Ξ"
                addonAfter="ETH"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Deposit
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
        <TabPane tab="Withdraw" key="2">
          Content of Withdraw
        </TabPane>
        <TabPane tab="Swap" key="3">
          Content of Swap
        </TabPane>
      </Tabs>
    </div>
  )
}
