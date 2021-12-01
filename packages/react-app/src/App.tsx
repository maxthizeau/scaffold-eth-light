import { FC } from 'react'
// import { ThemeSwitcher } from './components/ThemeSwitcher'
import 'antd/dist/antd.css'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Home } from './views/Home'
import { Debug } from './views/Debug'
import TestPage from './views/TestPage'
import { PageLayout } from 'src/components/PageLayout'

import { useEthersContext } from 'eth-hooks/context'
import { useBalance, useContractLoader, useGasPrice } from 'eth-hooks'
import { useDexEthPrice } from 'eth-hooks/dapps'
import { useScaffoldProviders as useScaffoldAppProviders } from 'src/hooks/useScaffoldAppProviders'
import { useBurnerFallback } from 'src/hooks/useBurnerFallback'
import { getNetworkInfo } from './helpers/getNetworkInfo'
import { FullContract } from './views/FullContract'
import { useAppContracts } from './hooks/useAppContracts'
// import { useAppContracts } from './hooks/useAppContracts'
import { NETWORKS } from 'src/config/constants'

const App: FC = () => {
  // 🛰 providers
  // see useLoadProviders.ts for everything to do with loading the right providers
  const scaffoldAppProviders = useScaffoldAppProviders()

  // 🦊 Get your web3 ethers context from current providers
  const ethersContext = useEthersContext()

  // if no user is found use a burner wallet on localhost as fallback if enabled
  useBurnerFallback(scaffoldAppProviders, true)

  const ethPrice = useDexEthPrice(
    scaffoldAppProviders.mainnetProvider,
    scaffoldAppProviders.targetNetwork
  )

  const yourCurrentBalance = useBalance(ethersContext.account ?? '')

  const gasPrice = useGasPrice(
    ethersContext.chainId,
    'fast',
    getNetworkInfo(ethersContext.chainId)
  )

  const appContractConfig = useAppContracts()
  const mainnetContracts = useContractLoader(
    appContractConfig,
    scaffoldAppProviders.mainnetProvider,
    NETWORKS['mainnet'].chainId
  )

  return (
    <>
      <PageLayout
        scaffoldAppProviders={scaffoldAppProviders}
        price={ethPrice}
        gasPrice={gasPrice ?? 0}
      >
        <Routes>
          <Route path="/" element={<Home />}></Route>
        </Routes>
        <Routes>
          <Route
            path="/debug"
            element={
              <Debug
                scaffoldAppProviders={scaffoldAppProviders}
                mainnetProvider={scaffoldAppProviders.mainnetProvider}
                price={ethPrice}
                yourCurrentBalance={yourCurrentBalance}
              />
            }
          ></Route>
        </Routes>
        <Routes>
          <Route path="/test-page" element={<TestPage />}></Route>
        </Routes>
        <Routes>
          <Route
            path="/full"
            element={
              <FullContract
                scaffoldAppProviders={scaffoldAppProviders}
                appContractConfig={appContractConfig}
                mainnetContracts={mainnetContracts}
              />
            }
          ></Route>
        </Routes>

        {/* <ThemeSwitcher /> */}
      </PageLayout>
    </>
  )
}

export default App
