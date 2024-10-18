import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import {persistor, store} from "./app/store";
import {PersistGate} from "redux-persist/integration/react";

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <BrowserRouter>
                <StrictMode>
                    <App />
                </StrictMode>
            </BrowserRouter>
        </PersistGate>
    </Provider>
)
