import React, { useContext, useState } from "react"
import { Client } from "../../domain/clients/client"
import { RentalTabType } from "./types/RentalTab"
import { Scooter } from "../../domain/scooters/scooter"

interface RentalContextProps {
    activeTab: RentalTabType
    client: Client,
    scooters: Scooter[],
    changeActiveTab: (tab: RentalTabType) => void
    onClientLoaded: (client: Client) => void
    onScootersLoaded: (scooters: Scooter[]) => void
}

const RentalContext = React.createContext<RentalContextProps>({
    activeTab: RentalTabType.Ride,
    client: null,
    scooters: [],
    changeActiveTab: () => { },
    onClientLoaded: () => { },
    onScootersLoaded: () => {}
})

function RentalProvider({ children }) {
    const [activeTab, setActiveTab] = useState<RentalTabType>(RentalTabType.Ride)
    const [client, setClient] = useState<Client | null>(null)
    const [scooters, setScooters] = useState<Scooter[]>([])

    return (<RentalContext.Provider value={{
        activeTab,
        client,
        scooters,
        changeActiveTab: (tab) => setActiveTab(tab),
        onClientLoaded: (client) => setClient(client),
        onScootersLoaded: (scooters) => setScooters(scooters)
    }}>
        {children}
    </RentalContext.Provider>)
}

export function useRentalContext() {
    const context = useContext(RentalContext)
    return context
}

export default RentalProvider