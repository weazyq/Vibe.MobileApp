import { Stack } from "expo-router"
import AuthProvider from "../../contexts/authContext"

const SupportLayout = () => {
    return <AuthProvider>
        <Stack>
            <Stack.Screen name="createSupportRequest" options={{ headerTitle: 'Создание заявки' }}/>
            <Stack.Screen name="[id]" options={{headerTitle: 'Обращение'}}/>
        </Stack>
    </AuthProvider>
}

export default SupportLayout