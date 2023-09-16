import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '../components/Footer';
const apiUrl = process.env.REACT_APP_API_URL;

export default class Signup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Username: "",
            FirstName: "",
            LastName: "",
            Email: "",
            Password: "",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    async handleSubmit(e) {
        e.preventDefault();
        const { Username, FirstName, LastName, Email, Password } = this.state;
        console.log(Username, FirstName, LastName, Email, Password);

        const response = await fetch(`${apiUrl}/sign-up`, {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                Username,
                FirstName,
                LastName,
                Email,
                Password
            }),
        })
        const result = await response.json();
        console.log(result);
    }
    render() {
        return (
            <div className="main-content">
                <div className="title-container">
                    <h1 className="title">
                        <span>F</span><span>a</span><span>k</span><span>e</span><span>W</span><span>h</span><span>a</span><span>t</span><span>s</span><span>a</span><span>p</span><span>p</span>
                    </h1>
                </div>
                <div className='container d-flex justify-content-center align-items-center vh-100' >
                    <div className="card p-5" style={{ maxWidth: '600px' }}>
                        <form onSubmit={this.handleSubmit} id="loginForm">
                            <h3><center>Registrazione</center></h3>
                            <div className='mb-3'>
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Nome'
                                    onChange={(e) => this.setState({ FirstName: e.target.value })}
                                />
                            </div>
                            <div className='mb-3'>
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Cognome'
                                    onChange={(e) => this.setState({ LastName: e.target.value })}
                                />
                            </div>
                            <div className='mb-3'>
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Username'
                                    onChange={(e) => this.setState({ Username: e.target.value })}
                                />
                            </div>
                            <div className='mb-3'>
                                <input
                                    type='email'
                                    className='form-control'
                                    placeholder='Email'
                                    onChange={(e) => this.setState({ Email: e.target.value })}
                                />
                            </div>
                            <div className='mb-3'>
                                <input
                                    type='password'
                                    className='form-control'
                                    placeholder='Password'
                                    onChange={(e) => this.setState({ Password: e.target.value })}
                                />
                            </div>

                            <div className='d-grid'>
                                <button type='submit' className='btn btn-primary' >Sign Up</button>
                            </div>
                            <p className='forgot-password text-right'>
                                Già registrato? <a href="/sign-in">Login</a>
                            </p>
                        </form>
                    </div>
                    <Footer />
                </div>
            </div>
        );
    }
}