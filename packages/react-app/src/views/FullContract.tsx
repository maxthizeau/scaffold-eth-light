import React, { FC } from 'react'
import { GenericContract } from 'eth-components/ant/generic-contract'
import { Contract } from 'ethers'
import { useContractLoader } from 'eth-hooks'
import { IScaffoldAppProviders } from 'src/hooks/useScaffoldAppProviders'
import { useEthersContext } from 'eth-hooks/context'
import { TContractLoaderConfig } from 'eth-hooks/models'
import { NETWORKS } from 'src/config/constants_example'
export interface IFullContractProps {
  scaffoldAppProviders: IScaffoldAppProviders
  mainnetContracts: Record<string, Contract>
  appContractConfig: TContractLoaderConfig
}

/**
 * 🎛 this scaffolding is full of commonly used components
    this <GenericContract/> component will automatically parse your ABI
    and give you a form to interact with it locally
 * @param props 
 * @returns 
 */
export const FullContract: FC<IFullContractProps> = (props) => {
  const ethersContext = useEthersContext()
  const contractList = useContractLoader(props.appContractConfig, undefined)

  if (ethersContext.account == null) {
    return <></>
  }

  return (
    <>
      <>
        {/* **********
          ❓ this scaffolding is full of commonly used components
          this <Contract/> component will automatically parse your ABI
          and give you a form to interact with it locally
        ********** */}
        <GenericContract
          contractName="MyFirstContract"
          contract={contractList?.['MyFirstContract']}
          mainnetProvider={props.scaffoldAppProviders.mainnetProvider}
          blockExplorer={props.scaffoldAppProviders.targetNetwork.blockExplorer}
          contractConfig={props.appContractConfig}
        />

        {/* **********
         * ❓ uncomment for a second contract:
         ********** */}
        {/*
          <GenericContract
            contractName="SecondContract"
            contract={contract={contractList?.['SecondContract']}
            mainnetProvider={props.appProviders.mainnetProvider}
            blockExplorer={props.appProviders.targetNetwork.blockExplorer}
            contractConfig={props.contractConfig}
          />
        */}

        {/***********
         *  ❓ Uncomment to display and interact with an external contract (DAI on mainnet):
         ********** */}
        {/* <GenericContract
          contractName="DAI"
          contract={props.mainnetContracts?.['DAI']}
          mainnetProvider={props.scaffoldAppProviders.mainnetProvider}
          blockExplorer={NETWORKS['mainnet'].blockExplorer}
          contractConfig={props.appContractConfig}
        /> */}
      </>
    </>
  )
}
