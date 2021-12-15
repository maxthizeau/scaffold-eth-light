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
  PayableOverrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface LotteryFactoryInterface extends ethers.utils.Interface {
  functions: {
    "LTY()": FunctionFragment;
    "_getAllBalances()": FunctionFragment;
    "_getBalance()": FunctionFragment;
    "_getDrawToTickets(uint256)": FunctionFragment;
    "_getTicket(uint256)": FunctionFragment;
    "_getTicketsByOwner(address)": FunctionFragment;
    "buyLottyToken()": FunctionFragment;
    "buyMultipleRandomTicket(uint256)": FunctionFragment;
    "drawToTicketCount(uint256)": FunctionFragment;
    "drawToTickets(uint256,uint256)": FunctionFragment;
    "lotteryCount()": FunctionFragment;
    "owner()": FunctionFragment;
    "randomGenerator()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "setRandomNumberGenerator(address)": FunctionFragment;
    "setTicketPrice(uint256)": FunctionFragment;
    "ticketPrice()": FunctionFragment;
    "ticketToOwner(uint256)": FunctionFragment;
    "tickets(uint256)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "viewTicket(uint256)": FunctionFragment;
    "withdraw()": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "LTY", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "_getAllBalances",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "_getBalance",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "_getDrawToTickets",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "_getTicket",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "_getTicketsByOwner",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "buyLottyToken",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "buyMultipleRandomTicket",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "drawToTicketCount",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "drawToTickets",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "lotteryCount",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "randomGenerator",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setRandomNumberGenerator",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "setTicketPrice",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "ticketPrice",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "ticketToOwner",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "tickets",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "viewTicket",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "withdraw", values?: undefined): string;

  decodeFunctionResult(functionFragment: "LTY", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "_getAllBalances",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_getBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_getDrawToTickets",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "_getTicket", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "_getTicketsByOwner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "buyLottyToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "buyMultipleRandomTicket",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "drawToTicketCount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "drawToTickets",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "lotteryCount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "randomGenerator",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setRandomNumberGenerator",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setTicketPrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "ticketPrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "ticketToOwner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "tickets", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "viewTicket", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;

  events: {
    "OwnershipTransferred(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}

export type OwnershipTransferredEvent = TypedEvent<
  [string, string] & { previousOwner: string; newOwner: string }
>;

export class LotteryFactory extends BaseContract {
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

  interface: LotteryFactoryInterface;

  functions: {
    LTY(overrides?: CallOverrides): Promise<[string]>;

    _getAllBalances(
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber, BigNumber, BigNumber, BigNumber]>;

    _getBalance(overrides?: CallOverrides): Promise<[BigNumber]>;

    _getDrawToTickets(
      _drawId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber[]]>;

    _getTicket(
      _ticketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [
        [[number, number, number, number, number], BigNumber, boolean] & {
          numbers: [number, number, number, number, number];
          drawNumber: BigNumber;
          claimed: boolean;
        }
      ]
    >;

    _getTicketsByOwner(
      _owner: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber[]]>;

    buyLottyToken(
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    buyMultipleRandomTicket(
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    drawToTicketCount(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    drawToTickets(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    lotteryCount(overrides?: CallOverrides): Promise<[BigNumber]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    randomGenerator(overrides?: CallOverrides): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setRandomNumberGenerator(
      _IRandomNumberGenerator: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setTicketPrice(
      _newPrice: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    ticketPrice(overrides?: CallOverrides): Promise<[BigNumber]>;

    ticketToOwner(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    tickets(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, boolean] & { drawNumber: BigNumber; claimed: boolean }
    >;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    viewTicket(
      _ticketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[[number, number, number, number, number], BigNumber, boolean]>;

    withdraw(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  LTY(overrides?: CallOverrides): Promise<string>;

  _getAllBalances(
    overrides?: CallOverrides
  ): Promise<[BigNumber, BigNumber, BigNumber, BigNumber, BigNumber]>;

  _getBalance(overrides?: CallOverrides): Promise<BigNumber>;

  _getDrawToTickets(
    _drawId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  _getTicket(
    _ticketId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [[number, number, number, number, number], BigNumber, boolean] & {
      numbers: [number, number, number, number, number];
      drawNumber: BigNumber;
      claimed: boolean;
    }
  >;

  _getTicketsByOwner(
    _owner: string,
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  buyLottyToken(
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  buyMultipleRandomTicket(
    _amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  drawToTicketCount(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  drawToTickets(
    arg0: BigNumberish,
    arg1: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  lotteryCount(overrides?: CallOverrides): Promise<BigNumber>;

  owner(overrides?: CallOverrides): Promise<string>;

  randomGenerator(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setRandomNumberGenerator(
    _IRandomNumberGenerator: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setTicketPrice(
    _newPrice: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  ticketPrice(overrides?: CallOverrides): Promise<BigNumber>;

  ticketToOwner(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;

  tickets(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, boolean] & { drawNumber: BigNumber; claimed: boolean }
  >;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  viewTicket(
    _ticketId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<[[number, number, number, number, number], BigNumber, boolean]>;

  withdraw(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    LTY(overrides?: CallOverrides): Promise<string>;

    _getAllBalances(
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber, BigNumber, BigNumber, BigNumber]>;

    _getBalance(overrides?: CallOverrides): Promise<BigNumber>;

    _getDrawToTickets(
      _drawId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    _getTicket(
      _ticketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [[number, number, number, number, number], BigNumber, boolean] & {
        numbers: [number, number, number, number, number];
        drawNumber: BigNumber;
        claimed: boolean;
      }
    >;

    _getTicketsByOwner(
      _owner: string,
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    buyLottyToken(overrides?: CallOverrides): Promise<void>;

    buyMultipleRandomTicket(
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    drawToTicketCount(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    drawToTickets(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    lotteryCount(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<string>;

    randomGenerator(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    setRandomNumberGenerator(
      _IRandomNumberGenerator: string,
      overrides?: CallOverrides
    ): Promise<void>;

    setTicketPrice(
      _newPrice: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    ticketPrice(overrides?: CallOverrides): Promise<BigNumber>;

    ticketToOwner(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    tickets(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, boolean] & { drawNumber: BigNumber; claimed: boolean }
    >;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    viewTicket(
      _ticketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[[number, number, number, number, number], BigNumber, boolean]>;

    withdraw(overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null
    ): TypedEventFilter<
      [string, string],
      { previousOwner: string; newOwner: string }
    >;

    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): TypedEventFilter<
      [string, string],
      { previousOwner: string; newOwner: string }
    >;
  };

  estimateGas: {
    LTY(overrides?: CallOverrides): Promise<BigNumber>;

    _getAllBalances(overrides?: CallOverrides): Promise<BigNumber>;

    _getBalance(overrides?: CallOverrides): Promise<BigNumber>;

    _getDrawToTickets(
      _drawId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getTicket(
      _ticketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getTicketsByOwner(
      _owner: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    buyLottyToken(
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    buyMultipleRandomTicket(
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    drawToTicketCount(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    drawToTickets(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    lotteryCount(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    randomGenerator(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setRandomNumberGenerator(
      _IRandomNumberGenerator: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setTicketPrice(
      _newPrice: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    ticketPrice(overrides?: CallOverrides): Promise<BigNumber>;

    ticketToOwner(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    tickets(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    viewTicket(
      _ticketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    withdraw(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    LTY(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    _getAllBalances(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    _getBalance(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    _getDrawToTickets(
      _drawId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _getTicket(
      _ticketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _getTicketsByOwner(
      _owner: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    buyLottyToken(
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    buyMultipleRandomTicket(
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    drawToTicketCount(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    drawToTickets(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    lotteryCount(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    randomGenerator(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setRandomNumberGenerator(
      _IRandomNumberGenerator: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setTicketPrice(
      _newPrice: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    ticketPrice(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    ticketToOwner(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    tickets(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    viewTicket(
      _ticketId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    withdraw(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
