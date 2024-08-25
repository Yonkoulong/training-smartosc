import { Category } from "@/models/appEnums.model"
import { Action } from "redux";
import { enumsActions } from "@/actions/appEnums.action"

type EnumsState = {
    categories: Category[] | null,
}

const intialState: EnumsState = {
    categories: null
}

export const EnumsReducer = (state = intialState, action: any) => {
    switch(action.type){
        case enumsActions.FETCH_ENUMS_SUCCESS:
            return {
                state,
                categories: action.payload
        }
        default:
            return { ...state }
    }
}