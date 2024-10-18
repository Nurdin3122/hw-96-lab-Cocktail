import { Cocktail } from "../../Types";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {createCocktail, getAllCocktails, getOneCocktail} from "./CocktailsThunks";

export interface cocktailState {
    cocktails:Cocktail[];
    cocktail:Cocktail | null;
    loadingOneCocktail:boolean;
    loading:boolean;
    registerError:boolean
}


export const initialState:cocktailState = {
    cocktails:[],
    cocktail:null,
    loading:false,
    loadingOneCocktail:false,
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

        builder.addCase(getOneCocktail.pending,(state) => {
            state.loadingOneCocktail = true;
            state.registerError = false;
        });
        builder.addCase(getOneCocktail.fulfilled,(state,{payload:cocktail}) => {
            state.loadingOneCocktail = false;
            state.cocktail = cocktail;

        });builder.addCase(getOneCocktail.rejected,(state) => {
            state.loadingOneCocktail = false;
            state.registerError = true;
        });
    }
});

export const CocktailReducer = CocktailSlice.reducer;
export const cocktailState = (state: RootState) => state.cocktail.cocktails;
export const oneCocktailState = (state: RootState) => state.cocktail.cocktail;

export const cocktailLoading = (state: RootState) => state.cocktail.loading;
export const oneCocktailLoading = (state: RootState) => state.cocktail.loadingOneCocktail;