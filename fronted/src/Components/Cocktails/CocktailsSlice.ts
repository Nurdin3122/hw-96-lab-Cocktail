import { Cocktail } from "../../Types";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {createCocktail, getAllCocktails} from "./CocktailsThunks";

export interface cocktailState {
    cocktails:Cocktail[]
    loading:boolean;
    registerError:boolean
}


export const initialState:cocktailState = {
    cocktails:[],
    loading:false,
    registerError:false,
}

export const CocktailSlice = createSlice<cocktailState>({
    name:"cocktail",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(createCocktail.pending,(state) => {
            state.loading = true;
            state.registerError = false;
        });
        builder.addCase(createCocktail.fulfilled,(state) => {
            state.loading = false;
        });
        builder.addCase(createCocktail.rejected,(state) => {
            state.loading = false;
            state.registerError = true;
        });

        builder.addCase(getAllCocktails.pending,(state) => {
            state.loading = true;
            state.registerError = false;
        });
        builder.addCase(getAllCocktails.fulfilled,(state,{payload:cocktails}) => {
            state.loading = false;
            state.cocktails = cocktails;
        });
        builder.addCase(getAllCocktails.rejected,(state) => {
            state.loading = false;
            state.registerError = true;
        });
    }
});

export const CocktailReducer = CocktailSlice.reducer;
export const cocktailState = (state: RootState) => state.cocktail.cocktails;
export const cocktailLoading = (state: RootState) => state.cocktail.loading;