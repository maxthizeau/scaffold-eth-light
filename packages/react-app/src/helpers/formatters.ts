import { ContractBalances, Draw } from '../views/Lottery'

export const formatBalances = (
  _value: any[] | undefined
): ContractBalances | undefined => {
  if (!_value) return undefined
  const balances: ContractBalances = {
    fullBalance: _value[0].toString(),
    claimableBalance: _value[1].toString(),
    devFeeBalance: _value[2].toString(),
    stakingBalance: _value[3].toString(),
    burnBalance: _value[4].toString(),
  }
  return balances
}

export const formatDraws = (_res: any[] | undefined): Draw[] | undefined => {
  if (_res && _res[0]) {
    const tmpDraws: Draw[] = []
    for (let i = 0; i < _res[0].length; i++) {
      const draw = _res[0][i]
      const id = Number(draw[0])
      tmpDraws.push({ id, numbers: draw[1], completed: draw[2] })
    }
    return tmpDraws
  }
  return []
}

export const formatToString = (
  _value: string | undefined
): string | undefined => _value?.toString()

export const formatArrayToBoolean = (
  _value: boolean[] | undefined
): boolean | undefined => _value?.[0]

export const formatToTimestamp = (
  _value: string | undefined
): number | undefined => {
  if (!_value) return undefined
  return new Date(Number(_value) * 1000).getTime()
}
