import { Stack } from "expo-router"
import LoginContext from "../../contexts/loginContext"

const LoginLayout = () => {
    return <LoginContext>
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }}/>
            <Stack.Screen name="getDataPage" options={{ headerTitle: '' }}/>
            <Stack.Screen name="checkSmsPage" options={{ headerTitle: '' }}/>
        </Stack>
    </LoginContext>
}

export default LoginLayout