import { AnyAction } from "redux";
import { CounterActionTypes } from "@/actions/counter.actions";

export type CounterState = {
  count: number;
};

const initialState: CounterState = {
  count: 0,
};

export function CounterReducer(state = initialState, actions: AnyAction) {
  const { count } = state;
  switch (actions.type) {
    case CounterActionTypes.INCREASE: {
      return {
        count: count + actions.payload,
      };
    }
    case CounterActionTypes.DECREASE: {
      return {
        count: count - actions.payload,
      };
    }
    case CounterActionTypes.RESET:
      return {
        count: 0,
      };
    default:
      return state;
  }
}
