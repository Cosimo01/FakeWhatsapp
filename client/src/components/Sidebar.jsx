import React from 'react';
import Button from './Button';
import '../css/sidebar.css';


export default function Sidebar() {

    document.addEventListener("DOMContentLoaded", function () {
        const sidebar = document.getElementById("sidebar");
        const sidebarToggle = document.getElementById("sidebarToggle");

        sidebarToggle.addEventListener("click", function () {
            sidebar.classNameList.toggle("active");
        });
    });

    return (
        <div className='container-sidebar'>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <button className="navbar-toggler" type="button" id="sidebarToggle">
                    <span className="navbar-toggler-icon"></span>
                </button>
            </nav>

            <div className="container-fluid">
                <div className="row">
                    <nav id="sidebar" className="col-md-3 col-lg-2 d-md-block bg-light sidebar">
                        <div className="position-sticky">
                            <ul className="nav flex-column">
                                <li className="nav-item">
                                    <a className="nav-link active" href="#">
                                        Menu 1
                                    </a>
                                    <ul className="submenu">
                                        <li className="nav-item">
                                            <a className="nav-link" href="#">Elemento 1</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#">Elemento 2</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#">Elemento 3</a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">
                                        Menu 2
                                    </a>
                                    <ul className="submenu">
                                        <li className="nav-item">
                                            <a className="nav-link" href="#">Elemento 4</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#">Elemento 5</a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>

            <script src="https://cdn.jsdelivr.net/npm/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
            <script src="script.js"></script>
        </div>
    );
}