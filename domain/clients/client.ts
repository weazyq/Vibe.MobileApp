export class Client {
    constructor(
        public name: string,
        public phone: string,
    ) { }
}

export function mapToClient(data: any): Client {
    return new Client(
        data.name,
        data.phone
    )
}