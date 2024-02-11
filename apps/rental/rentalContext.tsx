import React, { useContext, useState } from "react"
import { Client } from "../../domain/clients/client"
import { RentalTabType } from "./types/RentalTab"

interface RentalContextProps {
    client: Client,
    activeTab: RentalTabType
    changeActiveTab: (tab: RentalTabType) => void
}

const defaultClient = new Client('Владислав', '+79779221861')

const RentalContext = React.createContext<RentalContextProps>({
    client: defaultClient,
    activeTab: RentalTabType.Ride,
    changeActiveTab: (tab: RentalTabType) => { }
})

function RentalProvider({ children }) {
    const [activeTab, setActiveTab] = useState<RentalTabType>(RentalTabType.Ride)

    return (<RentalContext.Provider value={{
        activeTab,
        changeActiveTab: (tab) => setActiveTab(tab),
        client: defaultClient
    }}>
        {children}
    </RentalContext.Provider>)
}

export function useRentalContext() {
    const context = useContext(RentalContext)
    return context
}

export default RentalProvider