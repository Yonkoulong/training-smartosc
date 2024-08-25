import { Action, ActionCreator } from "redux";

export enum CounterActionTypes {
  INCREASE = "counter/increase",
  DECREASE = "counter/decrease",
  RESET = "counter/reset",
}

export type IncreaseCounterAction = Action<CounterActionTypes.INCREASE> & {
  payload: number;
};

export type DecreaseCounterAction = Action<CounterActionTypes.DECREASE> & {
  payload: number;
};

export type ResetCounterAction = Action<CounterActionTypes.RESET>;

export function increaseCountAction(payload: number): IncreaseCounterAction {
  return {
    type: CounterActionTypes.INCREASE,
    payload,
  };
}

export function decreaseCountAction(payload: number): DecreaseCounterAction {
  return {
    type: CounterActionTypes.DECREASE,
    payload,
  };
}

export function resetCountAction(): ResetCounterAction {
  return {
    type: CounterActionTypes.RESET,
  };
}
