import React from 'react';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CountryModel from '../../models/CountryModel';
import './Card.css';


const Card = (props: CountryModel) => {
    const [show, setShow] = useState(false);
    const [currency, setCurrency] = useState<string[]>();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    function getCurrencies() {
        if (props.currencies) {
            const currenciesArray = Object.keys(props.currencies).map((currency) => {
                const coin = props.currencies[currency];
                return `${coin.name} (${coin.symbol})`;
            });
            setCurrency(currenciesArray); // עדכון המערך בפעם הראשונה שהפרופס משתנה
        }
    };


    useEffect(() => {
        getCurrencies();
    }, [props.currencies]);


    return (

        <div className='card' >
            <img src={props.flags.png} onClick={handleShow} className='imgCountry imgCountryCard'></img>
            <br />
            <Button variant="outline-dark" className='btnPropsName' onClick={handleShow}>
                {props.name.common}
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton className='flex-column'>
                    <Modal.Title>{props.name.common}</Modal.Title>
                    <img src={props.flags.png} className='imgCountry'></img>
                </Modal.Header>
                <Modal.Body>
                    <div className='moreDetails d-flex flex-column' >
                        <span>🌍 <b>Region:</b> {props.region}</span>
                        {props.subregion ? <span>📍 <b>Subregion:</b> {props.subregion}</span> : ""}
                        {props.capital ? <span>🏛️ <b>Capital:</b> {props.capital}</span> : ""}
                        <span>👨‍👩‍👧‍👦 <b>Population:</b> {props.population}</span>
                        <span className='time-zone'>🕒 <b>Time Zone:</b> {props.timezones.join(' / ')}</span>
                        <span>📅 <b>Start Of Week:</b> {props.startOfWeek}</span>
                        {props.currencies ? <span>🪙 <b>Currencies:</b> {currency?.join(' / ')}</span> : ""}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-danger" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="outline-dark" onClick={() => window.open(props.maps.googleMaps, '_blank')}>
                        🗺️ See on the map 🗺️
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Card




