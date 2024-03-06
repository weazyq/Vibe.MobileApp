import axios from "axios";
import Constants from "../../constants/constants";
import Result from "../../tools/result";
import { ClientBlank } from "./clientBlank";
import { LoginResultDTO } from "../infrastructure/loginResultDTO";
import { Client, mapToClient } from "./client";

export class ClientProvider {
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

    static async checkSms(clientBlank: ClientBlank, code: string): Promise<Result<LoginResultDTO>> {
        const response = await axios.post(`${Constants.serverUrl}/CheckSms`, { clientBlank, code }, Constants.axiosConfig)
        if (!response.data.isSuccess) return Result.fail(response.data.errors[0])

        const registerResult: LoginResultDTO = {
            userId: response.data.value.userId,
            token: response.data.value.token,
            refreshToken: response.data.value.refreshToken
        }

        return Result.success(registerResult)
    }

    static async getClient(userId: string): Promise<Client> {
        const response = await axios.get(`${Constants.serverUrl}/GetClient`, { 
            params: {
                userId
            },
            ...Constants.axiosConfig
        })

        return mapToClient(response.data.value)
    }
}