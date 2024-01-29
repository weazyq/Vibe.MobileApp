import { StyleSheet, View } from 'react-native';
import { LoginPageType, useLoginPage } from './LoginContext';
import GetDataPage from './pages/getDataPage';
import Hello from './pages/hello';


function LoginScreen() {
    const { pageType } = useLoginPage()

    const styles = StyleSheet.create({
        container: {
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            paddingHorizontal: 20,
            paddingVertical: 20
        }
    })

    return (
        <View style={styles.container}>
            {
                renderPage(pageType)
            }
        </View>
    )

    function renderPage(pageType: LoginPageType) {
        switch (pageType) {
            case LoginPageType.Hello:
                return <Hello />
            case LoginPageType.GetData:
                return <GetDataPage />
        }
    }
}

export default LoginScreen