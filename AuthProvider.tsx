import AsyncStorage from "@react-native-async-storage/async-storage"
import { createContext, useState } from "react"
import { AuthUserProvider } from "./domain/infrastructure/authProvider"

interface AuthContext {
    isAuthenticated: boolean,
    token: string | null,
    userId: string | null,
    onAuthorize: (userId: string, token: string, refreshToken: string) => void
    checkAuthorize: () => void
}

export const AuthContext = createContext<AuthContext | undefined>(undefined)

function AuthProvider({ children }) {
    const defaultValue: AuthContext =
    {
        isAuthenticated: false,
        token: null,
        userId: null,
        onAuthorize: authrorize,
        checkAuthorize: checkAuthorize
    }

    const [context, setContext] = useState<AuthContext>(defaultValue)

    function changeContext(context: Partial<AuthContext>) {
        setContext((prevContext) => ({ ...prevContext, ...context }))
    }

    function authrorize(userId: string, token: string, refreshToken: string) {
        AsyncStorage.setItem('refreshToken', refreshToken)
        AsyncStorage.setItem('token', token)
        
        changeContext({ token, userId, isAuthenticated: true })
    }

    async function checkAuthorize(){
        const refreshToken = await AsyncStorage.getItem('refreshToken')
        if(refreshToken == null) return changeContext({isAuthenticated: false })

        const response = await AuthUserProvider.refreshToken(refreshToken)
        if(!response.isSuccess) return changeContext({isAuthenticated: false })

        authrorize(response.data.userId, response.data.token, response.data.refreshToken)
    }

    return (
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider