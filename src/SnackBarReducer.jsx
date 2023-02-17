import React, {userReducer} from 'react';

const reducer = (state, action) => {
    switch (action.type) {
        case "OPEN":
            return {
                ...state,
                severity: action.severity,
                message: action.message,
                open: true
            };
        case "CLOSE":
            return {
                ...state,
                severity: "success",
                message: "",
                open: false
            };
        default:
            return state;
    }
}

export default reducer;