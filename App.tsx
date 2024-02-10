import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';
import AuthProvider, { useAuth } from './AuthProvider';
import LoginProvider from './apps/login/LoginContext';
import LoginScreen from './apps/login/loginScreen';

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );

  function AppContent() {
    const { isAuthenticated } = useAuth()

    return (
      <>
        <StatusBar backgroundColor='#fff' />
        <SafeAreaView style={{ paddingTop: 30, backgroundColor: '#fff' }}>
          {
            isAuthenticated
              ? <>
              </>
              : <LoginProvider>
                <LoginScreen />
              </LoginProvider>
          }
        </SafeAreaView >
      </>
    )
  }
}