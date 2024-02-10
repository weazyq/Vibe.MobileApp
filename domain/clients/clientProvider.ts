import axios from "axios";
import Constants from "../../constants/constants";
import Result from "../../tools/result";
import { ClientBlank } from "./clientBlank";

export class ClientProvider {
    static async sendSms(phoneNumber: string): Promise<Result> {
        const response = await axios.get(`${Constants.serverUrl}/SendSms`, {
            params: {
                phoneNumber: phoneNumber
            },
            ...Constants.axiosConfig
        })

        if (!response.data.isSuccess) return Result.fail(response.data.errors[0])
        return Result.success(null)
    }

    static async checkSms(phoneNumber: string, code: string): Promise<Result> {
        const response = await axios.post(`${Constants.serverUrl}/CheckSms`, { phoneNumber, code }, Constants.axiosConfig)

        if (!response.data.isSuccess) return Result.fail(response.data.errors[0])
        return Result.success(null)
    }

    static async registerClient(blank: ClientBlank): Promise<string> {
        const response = await axios.post(`${Constants.serverUrl}/RegisterClient`, blank, Constants.axiosConfig)

        return JSON.stringify(response)
    }
}