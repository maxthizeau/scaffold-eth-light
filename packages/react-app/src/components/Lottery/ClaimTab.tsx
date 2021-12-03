import { formatEther } from '@ethersproject/units'
import { Collapse, Spin, Typography, Button } from 'antd'
import { ContractBalances } from 'src/views/Lottery'
import { Balance } from '../../views/Lottery'

interface IClaimTabProps {
  claimFunction: () => void
  claimableAmount: string
}

const ClaimTab = ({ claimFunction, claimableAmount }: IClaimTabProps) => {
  // if (!contractBalances) {
  //   return <Spin />
  // }
  return (
    <>
      <Balance>💰 You earned : {formatEther(claimableAmount)} ETH</Balance>
      <Button
        type="primary"
        style={{
          width: '100%',
          padding: 20,
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
          margin: 20,
        }}
        onClick={claimFunction}
      >
        Claim all
      </Button>
    </>
  )
}

export default ClaimTab
