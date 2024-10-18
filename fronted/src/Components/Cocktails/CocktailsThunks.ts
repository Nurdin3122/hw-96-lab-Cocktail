import {createAsyncThunk} from "@reduxjs/toolkit";
import {Cocktail, CocktailMutation} from "../../Types";
import axiosApi from "../../AxiosApi/axiosApi";

export const createCocktail = createAsyncThunk<void,CocktailMutation>(
    "cocktail/createCocktail",
    async (newCocktail) => {
        const user = localStorage.getItem('persist:cocktail-app:user');
        const UserJsonParse = JSON.parse(user);
        const token = JSON.parse(UserJsonParse.user)

        const formData = new FormData();
        const keys = Object.keys(newCocktail) as (keyof CocktailMutation)[];

        keys.forEach(key => {
            const value = newCocktail[key];

            if (key === 'ingredient' && Array.isArray(value)) {
                formData.append('ingredient', JSON.stringify(value));
            } else if (value !== null) {
                formData.append(key, value);
            }
        });


        const response = await axiosApi.post<CocktailMutation>('/cocktails', formData,{
            headers: {
                Authorization: `Bearer ${token.token}`
            }
       });
       return response.data;
    }
);

export const getAllCocktails = createAsyncThunk<Cocktail[]>(
    "cocktails/getAllCocktails",
    async () => {
        const response = await axiosApi.get('/cocktails');
        return response.data
    }
)