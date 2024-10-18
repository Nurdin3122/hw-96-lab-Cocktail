import './App.css'
import {Route, Routes} from "react-router-dom";
import Body from "./Container/Body";
import Header from "./Container/Header/Header";
import CreateUser from "./Components/User/CreateUser";
import LoginUser from "./Components/User/LoginUser";
import CreateCocktails from "./Components/Cocktails/CreateCocktails";

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
                <Route path="/create-cocktail" element={<CreateCocktails/>}/>
            </Routes>
        </main>
    </>
);

export default App
