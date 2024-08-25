import { IUser } from "@/types/users.type";
import { AnyAction } from "redux";
import { AxiosError } from "axios";
import { UserActionTypes } from "@/actions/auth.actions";
import { TokenActionTypes } from "@/actions/token.actions";
import { toast } from "react-toastify";
import { redirectTo } from "@/utils/history.utils";

type UserState = {
  users: IUser[] | null;
  user: IUser[] | null;
  error: AxiosError | null;
};

const initialState: UserState = {
  users: null,
  user:null,
  error: null,
};

export function UserReducer(state = initialState, action: AnyAction) {
    switch (action.type) {
        case TokenActionTypes.VALIDATE_ACCESS_TOKEN_SUCCESS:
            return {
                error: null,
                user: action.payload,
            };
        case TokenActionTypes.VALIDATE_ACCESS_TOKEN_ERROR:
            return {
                error: action.payload,
                user: null,
            }
        case TokenActionTypes.REMOVE_ACCESS_TOKEN:
            return {
                error: action.payload,
                user: null,
            }
        default:
        return state;
    }
}

