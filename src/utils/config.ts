class AppConfig {
    API_URL = 'https://restcountries.com/v3.1/';
    perPage = 20; // מספר התוצאות לכל עמוד 

    // * USER ROUTES * //
    All_Countries_ROUTE = this.API_URL + 'all';
    Search_By_Region_ROUTE = this.API_URL + 'region/'; // Need search region value 
    /////////////////////////////////////////

}

const config = new AppConfig();
export default config;