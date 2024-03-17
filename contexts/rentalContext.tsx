import React, { useContext, useState } from "react"
import { Client } from "../domain/clients/client"

interface RentalContextProps {
    client: Client,
    onClientLoaded: (client: Client) => void
}

const RentalContext = React.createContext<RentalContextProps>({
    client: null,
    onClientLoaded: () => { },
})

function RentalProvider({ children }) {
    const [client, setClient] = useState<Client | null>(null)

    return (<RentalContext.Provider value={{
        client,
        onClientLoaded: (client) => setClient(client),
    }}>
        {children}
    </RentalContext.Provider>)
}

export function useRentalContext() {
    const context = useContext(RentalContext)
    return context
}

export default RentalProvider