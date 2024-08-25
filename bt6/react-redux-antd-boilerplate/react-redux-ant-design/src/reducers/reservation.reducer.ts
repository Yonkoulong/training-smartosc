import { reservationActionTypes } from "@/actions/reservation.action";

const initialState: any = {
    reservations: [],
};

export function ReservationReducer(state = initialState, action: any) {
    switch(action.type) {
        case reservationActionTypes.FETCH_RESERVATION_SUCCESS:
            return { 
                ...state,
                reservations: action.payload
            }

        case reservationActionTypes.UPDATE_STATUS:
            const _reservations = state.reservations;
            return { 
                ...state,
                reservations: _reservations,
            }
        case reservationActionTypes.FETCH_RESERVATION_FAIL:
            return {
                message: "error"
            }
        default: return {...state}

    }
}