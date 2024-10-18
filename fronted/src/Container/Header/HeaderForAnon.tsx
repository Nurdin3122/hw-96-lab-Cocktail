import React from 'react';
import {Link} from "react-router-dom";

const HeaderForAnon = () => {
    return (
        <div>
            <nav className="navbar bg-body-tertiary">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand mb-0 h1">Cocktail</Link>
                    <div className="justify-content-end">
                        <Link to="/create-user" className="btn btn-dark me-2">Sign up</Link>
                        <Link to="/login-user" className="btn btn-dark me-5">Sign in</Link>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default HeaderForAnon;