import {RootState} from "../../app/store";
import {createSlice} from "@reduxjs/toolkit";
import {User} from "../../Types";
import {createUser, saveUser} from "./UserThunks";

export interface userState {
    user:User | null
    loading:boolean;
    registerError:boolean
}


export const initialState:userState = {
    user:null,
    loading:false,
    registerError:false,
}

export const UserSlice = createSlice<userState>({
    name:"user",
    initialState,
    reducers: {
        unsetUser: (state) => {
            state.user = null;
        }
    },
    extraReducers:(builder) => {
        builder.addCase(createUser.pending,(state) => {
            state.loading = true;
            state.registerError = false;
        });
        builder.addCase(createUser.fulfilled,(state,{payload:user}) => {
            state.loading = false;
            state.user = user;
        });
        builder.addCase(createUser.rejected,(state) => {
            state.loading = false;
            state.registerError = true;
        });



        builder.addCase(saveUser.pending,(state) => {
            state.loading = true;
            state.registerError = false;
        });
        builder.addCase(saveUser.fulfilled,(state,{payload: user}) => {
            state.loading = false;
            state.user = user;
        });
        builder.addCase(saveUser.rejected,(state) => {
            state.loading = false;
            state.registerError = true;
        });

    }
});

export const {unsetUser} = UserSlice.actions;
export const UserReducer = UserSlice.reducer;
export const userState = (state: RootState) => state.user.user;