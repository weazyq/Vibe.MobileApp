import axios from "axios";
import Result from "../../tools/result";
import Constants from "../../constants/constants";
import { Rent, mapToRent, mapToRents } from "./rent";
import AsyncStorage from "@react-native-async-storage/async-storage";

export class RentProvider {
    static async initializeRent(scooterId: string, clientId: string): Promise<Result<Rent>> {
        const token = await AsyncStorage.getItem('token')

        const response = await axios.get(`${Constants.serverUrl}/InitializeRent`, {
            params: {
                scooterId,
                clientId
            },
            headers: {
                ...Constants.axiosConfig.headers,
                Authorization: `Bearer ${token}`
            },
        })

        if(!response.data.isSuccess) return Result.fail(response.data.errors[0])

        const rent = mapToRent(response.data.value)
        return Result.success(rent)
    }
    
    static async loadActiveUserRent(): Promise<Rent | null>{
        const token = await AsyncStorage.getItem('token')

        const response = await axios.get(`${Constants.serverUrl}/GetActiveUserRent`, {
            headers: {
                ...Constants.axiosConfig.headers,
                Authorization: `Bearer ${token}`
            }
        })

        if(response.data.value == null) return null
        return mapToRent(response.data.value)
    }

    static async EndRent(rentId: string): Promise<Result<null>> {
        const token = await AsyncStorage.getItem('token')

        const response = await axios.get(`${Constants.serverUrl}/EndRent`, {
            params: {
                rentId
            },
            headers: {
                ...Constants.axiosConfig.headers,
                Authorization: `Bearer ${token}`
            }
        })

        if(!response.data.isSuccess) return Result.fail(response.data.errors[0])

        return Result.success(null)
    }

    static async getRentHistory(): Promise<Rent[]> {
        const token = await AsyncStorage.getItem('token')

        const response = await axios.get(`${Constants.serverUrl}/GetRentHistory`, {
            headers: {
                ...Constants.axiosConfig.headers,
                Authorization: `Bearer ${token}`
            }
        })

        return mapToRents(response.data)
    }
}