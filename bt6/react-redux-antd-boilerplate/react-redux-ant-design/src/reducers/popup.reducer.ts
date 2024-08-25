import { AnyAction } from "redux";
import { PopupActionType } from "@/actions/popup.actions";

export type AuthState = {
    popup: Boolean;
};

const initialState: AuthState = {
    popup: false,
};

export function PopupReducer(state = initialState, actions: AnyAction) {
    const { popup } = state;
    switch (actions.type) {
        case PopupActionType.POPUP: {
            return {
                popup: !popup,
            }
        }
        default: 
            return state;
    }
}