import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        console.log('Email', email);
        console.log('Password', password);
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-5" style={{ maxWidth: '600px' }}>
                <h2 className="text-center">Login</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                    <button className="btn btn-primary w-100" onClick={handleLogin}>
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;