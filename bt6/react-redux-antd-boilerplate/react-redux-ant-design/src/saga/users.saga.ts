import { takeLatest, call, put } from "redux-saga/effects";
import {
  fetchUsersErrorAction,
  UserActionTypes,
} from "@/actions/auth.actions";
import { getUsers } from "@/services/users.services";
import { IResponseGenerator } from "@/types/saga.types";
import { fetchUsersSuccessAction } from "@/actions/auth.actions";
import { AxiosError } from "axios";

export function* UsersWatcher() {
  yield takeLatest(UserActionTypes.FETCH_USERS, FetchAllUsersWorker);
}

function* FetchAllUsersWorker() {
  try {
    const resp: IResponseGenerator = yield call(getUsers);
    if (!resp) return;
    const { data } = resp;
    yield put(fetchUsersSuccessAction(data));
  } catch (error) {
    yield put(fetchUsersErrorAction(error as AxiosError));
  }
}
