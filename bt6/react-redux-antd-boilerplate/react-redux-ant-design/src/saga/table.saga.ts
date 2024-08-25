import { takeLatest, call, put } from "redux-saga/effects";
import { tableActionType, createFetchTableSuccessAction } from "@/actions/table.action";
import { fetchTable } from "@/services/table.service";
import { IResponseGenerator} from "@/types/saga.types";

export function* fetchTableWatcher() {
    yield takeLatest(tableActionType.FETCH_TABLE, fetchTableWorker)
}

function* fetchTableWorker() {
    const response: IResponseGenerator = yield call(fetchTable);    
    yield put(createFetchTableSuccessAction(response.data))
}