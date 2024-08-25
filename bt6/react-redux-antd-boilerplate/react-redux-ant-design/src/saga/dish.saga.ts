import { takeLatest, call, put } from "redux-saga/effects";
import {dishActionType, createFetchDishSuccessAction } from "@/actions/dish.action";
import { fetchDish } from "@/services/dish.service"
import { IResponseGenerator } from "@/types/saga.types";

export function* fetchDishWatcher(){
    yield takeLatest(dishActionType.FETCH_DISH, fetchDishWorker)
}

function* fetchDishWorker(){
    const response: IResponseGenerator = yield call(fetchDish);
    yield put(createFetchDishSuccessAction(response.data))    
}
