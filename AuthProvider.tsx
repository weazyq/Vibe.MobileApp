import { Dispatch, SetStateAction, createContext, useContext, useState } from "react"

interface AuthContextProps {
    isAuthenticated: boolean
    setIsAuthenticated: Dispatch<SetStateAction<boolean>>
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    return context;
}

export default AuthProvider