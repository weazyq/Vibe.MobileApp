export enum RentalTabType {
    Help = 0,
    Ride = 1,
    Profile = 2
}

export namespace RentalTabType {
    export function GetOptionLabel(tab: RentalTabType) {
        switch (tab) {
            case RentalTabType.Help:
                return "Помощь"
            case RentalTabType.Ride:
                return "Поехали"
            case RentalTabType.Profile:
                return "Профиль"
            default:
                break;
        }
    }
}
