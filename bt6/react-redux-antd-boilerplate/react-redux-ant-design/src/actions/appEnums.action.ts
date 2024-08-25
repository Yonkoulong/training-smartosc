export enum enumsActions {
    FETCH_ENUMS = "fetch-enums",
    FETCH_ENUMS_SUCCESS = "fetch-enums-success",
    FETCH_ENUMS_FAILED = "fetch-enums-failed"
}

export const fetchEnums = () => ({
    type: enumsActions.FETCH_ENUMS
})
export const fetchEnumsSuccess = (payload: any) => ({
    type: enumsActions.FETCH_ENUMS_SUCCESS, 
    payload
})