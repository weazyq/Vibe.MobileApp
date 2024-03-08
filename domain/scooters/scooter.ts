import { ScooterState } from "./types/scooterState";

export class Scooter {
    constructor(
        public id: string,
        public serialNumber: string | null,
        public latitude: number | null,
        public longitude: number | null,
        public charge: number | null,
        public state: ScooterState
    ) {}

}

export function mapToScooter(data: any) {
    return new Scooter(data.id, data.serialNumber, data.latitude, data.longitude, data.charge, data.state)
}

export function mapToScooters(data: any[]) {
    return data.map(d => mapToScooter(d))
}