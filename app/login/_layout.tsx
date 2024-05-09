import { Stack } from "expo-router"
import LoginContext from "../../contexts/loginContext"
import AuthProvider from "../../contexts/authContext"

const LoginLayout = () => {
    return <AuthProvider>
        <LoginContext>
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }}/>
                <Stack.Screen name="registerPage" options={{ headerTitle: '' }}/>
                <Stack.Screen name="authPage" options={{ headerTitle: '' }}/>
                <Stack.Screen name="checkSmsPage" options={{ headerTitle: '', headerShown: false }}/>
            </Stack>
        </LoginContext>
    </AuthProvider>
}

export default LoginLayout