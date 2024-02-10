import { createContext, useContext, useState } from "react";
import { ClientBlank } from "../../domain/clients/clientBlank";

export enum LoginPageType {
    Hello = 1,
    GetData = 2,
    PhoneConfirmPage = 3,
}

interface IProps {
    pageType: LoginPageType,
    clientBlank: ClientBlank | null
    changePage: (pageType: LoginPageType) => void
    setClientBlank: React.Dispatch<React.SetStateAction<ClientBlank>>
}

const LoginContext = createContext<IProps | undefined>(undefined)

function LoginProvider({ children }) {
    const [clientBlank, setClientBlank] = useState<ClientBlank>(ClientBlank.getDefaultBlank())
    const [pageType, setPageType] = useState<LoginPageType>(LoginPageType.Hello)

    return (
        <LoginContext.Provider value={{ pageType, clientBlank, setClientBlank, changePage: setPageType }}>
            {children}
        </LoginContext.Provider>
    )
}

export const useLoginPage = () => {
    const context = useContext(LoginContext)
    return context;
}

export default LoginProvider