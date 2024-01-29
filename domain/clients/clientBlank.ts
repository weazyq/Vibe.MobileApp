export class ClientBlank {
    constructor(
        public name: string | null,
        public phone: string | null
    ) { }

    static getDefaultBlank(): ClientBlank {
        return new ClientBlank(null, null)
    }
}