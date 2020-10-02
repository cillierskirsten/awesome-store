import React from 'react';
import { Link } from 'react-router-dom';

function Navbar(props) {
    return (
        <nav className="navbar navbar-expand navbar-light bg-light">
            <ul className="nav navbar-nav">
                <li className="nav-item active">
                    <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/products">Products</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;