
export enum TokenActionTypes {
    VALIDATE_ACCESS_TOKEN = "token/validate-access",
    VALIDATE_ACCESS_TOKEN_SUCCESS = "token/validate-access-success",
    VALIDATE_ACCESS_TOKEN_ERROR = "token/validate-access-error",
    REMOVE_ACCESS_TOKEN = "token/remove-access"
}

export const validateAccessToken = (token: String) => {
    return {
        type: TokenActionTypes.VALIDATE_ACCESS_TOKEN,
        token
    };
};

export const validateAccessTokenSuccess = (payload: any) => {
    return {
        type: TokenActionTypes.VALIDATE_ACCESS_TOKEN_SUCCESS,
        payload
    }
}; 

export const validateAccessTokenError = () => {
    return {
        type: TokenActionTypes.VALIDATE_ACCESS_TOKEN_ERROR,
    }
};

export const removeAccessToken = () => {
    return {
        type: TokenActionTypes.REMOVE_ACCESS_TOKEN
    }
}
