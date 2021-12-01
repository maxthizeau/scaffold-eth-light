import React, { FC } from 'react'
import { Row, Col, Button } from 'antd'
import { Faucet } from 'eth-components/ant'

import { IScaffoldAppProviders } from 'src/hooks/useScaffoldAppProviders'
import { useEthersContext } from 'eth-hooks/context'
import {
  FaucetHintButton,
  getFaucetAvailable,
} from 'src/components/common/FaucetHintButton'

export interface IPageLayoutFooterProps {
  scaffoldAppProviders: IScaffoldAppProviders
  price: number
  gasPrice: number
}

const PageLayoutFooter = (props: IPageLayoutFooterProps) => {
  const ethersContext = useEthersContext()

  // Faucet Tx can be used to send funds from the faucet
  const faucetAvailable = getFaucetAvailable(
    props.scaffoldAppProviders,
    ethersContext
  )

  // console.log('faucetAvailable')
  // console.log(faucetAvailable)
  // console.log('mainnetProvid')
  // console.log(props.scaffoldAppProviders?.mainnetProvider)
  // console.log('localProvid')
  // console.log(props.scaffoldAppProviders?.localProvider)
  // console.log('chainId == target')
  // console.log(
  //   `chain id : ${ethersContext?.chainId ?? 'null'} | targetChainId : ${
  //     props.scaffoldAppProviders.targetNetwork.chainId
  //   }`
  // )
  // console.log(
  //   `${
  //     ethersContext?.chainId ===
  //     props.scaffoldAppProviders.targetNetwork.chainId
  //   }`
  // )

  return (
    <div
      style={{
        position: 'fixed',
        textAlign: 'left',
        left: 0,
        bottom: 20,
        padding: 10,
      }}
    >
      <Row align="middle" gutter={[4, 4]}>
        <Col span={12}>
          {
            /*  if the local provider has a signer, let's show the faucet:  */
            faucetAvailable &&
            props.scaffoldAppProviders?.mainnetProvider &&
            props.scaffoldAppProviders?.localProvider ? (
              <Faucet
                localProvider={props.scaffoldAppProviders.localProvider}
                price={props.price}
                mainnetProvider={props.scaffoldAppProviders.mainnetProvider}
              />
            ) : (
              <></>
            )
          }
        </Col>
        <Col span={12}>
          <FaucetHintButton
            scaffoldAppProviders={props.scaffoldAppProviders}
            gasPrice={props.gasPrice}
          />
        </Col>
      </Row>
    </div>
  )
}

export default PageLayoutFooter
