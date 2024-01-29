import { createContext, useContext, useState } from "react";

export enum LoginPageType {
    Hello = 1,
    GetData = 2
}

interface IProps {
    pageType: LoginPageType,
    changePage: (pageType: LoginPageType) => void
}

const LoginContext = createContext<IProps | undefined>(undefined)

function LoginProvider({ children }) {

    const [pageType, setPageType] = useState<LoginPageType>(LoginPageType.Hello)

    return (
        <LoginContext.Provider value={{ pageType, changePage: setPageType }}>
            {children}
        </LoginContext.Provider>
    )
}

export const useLoginPage = () => {
    const context = useContext(LoginContext)
    return context;
}

export default LoginProvider