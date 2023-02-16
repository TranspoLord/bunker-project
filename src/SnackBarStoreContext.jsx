import React, {createContext, useReducer} from 'react';
import Reducer from './SnackBarReducer';

const initialState = {
    open: false,
    severity: "success",
    message: "Success",
};

const Store = ({children}) => {
    const [state, dispatch] = useReducer(Reducer, initialState);
    return (
        <StoreContext.Provider value={{state, dispatch}}>
            {children}
        </StoreContext.Provider>
    );
};

export const Context = createContext(initialState);
export default Store;