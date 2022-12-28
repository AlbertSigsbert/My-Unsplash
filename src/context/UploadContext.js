import {createContext, useReducer} from "react";

export const UploadContext = createContext();

export const uploadReducer = (state, action) => {
    switch(action.type){
        case 'SET_PROGRESS':
            return { ...state, progress:action.payload}
        case 'SET_URL':
            return { ...state, url:action.payload}
        case 'SET_ERROR':
            return { ...state, error:action.payload}
        default:
            return state
    }

};


export function UploadContextProvider({children}) {
    const [state,dispatch] = useReducer(uploadReducer, {
       progress: 0,
       url: null,
       error:null
    });
 
    return (
        <UploadContext.Provider value={{...state, dispatch}}>
            {children}
        </UploadContext.Provider>
    );
}