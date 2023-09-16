import React from 'react';
import '../css/home.css';
import NotProgrammed from '../components/NotProgrammed';

export default function Help() {
    console.log(localStorage.getItem('accessToken'));

    return (
        <div>
            <NotProgrammed />
        </div>
    );
}