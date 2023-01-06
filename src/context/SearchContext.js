import {createContext, useReducer} from "react";

export const SearchContext = createContext();

export const SearchReducer = (state, action) => {
    switch(action.type){
        case 'SET_QUERY':
            return { ...state, searchQuery:action.payload}
        default:
            return state
    }

};


export function SearchContextProvider({children}) {
    const [state,dispatch] = useReducer(SearchReducer, {
        searchQuery:''
    });
 
    return (
        <SearchContext.Provider value={{...state, dispatch}}>
            {children}
        </SearchContext.Provider>
    );
}