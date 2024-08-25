
export enum reservationActionTypes {
    FETCH_RESERVATION = "reservation/fetch-reservation",
    FETCH_RESERVATION_SUCCESS = "reservation/fetch-success",
    FETCH_RESERVATION_FAIL = "reservation/",
    UPDATE_STATUS = "reservation/update-status"
}

export const createFetchReservationAction = () => {
    return {
        type: reservationActionTypes.FETCH_RESERVATION
    }
};

export const createFetchReservationSuccessAction = (payload: any) => {
    return {
        type: reservationActionTypes.FETCH_RESERVATION_SUCCESS,
        payload
    }
}

export const createFetchReservationFailAction = () => {
    return {
        type: reservationActionTypes.FETCH_RESERVATION_FAIL
    }
}

export const updateStatus = (index: number) => {
    return {
        type: reservationActionTypes.UPDATE_STATUS,
        payload: index
    }
}