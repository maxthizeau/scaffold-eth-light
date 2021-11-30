/* eslint-disable import/no-extraneous-dependencies */
import { BigNumber } from '@ethersproject/bignumber'
import { ethers } from 'ethers'

export function toEth(input: BigNumber | number): string {
  return ethers.utils.formatEther(input)
}
