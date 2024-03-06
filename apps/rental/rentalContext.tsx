import React, { useContext, useState } from "react"
import { Client } from "../../domain/clients/client"
import { RentalTabType } from "./types/RentalTab"

interface RentalContextProps {
    activeTab: RentalTabType
    client: Client,
    changeActiveTab: (tab: RentalTabType) => void
    onClientLoaded: (client: Client) => void
}

const RentalContext = React.createContext<RentalContextProps>({
    client: null,
    activeTab: RentalTabType.Ride,
    changeActiveTab: (tab: RentalTabType) => { },
    onClientLoaded: (client: Client) => { },
})

function RentalProvider({ children }) {
    const [activeTab, setActiveTab] = useState<RentalTabType>(RentalTabType.Ride)
    const [client, setClient] = useState<Client | null>(null)

    return (<RentalContext.Provider value={{
        activeTab,
        client,
        changeActiveTab: (tab) => setActiveTab(tab),
        onClientLoaded: (client) => setClient(client)
    }}>
        {children}
    </RentalContext.Provider>)
}

export function useRentalContext() {
    const context = useContext(RentalContext)
    return context
}

export default RentalProvider