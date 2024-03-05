export class LoginResultDTO {
    constructor(
        public userId: string,
        public token: string,
        public refreshToken: string
    ) { }
}