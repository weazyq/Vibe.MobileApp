import AsyncStorage from "@react-native-async-storage/async-storage"
import { createContext, useContext, useState } from "react"
import { AuthUserProvider } from "../domain/infrastructure/authUserProvider"

interface AuthContext {
    isAuthenticated: boolean,
    onAuthorize: (userId: string, token: string, refreshToken: string) => void
    checkAuthorize: () => Promise<void>
}

export const AuthContext = createContext<AuthContext | undefined>(undefined)

function AuthProvider({ children }) {
    const defaultValue: AuthContext =
    {
        isAuthenticated: false,
        onAuthorize: authrorize,
        checkAuthorize: checkAuthorize
    }

    const [authContext, setAuthContext] = useState<AuthContext>(defaultValue)

    function changeContext(context: Partial<AuthContext>) {
        setAuthContext((prevContext) => ({ ...prevContext, ...context }))
    }

    function authrorize(userId: string, token: string, refreshToken: string) {
        AsyncStorage.setItem('refreshToken', refreshToken)
        AsyncStorage.setItem('token', token)
        AsyncStorage.setItem('userId', userId)
        
        changeContext({ isAuthenticated: true })
    }

    async function checkAuthorize(){
        const refreshToken = await AsyncStorage.getItem('refreshToken')
        if(refreshToken == null) return changeContext({isAuthenticated: false })

        const response = await AuthUserProvider.refreshToken(refreshToken)
        if(!response.isSuccess) {
            changeContext({isAuthenticated: false })
            return await AsyncStorage.removeItem('refreshToken')
        }

        authrorize(response.data.userId, response.data.token, response.data.refreshToken)
    }

    return (
        <AuthContext.Provider value={authContext}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuthContext() {
    const context = useContext(AuthContext)
    return context
}

export default AuthProvider