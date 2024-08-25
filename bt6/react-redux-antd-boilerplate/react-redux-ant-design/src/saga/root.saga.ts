import { all } from "redux-saga/effects";
import { UsersWatcher } from "@/saga/users.saga";
import { fetchDishWatcher } from "@/saga/dish.saga";
import { enumsWatcher } from "@/saga/appEnums.saga";
import { fetchTableWatcher } from "@/saga/table.saga";
import { authWatcher } from "@/saga/auth.saga";
import { fetchReservationWatcher } from "./reservation.saga";
import { fetchDishFromCartWatcher } from "./cart.saga";

export function* RootSaga() {
  yield all([UsersWatcher(), fetchDishWatcher(), fetchTableWatcher(),enumsWatcher(), authWatcher(), fetchReservationWatcher(), fetchDishFromCartWatcher()]);
}
