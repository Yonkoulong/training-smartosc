import { CartActionTypes } from "@/actions/cart.action";


const initialState: any = {
  carts: [], 
};

export function CartReducer(state = initialState, action: any) {
    switch(action.type) {
        case CartActionTypes.FETCH_DISH_FROM_CART_SUCCESS:
            return { 
                ...state, 
                carts: action.payload
            }
        default: return {...state}
    }
}