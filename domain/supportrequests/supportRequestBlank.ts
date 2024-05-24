export default class SupportRequestBlank {
    constructor(
        public title: string | null,
        public description: string | null
    ) { }

    static getDefaultBlank(){
        return new SupportRequestBlank(null, null)
    }
}