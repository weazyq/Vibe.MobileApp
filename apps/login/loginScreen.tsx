import { SafeAreaView, StyleSheet } from 'react-native';
import { LoginPageType, useLoginPage } from './LoginContext';
import CheckSmsPage from './pages/checkSmsPage';
import GetDataPage from './pages/getDataPage';
import Hello from './pages/hello';

function LoginScreen() {
    const { pageType, clientBlank } = useLoginPage()

    const styles = StyleSheet.create({
        container: {
            width: "100%",
            height: "100%",
            paddingHorizontal: 20,
            paddingVertical: 20
        }
    })

    return (
        <SafeAreaView style={styles.container}>
            {
                renderPage(pageType)
            }
        </SafeAreaView>
    )

    function renderPage(pageType: LoginPageType) {
        switch (pageType) {
            case LoginPageType.Hello:
                return <Hello />
            case LoginPageType.GetData:
                return <GetDataPage />
            case LoginPageType.PhoneConfirmPage:
                return <CheckSmsPage />
        }
    }
}

export default LoginScreen