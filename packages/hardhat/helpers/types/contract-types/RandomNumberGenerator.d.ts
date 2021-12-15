/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface RandomNumberGeneratorInterface extends ethers.utils.Interface {
  functions: {
    "acceptOwnership()": FunctionFragment;
    "expand(uint256,uint256)": FunctionFragment;
    "getRandomNumber(uint256)": FunctionFragment;
    "getRandomResult()": FunctionFragment;
    "lottery()": FunctionFragment;
    "owner()": FunctionFragment;
    "randomResult()": FunctionFragment;
    "rawFulfillRandomness(bytes32,uint256)": FunctionFragment;
    "setFee(uint256)": FunctionFragment;
    "setKeyHash(bytes32)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "viewFee()": FunctionFragment;
    "viewKeyHash()": FunctionFragment;
    "withdrawLINK(address,uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "acceptOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "expand",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getRandomNumber",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getRandomResult",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "lottery", values?: undefined): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "randomResult",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "rawFulfillRandomness",
    values: [BytesLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setFee",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setKeyHash",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "viewFee", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "viewKeyHash",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawLINK",
    values: [string, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "acceptOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "expand", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getRandomNumber",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRandomResult",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "lottery", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "randomResult",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "rawFulfillRandomness",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setFee", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setKeyHash", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "viewFee", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "viewKeyHash",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawLINK",
    data: BytesLike
  ): Result;

  events: {
    "OwnershipTransferRequested(address,address)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "OwnershipTransferRequested"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}

export type OwnershipTransferRequestedEvent = TypedEvent<
  [string, string] & { from: string; to: string }
>;

export type OwnershipTransferredEvent = TypedEvent<
  [string, string] & { from: string; to: string }
>;

export class RandomNumberGenerator extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: RandomNumberGeneratorInterface;

  functions: {
    acceptOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    expand(
      randomValue: BigNumberish,
      n: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber[]] & { expandedValues: BigNumber[] }>;

    getRandomNumber(
      userProvidedSeed: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getRandomResult(overrides?: CallOverrides): Promise<[BigNumber]>;

    lottery(overrides?: CallOverrides): Promise<[string]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    randomResult(overrides?: CallOverrides): Promise<[BigNumber]>;

    rawFulfillRandomness(
      requestId: BytesLike,
      randomness: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setFee(
      _fee: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setKeyHash(
      _keyHash: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    viewFee(overrides?: CallOverrides): Promise<[BigNumber]>;

    viewKeyHash(overrides?: CallOverrides): Promise<[string]>;

    withdrawLINK(
      to: string,
      value: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  acceptOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  expand(
    randomValue: BigNumberish,
    n: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  getRandomNumber(
    userProvidedSeed: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getRandomResult(overrides?: CallOverrides): Promise<BigNumber>;

  lottery(overrides?: CallOverrides): Promise<string>;

  owner(overrides?: CallOverrides): Promise<string>;

  randomResult(overrides?: CallOverrides): Promise<BigNumber>;

  rawFulfillRandomness(
    requestId: BytesLike,
    randomness: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setFee(
    _fee: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setKeyHash(
    _keyHash: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    to: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  viewFee(overrides?: CallOverrides): Promise<BigNumber>;

  viewKeyHash(overrides?: CallOverrides): Promise<string>;

  withdrawLINK(
    to: string,
    value: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    acceptOwnership(overrides?: CallOverrides): Promise<void>;

    expand(
      randomValue: BigNumberish,
      n: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    getRandomNumber(
      userProvidedSeed: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    getRandomResult(overrides?: CallOverrides): Promise<BigNumber>;

    lottery(overrides?: CallOverrides): Promise<string>;

    owner(overrides?: CallOverrides): Promise<string>;

    randomResult(overrides?: CallOverrides): Promise<BigNumber>;

    rawFulfillRandomness(
      requestId: BytesLike,
      randomness: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setFee(_fee: BigNumberish, overrides?: CallOverrides): Promise<void>;

    setKeyHash(_keyHash: BytesLike, overrides?: CallOverrides): Promise<void>;

    transferOwnership(to: string, overrides?: CallOverrides): Promise<void>;

    viewFee(overrides?: CallOverrides): Promise<BigNumber>;

    viewKeyHash(overrides?: CallOverrides): Promise<string>;

    withdrawLINK(
      to: string,
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "OwnershipTransferRequested(address,address)"(
      from?: string | null,
      to?: string | null
    ): TypedEventFilter<[string, string], { from: string; to: string }>;

    OwnershipTransferRequested(
      from?: string | null,
      to?: string | null
    ): TypedEventFilter<[string, string], { from: string; to: string }>;

    "OwnershipTransferred(address,address)"(
      from?: string | null,
      to?: string | null
    ): TypedEventFilter<[string, string], { from: string; to: string }>;

    OwnershipTransferred(
      from?: string | null,
      to?: string | null
    ): TypedEventFilter<[string, string], { from: string; to: string }>;
  };

  estimateGas: {
    acceptOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    expand(
      randomValue: BigNumberish,
      n: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getRandomNumber(
      userProvidedSeed: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getRandomResult(overrides?: CallOverrides): Promise<BigNumber>;

    lottery(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    randomResult(overrides?: CallOverrides): Promise<BigNumber>;

    rawFulfillRandomness(
      requestId: BytesLike,
      randomness: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setFee(
      _fee: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setKeyHash(
      _keyHash: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    viewFee(overrides?: CallOverrides): Promise<BigNumber>;

    viewKeyHash(overrides?: CallOverrides): Promise<BigNumber>;

    withdrawLINK(
      to: string,
      value: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    acceptOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    expand(
      randomValue: BigNumberish,
      n: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getRandomNumber(
      userProvidedSeed: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getRandomResult(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    lottery(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    randomResult(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    rawFulfillRandomness(
      requestId: BytesLike,
      randomness: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setFee(
      _fee: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setKeyHash(
      _keyHash: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    viewFee(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    viewKeyHash(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    withdrawLINK(
      to: string,
      value: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
