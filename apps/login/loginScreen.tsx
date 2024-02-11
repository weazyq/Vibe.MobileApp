import { LoginPageType, useLoginPage } from './LoginContext';
import CheckSmsPage from './pages/checkSmsPage';
import GetDataPage from './pages/getDataPage';
import Hello from './pages/hello';

function LoginScreen() {
    const { pageType } = useLoginPage()

    return (
        renderPage(pageType)
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