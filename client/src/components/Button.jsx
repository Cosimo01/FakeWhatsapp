import React from 'react'
import {Link} from 'react-router-dom';
import '../css/button.css';

export default function Button({url, description}) {
    return (
        <li id="listElement"><Link to={url} />{description}</li>
    );
}