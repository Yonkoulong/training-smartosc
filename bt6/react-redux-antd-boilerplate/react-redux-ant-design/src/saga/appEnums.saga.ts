import { enumsActions, fetchEnumsSuccess } from "@/actions/appEnums.action";
import {takeLatest, call, put} from "redux-saga/effects"
import { EnumsHttpService } from "@/services/appEnums.service";
import { IResponseGenerator } from "@/types/saga.types";

export function* enumsWatcher(){
    yield takeLatest(enumsActions.FETCH_ENUMS, enumsWorker)
}

export function* enumsWorker(){
    try{
        const respone:IResponseGenerator = yield call(()=>Promise.all([EnumsHttpService.getCategories()]))
        // @ts-ignore
        yield put(fetchEnumsSuccess(respone[0].data));
    }catch(e){

    }
}

