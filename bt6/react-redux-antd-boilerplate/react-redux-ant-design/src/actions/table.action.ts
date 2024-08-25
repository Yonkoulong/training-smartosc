
export enum tableActionType {
    FETCH_TABLE = "table/fetch-table",
    FETCH_TABLE_SUCCESS = "table/fetch-success",
}

export const createFetchTableAction = () => {
    return {
        type: tableActionType.FETCH_TABLE
    };
}

export const createFetchTableSuccessAction = (payload: any) => {
    return {
        type: tableActionType.FETCH_TABLE_SUCCESS,
        payload
    }
}