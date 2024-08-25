import { createFetchReservationSuccessAction, reservationActionTypes } from "@/actions/reservation.action";
import { IResponseGenerator } from "@/types/saga.types";
import { call, put, takeLatest } from "redux-saga/effects";
import { fetchBookingTable } from "@/services/reservation.service"


export function* fetchReservationWatcher() {
    yield takeLatest(reservationActionTypes.FETCH_RESERVATION, fetchReservationWorker)
}

export function* fetchReservationWorker() {
    const response: IResponseGenerator = yield call( fetchBookingTable );
    yield put( createFetchReservationSuccessAction(response.data))
}

