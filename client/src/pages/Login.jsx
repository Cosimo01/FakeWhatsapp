import React, { useState } from 'react';
import '../css/login.css';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
const apiUrl = process.env.REACT_APP_API_URL;

function LoginForm() {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(`Utente: ${user} | Password: ${password}`);

            const response = await fetch(`${apiUrl}/sign-in`, {
                method: 'POST',
                credentials: 'include',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user, password })
            })


            if (response.ok) {
                const result = await response.json();

                const accessToken = result.accessToken;
                localStorage.setItem('accessToken', accessToken);
                navigate(`/chat/${result.UserName}`);
            } else {
                console.log('Errore durante la richiesta');
            }
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    }

    /*     const [errorMessage, setMessage] = useState({});
        const[isSubmitted, setIsSubmitted] = useState(false); */




    return (
        <div className="main-content">
            <div className="title-container">
                <h1 className="title">
                    <span>F</span><span>a</span><span>k</span><span>e</span><span>W</span><span>h</span><span>a</span><span>t</span><span>s</span><span>a</span><span>p</span><span>p</span>
                </h1>
            </div>
            <div className="container d-flex justify-content-center align-items-center vh-100">
                <div className="card p-5" style={{ maxWidth: '600px' }}>
                    <h2 className="text-center">Login</h2>
                    <form id="loginForm">
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Email
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="user"
                                value={user}
                                onChange={(e) => setUser(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label" >
                                Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100" onClick={handleSubmit}>
                            Login
                        </button>
                        <div class="register-btn-container">
                            <span className="label-btn-register">Non hai un account? </span><a className="btn btn-secondary w-80 btn-registrati" href='/sign-up'>Registrati</a>
                        </div>
                    </form>
                </div>
                <Footer />
            </div>

        </div>
    );
}


export default LoginForm;