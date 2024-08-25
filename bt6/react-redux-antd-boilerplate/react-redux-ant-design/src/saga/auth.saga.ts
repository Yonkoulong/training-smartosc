import { takeLatest, call, put} from "redux-saga/effects";
import { getUserFollowToken } from "@/services/users.services";
import { IResponseGenerator} from "@/types/saga.types";
import { AxiosError } from "axios";
import { TokenActionTypes, 
        validateAccessTokenSuccess, 
        validateAccessTokenError } 
from "@/actions/token.actions";
import { redirectTo } from "@/utils/history.utils";
import { toast } from "react-toastify";

export function* authWatcher() {
    yield takeLatest(TokenActionTypes.VALIDATE_ACCESS_TOKEN, AuthWorker)
}

function* AuthWorker(actions: any) {
    try {
        const response: IResponseGenerator = yield call(getUserFollowToken, actions.token);
        if(!response) return;
        yield put(validateAccessTokenSuccess(response.data))

        if(Number.isNaN(Number(response.data.role))){
            return;
        }

		if (response.data.role == 1) {
			// toast.success("Login Successfully!", {
			// 	theme: 'colored',
			// })
            redirectTo("/admin");

		} else {
            // toast.success("Login Successfully!", {
			// 	theme: 'colored',
			// })
        }
       
    } catch (error) {
        // yield put(validateAccessTokenError(error as AxiosError))
        toast.error("Login Fail!", {
            theme: 'colored',
        })        
    }
}