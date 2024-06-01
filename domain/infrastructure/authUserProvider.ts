import axios from "axios";
import Constants from "../../constants/constants";
import Result from "../../tools/result";
import { LoginResultDTO } from "./loginResultDTO";

export class AuthUserProvider {
    static async refreshToken(refreshToken: string): Promise<Result<LoginResultDTO>> {
        const response = await axios.get(`${Constants.serverUrl}/Auth/RefreshToken`, {
            params: {
                refreshToken
            },
            ...Constants.axiosConfig
        })
        if (!response.data.isSuccess) return Result.fail(response.data.errors[0])

        const registerResult: LoginResultDTO = {
            clientId: response.data.value.clientId,
            token: response.data.value.token,
            refreshToken: response.data.value.refreshToken
        }

        return Result.success(registerResult)
    }
}