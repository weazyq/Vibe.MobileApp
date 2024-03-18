import React, { useContext, useEffect, useState } from "react"
import { Client } from "../domain/clients/client"
import { ClientProvider } from "../domain/clients/clientProvider"
import AsyncStorage from "@react-native-async-storage/async-storage"

interface RentalContextProps {
    client: Client,
}

const RentalContext = React.createContext<RentalContextProps>({
    client: null,
})

function RentalProvider({ children }) {
    const [client, setClient] = useState<Client | null>(null)

    async function loadClientByUser(){
        const userId = await AsyncStorage.getItem('userId')
        const client = await ClientProvider.getClient(userId)
        setClient(client)
    }

    useEffect(() => {
        loadClientByUser()
    }, [])

    return (<RentalContext.Provider value={{
        client,
    }}>
        {children}
    </RentalContext.Provider>)
}

export function useRentalContext() {
    const context = useContext(RentalContext)
    return context
}

export default RentalProvider