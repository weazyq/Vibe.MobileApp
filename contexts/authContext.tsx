import AsyncStorage from "@react-native-async-storage/async-storage"
import { createContext, useContext, useState } from "react"
import { AuthUserProvider } from "../domain/infrastructure/authUserProvider"
import { router } from "expo-router"

interface AuthContext {
    isAuthenticated: boolean,
    onAuthorize: (clientId: string, token: string, refreshToken: string) => void
    checkAuthorize: () => Promise<void>
    logout: () => void
}

export const AuthContext = createContext<AuthContext | undefined>(undefined)

function AuthProvider({ children }) {
    const defaultValue: AuthContext =
    {
        isAuthenticated: false,
        onAuthorize: authrorize,
        checkAuthorize: checkAuthorize,
        logout: logout,
    }

    const [authContext, setAuthContext] = useState<AuthContext>(defaultValue)

    function changeContext(context: Partial<AuthContext>) {
        setAuthContext((prevContext) => ({ ...prevContext, ...context }))
    }

    function authrorize(clientId: string, token: string, refreshToken: string) {
        AsyncStorage.setItem('refreshToken', refreshToken)
        AsyncStorage.setItem('token', token)
        AsyncStorage.setItem('clientId', clientId)
        
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

        authrorize(response.data.clientId, response.data.token, response.data.refreshToken)
    }

    function logout() {
        AsyncStorage.clear()
        changeContext({
            isAuthenticated: false
        })
        
        router.replace('/')
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