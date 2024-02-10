export default class Result<T = null> {
    public isSuccess: boolean

    constructor(
        public errors: string[],
        public data: T = <any>null
    ) {
        this.isSuccess = errors.length <= 0
    }

    public static success<T>(value: T): Result<T> {
        return new Result<T>([], value)
    }

    public static fail(error: string): Result {
        return new Result([error])
    }
}