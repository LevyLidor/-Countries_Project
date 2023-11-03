import React, { useEffect, useState } from 'react';
import Card from '../CountryCard/Card';
import CountryModel from '../../models/CountryModel';
import Header from '../Header/Header';
import countriesServices from '../../services/countriesServices';
import config from '../../utils/config';
import './Countries.css';
import '../Header/Header.css';


const Countries = () => {

    const [currentPage, setCurrentPage] = useState<number>(1); // מספר העמוד הנוכחי
    const [totalPages, setTotalPages] = useState<number>(1); // מספר עמודים כולל
    const [allCountries, setAllCountries] = useState<CountryModel[]>([]); // רשימת כל הארצות
    const [filteredCountries, setFilteredCountries] = useState<CountryModel[]>([]); // רשימת הארצות המסוננות לפי החיפוש
    const [searchT, setSearchT] = useState<string>(""); // הערך של השורת חיפוש

    async function getAllCountries() {
        try {
            await countriesServices.getAllCountries().then((res) => {
                const sortedCountries = res.sort((a: CountryModel, b: CountryModel) =>
                    a.name.common.localeCompare(b.name.common));

                setAllCountries(sortedCountries);
                setFilteredCountries(sortedCountries);

                const totalCountries = sortedCountries.length;
                const totalPages = Math.ceil(totalCountries / config.perPage);
                setTotalPages(totalPages);
            })
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    async function searchByRegion(event: React.ChangeEvent<HTMLSelectElement>) {
        try {
            setSearchT("");
            setCurrentPage(1);

            if (event.target.value === "All") getAllCountries();
            else {
                await countriesServices.getCountriesByRegion(event.target.value).then((res) => {
                    const sortedCountries = res.sort((a: CountryModel, b: CountryModel) =>
                        a.name.common.localeCompare(b.name.common));

                    setAllCountries(sortedCountries);
                    setFilteredCountries(sortedCountries);

                    const totalCountries = sortedCountries.length;
                    const totalPages = Math.ceil(totalCountries / config.perPage);
                    setTotalPages(totalPages);
                })
            }

            const inputElement = document.getElementById('searchInput') as HTMLInputElement;
            inputElement?.focus();

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }


    useEffect(() => {
        getAllCountries();
    }, []);


    function search(event: React.ChangeEvent<HTMLInputElement>) {
        setCurrentPage(1);

        const searchTerm = event.target.value.toLowerCase();
        setSearchT(searchTerm);

        const filtered = allCountries.filter((country) =>
            country.name.common.toLowerCase().includes(searchTerm));
        const totalCountries = filtered.length;
        const totalPages = Math.ceil(totalCountries / config.perPage);

        setTotalPages(totalPages);
        setFilteredCountries(filtered);
    }


    return (
        <>

            <Header onInputSearch={search}
                valueSearch={searchT}
                onSearchByRegion={searchByRegion} />


            <div className='countries'>
                {filteredCountries.slice((currentPage - 1) * config.perPage, currentPage * config.perPage).map((country, index) => (
                    <Card key={index}
                        name={country.name}
                        flags={country.flags}
                        capital={country.capital}
                        region={country.region}
                        subregion={country.subregion}
                        maps={country.maps}
                        currencies={country.currencies}
                        startOfWeek={country.startOfWeek}
                        timezones={country.timezones}
                        population={country.population}
                    />
                ))}
            </div>


            <div className="pagination">
                <span className="page-info">Page <strong>{currentPage}</strong> of {totalPages ? totalPages : 1}</span>

                <button className="page-button"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}> Previous
                </button>

                <button className="page-button"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages || totalPages === 0}> Next
                </button>

            </div>
        </>
    );
}

export default Countries;
