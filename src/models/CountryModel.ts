interface CountryModel {
    name: { common: string };
    flags: { png: string };
    region: string;
    subregion: string;
    capital: string;
    currencies?: {
        [key: string]: {
            name: string;
            symbol: string;
        }
    };
    maps: { googleMaps: string };
    startOfWeek: string;
    timezones: string;
    population: number;
}

export default CountryModel;