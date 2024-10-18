import './App.css'
import {Route, Routes} from "react-router-dom";
import Body from "./Container/Body";
import Header from "./Container/Header/Header";
import CreateUser from "./Components/User/CreateUser";
import LoginUser from "./Components/User/LoginUser";

const App = () => (
    <>
        <header>
            <Header/>
        </header>
        <main>
            <Routes>
                <Route path="/" element={<Body/>}/>
                <Route path="/create-user" element={<CreateUser/>}/>
                <Route path="/login-user" element={<LoginUser/>}/>
            </Routes>
        </main>
    </>
);

export default App
