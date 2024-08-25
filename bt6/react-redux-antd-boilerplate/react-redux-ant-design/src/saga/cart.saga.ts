import { CartActionTypes, createFetchDishFromCartSuccessAction } from "@/actions/cart.action";
import { fetchDishFromCart } from "@/services/cart.service";
import { IResponseGenerator } from "@/types/saga.types";
import { call, put, takeLatest } from "redux-saga/effects";

export function* fetchDishFromCartWatcher() {
    yield takeLatest(CartActionTypes.FETCH_DISH_FROM_CART, fetchDishFromCartWorker);
}

export function* fetchDishFromCartWorker() {
    const response: IResponseGenerator = yield call(fetchDishFromCart);
    yield put(createFetchDishFromCartSuccessAction(response.data));
}