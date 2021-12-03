import { JsonRpcSigner } from '@ethersproject/providers'
import { THardhatContractJson } from 'eth-hooks/models'
import { BaseContract, Signer, Contract } from 'ethers'
import { useState, useEffect } from 'react'

import * as hardhatContracts from 'src/generated/contracts/hardhat_contracts.json'
import { useEthersContext } from 'eth-hooks/context'
import { useIsMounted } from 'usehooks-ts'

// const signer = provider.getSigner()
//     const contractInfos = hardhatContracts[31337].localhost.contracts.Lottery
//     const contract = new ethers.Contract(
//       contractInfos.address,
//       contractInfos.abi,
//       signer
//     ) as LotteryContract

// BIG TODO : Specify network / include mainnet contracts
interface IUseSpecificContractProps {
  signer: Signer
  contractName: string
}

export declare type TDeployedContractsJson = {
  [chainId: number]: {
    [networkName: string]: {
      name: string
      chainId: string
      contracts: {
        [contractName: string]: THardhatContractJson
      }
    }
  }
}

export const useSpecificContract = <T extends BaseContract>(
  contractName: string,
  signer?: Signer
  // eslint-disable-next-line @typescript-eslint/require-await
): T | undefined => {
  const ethersContext = useEthersContext()
  const currentSigner = signer ?? ethersContext.signer
  const [contract, setContract] = useState<T>()
  const isMounted = useIsMounted()
  const contractListJsonPromise = import(
    '../generated/contracts/hardhat_contracts.json'
  )

  // const allContracts = (await contractListJsonPromise).default)
  const allContracts = hardhatContracts as TDeployedContractsJson

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/require-await
    const loadFunc = async (): Promise<void> => {
      try {
        const _contractInfos =
          allContracts[31337].localhost.contracts[contractName]

        const _contract = new Contract(
          _contractInfos.address,
          _contractInfos.abi,
          signer ?? ethersContext.signer
        ) as T
        setContract(_contract)
      } catch (error) {
        console.error(`Error in useSpecificContract`)
        console.error(error)
      }
    }
    if (currentSigner && isMounted()) {
      console.log('Call')
      void loadFunc()
    } else {
      console.log('No call')
    }
  }, [currentSigner, isMounted])
  return contract
}
