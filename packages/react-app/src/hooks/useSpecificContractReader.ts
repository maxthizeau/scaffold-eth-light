import { BaseContract, Signer, Contract } from 'ethers'
import { useState, useEffect } from 'react'
import { useBlockNumberContext, useEthersContext } from 'eth-hooks/context'
import { useIsMounted } from 'usehooks-ts'

export const useSpecificContractReader = <T extends BaseContract>(
  contract: T,
  functionCall: (...args: any[]) => any,
  functionArgs?: any[]
): any => {
  const ethersContext = useEthersContext()

  const isMounted = useIsMounted()
  type Awaited<T> = T extends PromiseLike<infer U> ? U : T
  const blockNumber = useBlockNumberContext()
  const fnReturnType = (false as true) && functionCall
  const [value, setValue] = useState<Awaited<typeof fnReturnType>>()

  useEffect(() => {
    console.log('Start func')
    const callFunc = async () => {
      if (contract) {
        const res = await functionCall(functionArgs)
        console.log(res)
        setValue(res)
      }
    }
    void callFunc()
  }, [blockNumber, contract])
  // return contract
}
