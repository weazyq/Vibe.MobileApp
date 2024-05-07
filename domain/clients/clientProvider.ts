import axios from "axios";
import Constants from "../../constants/constants";
import Result from "../../tools/result";
import { ClientBlank } from "./clientBlank";
import { LoginResultDTO } from "../infrastructure/loginResultDTO";
import { Client, mapToClient } from "./client";
import AsyncStorage from "@react-native-async-storage/async-storage";

export class ClientProvider {
    static async checkIsPhoneNumberExist(phoneNumber: string): Promise<boolean> {
        const response = await axios.get(`${Constants.serverUrl}/CheckPhoneNumber`, {
            params: {
                phoneNumber
            },
            ...Constants.axiosConfig
        })

        return response.data
    }

    static async sendSms(phoneNumber: string): Promise<Result> {
        const response = await axios.get(`${Constants.serverUrl}/SendSms`, {
            params: {
                phoneNumber
            },
            ...Constants.axiosConfig
        })

        if (!response.data.isSuccess) return Result.fail(response.data.errors[0])

        return Result.success(null)
    }

    static async login(clientBlank: ClientBlank, code: string): Promise<Result<LoginResultDTO>> {
        const response = await axios.post(`${Constants.serverUrl}/Login`, { clientBlank, code }, Constants.axiosConfig)
        if (!response.data.isSuccess) return Result.fail(response.data.errors[0].message)

        const registerResult: LoginResultDTO = {
            userId: response.data.value.userId,
            token: response.data.value.token,
            refreshToken: response.data.value.refreshToken
        }

        return Result.success(registerResult)
    }

    static async checkSms(clientBlank: ClientBlank, code: string): Promise<Result<LoginResultDTO>> {
        const response = await axios.post(`${Constants.serverUrl}/CheckSms`, { clientBlank, code }, Constants.axiosConfig)
        if (!response.data.isSuccess) return Result.fail(response.data.errors[0].message)

        const registerResult: LoginResultDTO = {
            userId: response.data.value.userId,
            token: response.data.value.token,
            refreshToken: response.data.value.refreshToken
        }

        return Result.success(registerResult)
    }

    static async getClient(): Promise<Client> {
        const token = await AsyncStorage.getItem('token')

        const response = await axios.get(`${Constants.serverUrl}/GetClient`, {
            headers: {
                ...Constants.axiosConfig.headers,
                Authorization: `Bearer ${token}`
            }
        })

        return mapToClient(response.data)
    }
}