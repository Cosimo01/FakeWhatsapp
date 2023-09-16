import io from 'socket.io-client';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/chat_new.css';
import Contacts from '../components/Contacts';
import Messages from '../components/Messages';
import TextBoxMessage from '../components/TextBoxMessage';

/*** RIFERIMENTI ALLE VARIABILI D'AMBIENTE ***/
const apiUrl = process.env.REACT_APP_API_URL;
/*** FINE ***/



export default function Chat() {
    const socket = io.connect(`${apiUrl}`);
    const [pageloading, setPageLoading] = useState(true);

    const [contactsLoading, setContactsLoading] = useState(true);
    const [messages, setMessages] = useState([]);

    const [selectedContact, setSelectedContact] = useState({ isSelected: false, contactID: null });
    const navigate = useNavigate();


    const handleLoadCompletePage = () => {
        setPageLoading(false);
    }

    const handleNotAuthorized = () => {
        navigate('/sign-in');
    }

    const handleLoadCompleteContacts = () => {
        setContactsLoading(false);
    }

    const handleContactClick = (isSelected, contactID) => {
        setSelectedContact({ isSelected: isSelected, contactID: contactID });
    }

    // Ora puoi visualizzare il JSON a schermo
    return (
        <div>
            <div className="home-page">
                <div className='main-content-chatbox'>
                    <Contacts
                        onContactClick={handleContactClick}
                        selectedContact={selectedContact}
                        onLoadCompleteContacts={handleLoadCompleteContacts}
                        onNotAuthorized={handleNotAuthorized}
                    />

                    <div className="chat-box">
                        {contactsLoading ? null : (
                            selectedContact.isSelected ? (
                                <div className="active-chat">
                                    {<Messages contactID={selectedContact.contactID} socket={socket} />}
                                    {/* {selectedContact.contactID} */}
                                    <TextBoxMessage setMessages={setMessages} contactID={selectedContact.contactID} socket={socket} />
                                </div>
                            ) : (
                                <div className="no-chat-selected">
                                    <p>Seleziona un contatto per iniziare la chat</p>
                                </div>
                            )
                        )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
