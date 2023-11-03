import React from 'react';
import { Form } from 'react-bootstrap';
import HeaderProps from '../../models/HeaderPropsModel';
import './Header.css';

const Header = (props: HeaderProps) => {
    return (
        <div className='sticky-top'>
            <h2 className='text-center title'><b>Countries Info</b></h2>
            <Form className="sticky-top header">
                <Form.Control
                    id='searchInput'
                    type="search"
                    placeholder="Search Countries"
                    className="inputSearch"
                    aria-label="Search"
                    onChange={props.onInputSearch}
                    value={props.valueSearch}
                />

                <Form.Select onChange={props.onSearchByRegion} className='selectInput'>
                    <option value="All">All Region</option>
                    <option value="Africa">Africa</option>
                    <option value="America">America</option>
                    <option value="Antarctic">Antarctic</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europe</option>
                    <option value="Oceania">Oceania</option>
                </Form.Select>
            </Form>
        </div>
    )
}

export default Header;


