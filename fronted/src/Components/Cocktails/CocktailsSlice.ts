import { Cocktail } from "../../Types";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {
    createCocktail,
    deleteCocktail,
    getAllCocktails,
    getOneCocktail,
    getPublishedCocktails, isPublishedCocktail
} from "./CocktailsThunks";

export interface cocktailState {
    cocktails:Cocktail[];
    cocktail:Cocktail | null;
    publishedCocktails:Cocktail[];
    loadingOneCocktail:boolean;
    loading:boolean;
    registerError:boolean;
    deleteLoading:boolean;
    cocktailPublishedLoading:boolean;
}


export const initialState:cocktailState = {
    cocktails:[],
    cocktail:null,
    publishedCocktails:[],
    loading:false,
    loadingOneCocktail:false,
    registerError:false,
    deleteLoading:false,
    cocktailPublishedLoading:false,
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



        builder.addCase(getPublishedCocktails.pending,(state) => {
            state.loading = true;
            state.registerError = false;
        });
        builder.addCase(getPublishedCocktails.fulfilled,(state,{payload:cocktails}) => {
            state.loading = false;
            state.publishedCocktails = cocktails;
        });
        builder.addCase(getPublishedCocktails.rejected,(state) => {
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

        });
        builder.addCase(getOneCocktail.rejected,(state) => {
            state.loadingOneCocktail = false;
            state.registerError = true;
        });


        builder.addCase(deleteCocktail.pending,(state) => {
            state.deleteLoading = true;
            state.registerError = false;
        });
        builder.addCase(deleteCocktail.fulfilled,(state) => {
            state.deleteLoading = false;
        });
        builder.addCase(deleteCocktail.rejected,(state) => {
            state.deleteLoading = false;
            state.registerError = true;
        });


        builder.addCase(isPublishedCocktail.pending,(state) => {
            state.cocktailPublishedLoading = true;
            state.registerError = false;
        });
        builder.addCase(isPublishedCocktail.fulfilled,(state) => {
            state.cocktailPublishedLoading = false;
        });
        builder.addCase(isPublishedCocktail.rejected,(state) => {
            state.cocktailPublishedLoading = false;
            state.registerError = true;
        });


    }
});

export const CocktailReducer = CocktailSlice.reducer;
export const cocktailState = (state: RootState) => state.cocktail.cocktails;
export const oneCocktailState = (state: RootState) => state.cocktail.cocktail;
export const isPublishedCocktails = (state: RootState) => state.cocktail.publishedCocktails;


export const cocktailLoading = (state: RootState) => state.cocktail.loading;
export const oneCocktailLoading = (state: RootState) => state.cocktail.loadingOneCocktail;
export const isPublishedCocktailLoading = (state: RootState) => state.cocktail.cocktailPublishedLoading;
export const deleteCocktailLoading = (state: RootState) => state.cocktail.deleteLoading;