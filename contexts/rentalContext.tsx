import React, { useContext, useEffect, useState } from "react"
import { Client } from "../domain/clients/client"
import { ClientProvider } from "../domain/clients/clientProvider"
import { Rent } from "../domain/rents/rent"
import { RentProvider } from "../domain/rents/rentProvider"
import Result from "../tools/result"

interface RentalContextProps {
    client: Client,
    activeRent: Rent | null,
    tryInitializeRent: (scooterId: string, clientId: string) => Promise<Result<null>>,
    endRent: () => void
}

const RentalContext = React.createContext<RentalContextProps>({
    client: null,
    activeRent: null,
    tryInitializeRent: async(scooterId: string, clientId: string) => { return Result.success(null) },
    endRent: () => {}
})

function RentalProvider({ children }) {
    const [client, setClient] = useState<Client | null>(null)
    const [activeRent, setActiveRent] = useState<Rent | null>(null)

    async function loadClientByUser(){
        const client = await ClientProvider.getClient()
        setClient(client)
    }

    async function loadUserRent(){
        const activeRent = await RentProvider.loadActiveUserRent()
        setActiveRent(activeRent)
    }

    async function endRent(){
        const result = await RentProvider.EndRent(activeRent.id)
        if(result.isSuccess) setActiveRent(null)
    }

    async function tryInitializeRent(scooterId: string, clientId: string): Promise<Result<null>> {
        const initializeRentResult = await RentProvider.initializeRent(scooterId, clientId)
        if(!initializeRentResult.isSuccess) return Result.fail(initializeRentResult.errors[0])

        setActiveRent(initializeRentResult.data)
        return Result.success(null)
    }

    useEffect(() => {
        loadClientByUser()
        loadUserRent()
    }, [])

    return (<RentalContext.Provider value={{
        client,
        activeRent,
        tryInitializeRent,
        endRent,
    }}>
        {children}
    </RentalContext.Provider>)
}

export function useRentalContext() {
    const context = useContext(RentalContext)
    return context
}

export default RentalProvider