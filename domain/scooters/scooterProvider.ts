import axios from "axios";
import { Scooter, mapToScooters } from "./scooter";
import Constants from "../../constants/constants";

export class ScooterProvider{
    static async getScooters(): Promise<Scooter[]> {
        const response = await axios.get(`${Constants.serverUrl}/GetScooters`, Constants.axiosConfig)

        return mapToScooters(response.data)
    }
}