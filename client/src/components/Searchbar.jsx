import React from 'react';
import '../css/searchbar.css';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
const apiUrl = process.env.REACT_APP_API_URL;



export default function SearchBar() {
    const { UserName } = useParams();

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };


    const handleSearchSubmit = async (event) => {
        try {
            //console.log(UserName);
            event.preventDefault();
            console.log('Ricerca per:', searchTerm);

            const response = await fetch(`${apiUrl}/addFriend/${UserName}?friendRequestTo=${searchTerm}`, {
                method: 'GET',
                credentials: 'include',
                mode: 'cors',
                headers: {
                    'Content-Type': "application/json",
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            })

            if (response.ok) {
                const res = await response.json();
            } else {
                console.log("Errore durante la richiesta");
            }
        } catch (err) {
            console.log("Errore: ", err);
        }


    };

    return (
        <div className="search-bar-container">
            <form onSubmit={handleSearchSubmit} className='search-bar-form'>
                <input
                    className='search-bar-input'
                    type="text"
                    placeholder="Cerca username..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <button type="submit" className='search-bar-button'>+</button>
            </form>
        </div>
    );
}