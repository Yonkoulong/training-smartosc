import { Action, ActionCreator } from "redux";

export enum PopupActionType {
    POPUP = "auth/popup"
}

export type PopupAuthAction = Action<PopupActionType.POPUP> & {
    payload: Boolean;
}

export function popupAuthAction(payload: Boolean): PopupAuthAction {
    return { 
        type: PopupActionType.POPUP,
        payload,
    };
}