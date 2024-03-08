import { View } from 'react-native';
import { LoginPageType, useLoginPage } from './LoginContext';
import CheckSmsPage from './pages/checkSmsPage';
import GetDataPage from './pages/getDataPage';
import Hello from './pages/hello';

function LoginScreen() {
    const { pageType } = useLoginPage()

    return (
        <View style={{padding: 20, width: '100%', height: '100%'}}>
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
            case LoginPageType.PhoneConfirmPage:
                return <CheckSmsPage />
        }
    }
}

export default LoginScreen