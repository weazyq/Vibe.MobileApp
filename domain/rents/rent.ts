export class Rent {
    constructor(
        public id: string,
        public clientId: string,
        public scooterId: string,
        public price: number,
        public isClosed: boolean,
        public startedAt: Date,
        public endedAt: Date,
    ) {}
}

export function mapToRent(data: any) {
    return new Rent(data.id, data.clientId, data.scooterId, data.price, data.isClosed, data.startedAt, data.endedAt)
}

export function mapToRents(data: any[]) {
    return data.map(d => mapToRent(d))
}