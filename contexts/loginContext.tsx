import { createContext, useContext, useState } from "react";
import { ClientBlank } from "../domain/clients/clientBlank";

interface IProps {
    clientBlank: ClientBlank | null
    setClientBlank: React.Dispatch<React.SetStateAction<ClientBlank>>
}

const LoginContext = createContext<IProps | undefined>(undefined)

function LoginProvider({ children }) {
    const [clientBlank, setClientBlank] = useState<ClientBlank>(ClientBlank.getDefaultBlank())

    return (
        <LoginContext.Provider value={{ clientBlank, setClientBlank }}>
            {children}
        </LoginContext.Provider>
    )
}

export const useLoginPage = () => {
    const context = useContext(LoginContext)
    return context;
}

export default LoginProvider