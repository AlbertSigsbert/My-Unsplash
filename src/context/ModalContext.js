import {createContext, useReducer} from "react";

export const ModalContext = createContext();


export const modalReducer = (state, action) => {
    switch(action.type){
        case 'SHOW':
            return { ...state, showModal:true}
        case 'REMOVE':
            return { ...state, showModal:false}
        default:
            return state
    }

}

export function ModalContextProvider({children}) {
    const [state,dispatch] = useReducer(modalReducer, {
       showModal:false
    });

    return (
        <ModalContext.Provider value={{...state, dispatch}}>
            {children}
        </ModalContext.Provider>
    );
}