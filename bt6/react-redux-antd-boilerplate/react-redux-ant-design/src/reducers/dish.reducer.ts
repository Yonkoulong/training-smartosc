import { dishActionType } from "@/actions/dish.action";
import { isTryStatement } from "typescript";

const initialState: any = {
    dishes: [],
  };

export function DishReducer(state = initialState, action: any){
    switch(action.type){
        case dishActionType.FETCH_DISH_SUCCESS: 
            return {
                ...state,
                dishes: action.payload
            }
        case dishActionType.UPDATE_DISH:
            return {
                ...state,
                dishes: action.payload
            }
        default: return {...state}   
    }
}