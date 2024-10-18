import React from 'react';
import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {userState} from "../../Components/User/UserSlice";
import {logout} from "../../Components/User/UserThunks";
import logoForAnonUser from "../../assets/logoForAnnonUser.jpg";
import {apiURL} from "../../AxiosApi/baseUrl";

const HeaderForLogin = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(userState);

    const handleLogout = () => {
        dispatch(logout());
    };

    let cardImage = logoForAnonUser
    if (user.image) {
        cardImage = apiURL + "/" + user.image;
    }


    return (
        <div>
            <nav className="navbar bg-body-tertiary">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand mb-0 h1">Cocktail</Link>
                    <div className="d-flex align-items-center">
                        <p style={{margin: 0, padding: 0, display: "inline-block", verticalAlign: "middle"}}>
                            Hello: {user.displayName ? user.displayName : user.username}
                        </p>
                        <div className="ms-3">
                            <img style={{height: "50px", width: "50px"}} src={`${cardImage}`} alt={user.displayName}/>
                        </div>
                        <button className="btn btn-close-white" onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default HeaderForLogin;