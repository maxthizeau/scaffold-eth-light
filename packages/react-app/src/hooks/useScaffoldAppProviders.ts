import { StaticJsonRpcProvider } from '@ethersproject/providers'
// import input from 'antd/lib/input';
import { TEthersProvider, TNetworkInfo } from 'eth-hooks/models'
import { useCallback, useEffect, useState } from 'react'
import { ICoreOptions } from 'web3modal'
import {
  EthersModalConnector,
  useEthersContext,
  CreateEthersModalConnector,
} from 'eth-hooks/context'
// import { useThemeSwitcher } from 'react-css-theme-switcher';
import {
  mainnetProvider,
  localProvider,
  targetNetworkInfo,
} from '../config/providersConfig'
import { web3ModalConfig } from '../config/web3ModalConfig'

export interface IScaffoldAppProviders {
  currentProvider: TEthersProvider | undefined
  targetNetwork: TNetworkInfo
  mainnetProvider: StaticJsonRpcProvider
  localProvider: StaticJsonRpcProvider
  createLoginConnector: CreateEthersModalConnector
}

export const useScaffoldProviders = (): IScaffoldAppProviders => {
  const [web3Config, setWeb3Config] = useState<Partial<ICoreOptions>>()
  const ethersContext = useEthersContext()

  useEffect(() => {
    // import async to split bundles

    setWeb3Config(web3ModalConfig)
  }, [])

  const createLoginConnector: CreateEthersModalConnector = useCallback(
    (id?: string) => {
      if (web3Config) {
        const connector = new EthersModalConnector(
          { ...web3Config },
          { reloadOnNetworkChange: false, immutableProvider: false },
          id
        )
        return connector
      }
    },
    [web3Config]
  )

  useEffect(() => {
    if (!ethersContext.active && createLoginConnector) {
      const connector = createLoginConnector()
      if (connector) ethersContext.activate(connector)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [web3Config])

  return {
    currentProvider: ethersContext.ethersProvider ?? localProvider,
    mainnetProvider: mainnetProvider,
    localProvider: localProvider,
    targetNetwork: targetNetworkInfo,
    createLoginConnector: createLoginConnector,
  }
}
