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

    return isAuthenticated
      ? <>Ты авторизован</>
      : <LoginProvider>
        <LoginScreen />
      </LoginProvider>
  }
}