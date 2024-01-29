import Constants from "../../constants/constants";
import { ClientBlank } from "./clientBlank";

export class ClientProvider {
    static async sendSms(phone: string): Promise<string> {
        const response = await fetch(`${Constants.serverUrl}/?phoneNumber=${phone}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        }).then(response => response.json())

        return response
    }

    static async registerClient(blank: ClientBlank): Promise<string> {
        const response = await fetch(`${Constants.serverUrl}/RegisterClient`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(blank)
        }).then(response => response.json())

        return response
    }
}