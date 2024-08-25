import React from "react";
import { Button } from "antd";
import { RootState } from "@/store";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseCountAction,
  decreaseCountAction,
  resetCountAction,
} from "@/actions/counter.actions";

export function CounterPage() {
  const count = useSelector((state: RootState) => state.count.count);
  const dispatch = useDispatch();

  function onIncrease() {
    dispatch(increaseCountAction(1));
  }

  function onDecrease() {
    dispatch(decreaseCountAction(1));
  }

  function onReset() {
    dispatch(resetCountAction());
  }

  return (
    <div>
      <section data-testid="show-counter">Count is {count}</section>
      <section>
        <Button data-testid="increase" onClick={onIncrease}>
          Increase
        </Button>
        <Button data-testid="decrease" onClick={onDecrease}>
          Decrease
        </Button>
        <Button data-testid="reset" onClick={onReset}>
          Reset
        </Button>
      </section>
    </div>
  );
}
