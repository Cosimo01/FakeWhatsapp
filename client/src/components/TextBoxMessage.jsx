import React, { useState } from 'react';
import '../css/ChatInput.css';
import { useParams } from 'react-router-dom';
const apiUrl = process.env.REACT_APP_API_URL;

export default function TextBoxMessage({ setMessages, contactID, socket }) {
    const { UserName } = useParams();
    const [message, setMessage] = useState("");

    const handleSendMessage = async () => {
        try {
            const response = await fetch(`${apiUrl}/messages/${UserName}/send`, {
                method: 'POST',
                credentials: 'include',
                mode: 'cors',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify({ message, contactID }),
            })

            if (response.ok) {
                const result = await response.json();
                await socket.emit('send_message', { contactID, message });
                /* setMessages((prevMessages) => [...prevMessages, message]); */
                //console.log(result);

            } else {
                console.log("Non ho salvato un cazzo");
            }




            setMessage('');
        } catch (error) {
            console.log("Errore: ", error.message);
        }
    }


    /*     const handleSendMessage = async () => {
            try {
                console.log(contactID)
                const response = await fetch(`${apiUrl}/messages/${UserName}/send`, {
                    method: 'POST',
                    credentials: 'include',
                    mode: 'cors',
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    },
                    body: JSON.stringify({ message, contactID }),
                })
    
                if (response.ok) {
                    const result = await response.json();
                    console.log(result);
                }
    
    
    
            } catch (err) {
                console.log("Errore: ", err.message);
            }
    
        } */


    return (
        <div className="chat-input-container">
            <input
                className="chat-input"
                type="text"
                placeholder="Scrivi un messaggio..."
                value={message}
                onChange={(e) => { setMessage(e.target.value) }}
            />
            <button
                className="send-button"
                onClick={handleSendMessage}
            >
                Invia
            </button>
        </div>
    );
}
