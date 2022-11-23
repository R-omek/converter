export interface CurrencyInfo {
    base: string,
    date: string,
    motd: object,
    rates: {
        UAH: number,
        USD: number,
        EUR: number
    }
}