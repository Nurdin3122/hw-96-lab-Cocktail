import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../app/hooks";
import {saveUser} from "./UserThunks";

const LoginUser = () => {
    const [newSaveUser, setNewSaveUser] = useState({
        email:"",
        password:"",
    });
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewSaveUser((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }))
    };

    const onSend = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await dispatch(saveUser(newSaveUser))
            navigate('/');
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <>
            <h5 className="mt-5 text-center">Login into an account</h5>
            <div className="d-flex justify-content-center ">

                <form onSubmit={onSend}>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="text"
                               className="form-control"
                               name="email"
                               id="email"
                               onChange={onChange}
                               value={newSaveUser.email}
                               required
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="password">password:</label>
                        <input type="password"
                               className="form-control"
                               name="password"
                               id="password"
                               onChange={onChange}
                               value={newSaveUser.password}
                               required
                        />
                    </div>

                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-danger">Create</button>
                    </div>

                </form>
            </div>
        </>
    );
};

export default LoginUser;