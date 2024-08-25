import { tableActionType } from "@/actions/table.action";

const initialState: any = {
    tables: [],
};

export function TableReducer(state = initialState, action: any) {
    switch(action.type) {
        case tableActionType.FETCH_TABLE_SUCCESS:
            return { 
                ...state,
                tables: action.payload
            }
        
        default: return {...state}
    }
}