import { Action } from "redux";

export enum CartActionTypes {
    FETCH_DISH_FROM_CART = "cart/fetch-all",
    FETCH_DISH_FROM_CART_SUCCESS = "cart/fetch-success",

}

export const createFetchDishFromCartAction = () => {
    return { 
        type: CartActionTypes.FETCH_DISH_FROM_CART
    }
}

export const createFetchDishFromCartSuccessAction = (payload: any) => {
    return { 
        type: CartActionTypes.FETCH_DISH_FROM_CART_SUCCESS,
        payload
    };
}

