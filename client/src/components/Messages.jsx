import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/chat_new.css';
const apiUrl = process.env.REACT_APP_API_URL;

export default function Messages({ contactID, socket }) {
    const [messages, setMessages] = useState([]);

    const { UserName } = useParams();
    const Navigate = useNavigate();

    const handleMessages = async () => {
        try {
            console.log("UserName: ", UserName)
            console.log("contactID: ", contactID)


            const response = await fetch(`${apiUrl}/messages/${UserName}`, {
                method: 'POST',
                credentials: 'include',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify({ contactID })
            })

            if (response.ok) {
                const result = await response.json()
                setMessages(result.Messages);
                console.log(result);
                return result.Messages;
            } else {
                const errorResponse = await response.json()
                errorResponse.status = response.status;
                throw errorResponse;
            }
        } catch (error) {
            if (error.status === 403) {
                Navigate('/sign-in')
            }
            console.error(`Error ${error.status}: ${error.message}`);
            setMessages([]);
        }
    }

    useEffect(() => {
        handleMessages();

    }, [contactID])

    useEffect(() => {
        socket.on('receive_message', async (message) => {
            await handleMessages();
        });

        return () => {
            socket.off('receive_message');
        };
    }, [socket]);

    useEffect(() => {

        console.log("Mo vedi che qua sta messages: ", messages)
    }, [messages])

    useEffect(() => {
        const chatBox = document.querySelector('.chat-box');
        if (chatBox) {
            chatBox.scrollTop = chatBox.scrollHeight;
        }

    }, [messages]);


    return (
        <div className='message_box'>
            {
                messages.length > 0 ? (
                    messages.map((message) => (
                        message._idMittente === contactID ? (
                            <div className='received-message' key={message._id}>{message.Descrizione}</div>
                        ) : (
                            <div className='sent-message' key={message._id}>{message.Descrizione}</div>
                        )
                    )
                    )
                ) : (<div className="no-chat-selected">Nessuna conversazione</div>)
            }
        </div>
    )
}

