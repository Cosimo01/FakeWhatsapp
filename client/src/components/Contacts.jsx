import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/chat_new.css';
import Searchbar from './Searchbar';
const apiUrl = process.env.REACT_APP_API_URL;



export default function Contacts({ onContactClick, selectedContact, onLoadCompleteContacts, onNotAuthorized }) {
    const [contacts, setContacts] = useState([]);
    const { UserName } = useParams();

    useEffect(() => {
        const handleContacts = async () => {
            try {
                console.log("UserName: ", UserName)

                const response = await fetch(`${apiUrl}/contacts/${UserName}`, {
                    method: 'POST',
                    credentials: 'include',
                    mode: 'cors',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    }
                })

                if (response.ok) {
                    const result = await response.json()
                    setContacts(result.friendships);
                    console.log(result);
                    onLoadCompleteContacts()
                } else {
                    const errorResponse = await response.json()
                    throw new Error(`${errorResponse.message}`);
                }
            } catch (error) {
                console.error("Errore: ", error.message)
                onNotAuthorized();
            }
        }
        handleContacts();
    }, []);

    return (
        <div className="contacts-list">
            <h2>Contatti</h2>
            <Searchbar />
            <ul>
                {contacts.map((contact) => (
                    <li
                        key={contact._id}
                        onClick={() => onContactClick(true, contact._id)}
                        className={selectedContact.contactID === contact._id ? 'active' : ''} >
                        {contact.UserName}
                    </li>
                )
                )}
            </ul>
        </div>
    )
}
