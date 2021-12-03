import { formatEther } from '@ethersproject/units'
import { Collapse, Spin, Typography } from 'antd'
import { ContractBalances } from 'src/views/Lottery'

interface ILotteryBalancesProps {
  contractBalances: ContractBalances | undefined
}

const LotteryBalances = ({ contractBalances }: ILotteryBalancesProps) => {
  if (!contractBalances) {
    return <Spin />
  }
  return (
    <Collapse accordion>
      <Collapse.Panel
        header={`Contract Balance : ${formatEther(
          contractBalances.fullBalance
        )} ETH`}
        key="1"
      >
        <Typography.Title level={2} style={{ textAlign: 'center' }}>
          {formatEther(contractBalances.fullBalance)} ETH{' '}
        </Typography.Title>
        <p>
          This is the full contract Balance (All balances below + Rewards of the
          next draw.)
          <br />
        </p>
      </Collapse.Panel>
      <Collapse.Panel
        header={`Claimable Balance : ${formatEther(
          contractBalances.claimableBalance
        )} ETH`}
        key="2"
      >
        <Typography.Title level={2} style={{ textAlign: 'center' }}>
          {formatEther(contractBalances.claimableBalance)} ETH{' '}
        </Typography.Title>
        <p>
          This is the amount of ETH that can be claimed by winners.
          <br />
          Only winners can access this balance.
        </p>
      </Collapse.Panel>
      <Collapse.Panel
        header={`Dev Fee Balance : ${formatEther(
          contractBalances.devFeeBalance
        )} ETH`}
        key="3"
      >
        <Typography.Title level={2} style={{ textAlign: 'center' }}>
          {formatEther(contractBalances.devFeeBalance)} ETH{' '}
        </Typography.Title>
        <p>
          This is the amount of ETH that can be claimed by contract owner.
          <br />
          Only developpers can access this balance.
        </p>
      </Collapse.Panel>
      <Collapse.Panel
        header={`Staking Balance : ${formatEther(
          contractBalances.stakingBalance
        )} ETH`}
        key="4"
      >
        <Typography.Title level={2} style={{ textAlign: 'center' }}>
          {formatEther(contractBalances.stakingBalance)} ETH{' '}
        </Typography.Title>
        <p>
          This is the amount of ETH that will be added to staking reward.
          <br />
          No one can access this balance. Even the owner of the contract.
        </p>
      </Collapse.Panel>
      <Collapse.Panel
        header={`Burn Balance : ${formatEther(
          contractBalances.burnBalance
        )} ETH`}
        key="5"
      >
        <Typography.Title level={2} style={{ textAlign: 'center' }}>
          {formatEther(contractBalances.burnBalance)} ETH{' '}
        </Typography.Title>
        <p>
          This is the amount of ETH that will be burn soon.
          <br />
          No one can access this balance. Even the owner of the contract.
        </p>
      </Collapse.Panel>
    </Collapse>
  )
}

export default LotteryBalances
