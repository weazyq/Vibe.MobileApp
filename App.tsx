import { useContext, useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import AuthProvider, { AuthContext } from './AuthProvider';
import LoginProvider from './apps/login/LoginContext';
import LoginScreen from './apps/login/loginScreen';
import RentalProvider from './apps/rental/rentalContext';
import RentalScreen from './apps/rental/rentalScreen';

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );

  function AppContent() {
    const { isAuthenticated, checkAuthorize } = useContext(AuthContext)

    useEffect(() => {
      checkAuthorize()
    }, [])

    const styles = StyleSheet.create({
      container: {
        width: "100%",
        height: "100%",
      }
    })

    return (
      <SafeAreaView style={styles.container}>
        {
          isAuthenticated
            ? <RentalProvider>
              <RentalScreen />
            </RentalProvider>
            : <LoginProvider>
              <LoginScreen />
            </LoginProvider>
        }
      </SafeAreaView >
    )
  }
}