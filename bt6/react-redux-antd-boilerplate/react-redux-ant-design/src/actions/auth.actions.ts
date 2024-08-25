import { Action } from "redux";
import { IUser } from "@/types/users.type";
import { AxiosError } from "axios";

export enum UserActionTypes {
  FETCH_USERS = "user/fetch-all",
  FETCH_USERS_SUCCESS = "user/fetch-all-success",
  FETCH_USERS_ERROR = "user/fetch-all-error",
}

export type FetchUsersAction = Action<UserActionTypes.FETCH_USERS>;

export type FetchUsersSuccessAction =
  Action<UserActionTypes.FETCH_USERS_SUCCESS> & {
    payload: IUser[];
  };

export type FetchUsersErrorAction =
  Action<UserActionTypes.FETCH_USERS_ERROR> & {
    payload: AxiosError;
  };

export function fetchUsersAction(): FetchUsersAction {
  return {
    type: UserActionTypes.FETCH_USERS,
  };
}

export function fetchUsersSuccessAction(
  users: IUser[],
): FetchUsersSuccessAction {
  return {
    type: UserActionTypes.FETCH_USERS_SUCCESS,
    payload: users,
  };
}

export function fetchUsersErrorAction(
  error: AxiosError,
): FetchUsersErrorAction {
  return {
    type: UserActionTypes.FETCH_USERS_ERROR,
    payload: error,
  };
}
