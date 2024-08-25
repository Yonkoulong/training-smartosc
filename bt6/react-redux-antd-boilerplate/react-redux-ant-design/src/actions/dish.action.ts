import { Action, ActionCreator } from "redux";

export enum dishActionType {
    FETCH_DISH = "dish/fetch-all",
    FETCH_DISH_SUCCESS = "dish/fetch-success",
    UPDATE_DISH = "dish/update"
}

export const createFetchDishAction = () => {
    return {
        type: dishActionType.FETCH_DISH
    };
}

export const createFetchDishSuccessAction = (payload: any) => {
    return {
        type: dishActionType.FETCH_DISH_SUCCESS,
        payload
    };
}

export const createUpdateDishAction = (payload: any) => {
    return {
        type: dishActionType.UPDATE_DISH,
        payload
    }
}





