import React from 'react';

export const AuthContext = React.createContext();

export function AuthProvider({children}) {
    return (
        <AuthContext.Provider>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;