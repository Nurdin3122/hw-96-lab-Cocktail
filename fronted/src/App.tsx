import './App.css'
import {Route, Routes} from "react-router-dom";
import Body from "./Container/Body";
import Header from "./Container/Header/Header";
import CreateUser from "./Components/User/CreateUser";
import LoginUser from "./Components/User/LoginUser";
import CreateCocktails from "./Components/Cocktails/CreateCocktails";
import BlockCocktails from "./Components/Cocktails/BlockCocktails";
import React from "react";
import InfoOfCocktail from "./Components/Cocktails/InfoOfCocktail";

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
                <Route path="/all-cocktails" element={ <BlockCocktails/>}/>
                <Route path="/info-cocktail/:id" element={<InfoOfCocktail/>}/>
            </Routes>
        </main>
    </>
);

export default App
