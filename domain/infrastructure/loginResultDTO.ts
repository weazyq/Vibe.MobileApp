export class LoginResultDTO {
    constructor(
        public clientId: string,
        public token: string,
        public refreshToken: string
    ) { }
}