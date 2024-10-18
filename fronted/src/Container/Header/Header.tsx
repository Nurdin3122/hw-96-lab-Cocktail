import React from "react";
import { useAppSelector } from "../../app/hooks";
import { userState } from "../../Components/User/UserSlice";
import HeaderForLogin from "./HeaderForLogin";
import HeaderForAnon from "./HeaderForAnon";


const Header = () => {
    const user = useAppSelector(userState)
    return (
        <div>
            {
                user ? (
                    <HeaderForLogin/>
                ) : (
                    <HeaderForAnon/>
                )
            }
        </div>
    );
};

export default Header;