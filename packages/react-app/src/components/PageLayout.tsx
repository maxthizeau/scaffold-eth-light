import React, { ReactElement, ReactNode } from 'react'
import { Descriptions, PageHeader, Menu } from 'antd'
import { ThemeSwitcher } from './ThemeSwitcher'
import { useLocation, Link } from 'react-router-dom'
import { Account } from './common/Account'
import { StaticJsonRpcProvider } from '@ethersproject/providers'
import { IScaffoldAppProviders } from '../hooks/useScaffoldAppProviders'
import PageLayoutFooter from './PageLayoutFooter'
import { FaucetHintButton } from './common/FaucetHintButton'
import { useGasPrice } from 'eth-hooks'

interface IPageLayoutProps {
  children: ReactNode
  scaffoldAppProviders: IScaffoldAppProviders
  price: number
  gasPrice: number
}

export const PageLayout = ({
  children,
  scaffoldAppProviders,
  price,
  gasPrice,
}: IPageLayoutProps): ReactElement => {
  const location = useLocation()

  // const accountProps : IAccountProps = {
  //   ensProvider
  // }

  return (
    <>
      <PageHeader
        ghost={false}
        title="My Scaffold"
        subTitle="This is my own starter template"
        style={{ padding: 20 }}
        extra={[
          <Account
            key="1"
            createLoginConnector={scaffoldAppProviders.createLoginConnector}
            ensProvider={scaffoldAppProviders.mainnetProvider}
            hasContextConnect={true}
            blockExplorer={scaffoldAppProviders.targetNetwork.blockExplorer}
            price={price}
            fontSize={14}
          />,
        ]}
      >
        {' '}
        {/* <Descriptions size="small" column={3} style={{ padding: 20 }}>
          <Descriptions.Item label="Address">0x9527d8mb9a</Descriptions.Item>
          <Descriptions.Item label="Balance">
            <a>380 ETH</a>
          </Descriptions.Item>
          <Descriptions.Item label="Creation Time">
            2017-01-10
          </Descriptions.Item>
        </Descriptions> */}
      </PageHeader>
      <Menu
        style={{
          textAlign: 'center',
          justifyContent: 'center',
          background: 'inherit',
        }}
        selectedKeys={[location.pathname]}
        mode="horizontal"
      >
        <Menu.Item key="/">
          <Link to="/">App Home</Link>
        </Menu.Item>
        <Menu.Item key="/debug">
          <Link to="/debug">Debug Contracts</Link>
        </Menu.Item>
        <Menu.Item key="/test-page">
          <Link to="/test-page">Test Page</Link>
        </Menu.Item>
        <Menu.Item key="/full">
          <Link to="/full">Full Contract</Link>
        </Menu.Item>
      </Menu>
      {children}

      <PageLayoutFooter
        price={price}
        scaffoldAppProviders={scaffoldAppProviders}
        gasPrice={gasPrice}
      />
      <ThemeSwitcher />
    </>
  )
}
