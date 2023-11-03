import axios from "axios";
import config from "../utils/config";

class CountriesServices {

    async getAllCountries() {
        const { data } = await axios.get(config.All_Countries_ROUTE)
        return data;
    }


    async getCountriesByRegion(region: string) {
        const { data } = await axios.get(`${config.Search_By_Region_ROUTE}${region}`)
        return data;
    }

}

const countriesServices = new CountriesServices();
export default countriesServices