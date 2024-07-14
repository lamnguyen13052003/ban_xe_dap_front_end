import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AuthState} from "../states/auth.state";
import {User} from "../types/user.type";
import {
    getUser,
    getId,
    removeUser,
    removeId,
    saveUser,
    saveId as saveIdSessionStorage,
    updateProfile as saveProfile,
} from "../utils/sessionStorage";
import {ObjectId} from "mongodb";

const loadAuthState = () => {
    const auth: AuthState = {};
    auth.user = getUser()
    auth._id = getId()
    return auth
}

const initial: AuthState = loadAuthState();

const authSlice = createSlice({
    name: 'auth slice',
    initialState: initial,
    reducers: {
        login: (state, action: PayloadAction<User>) => {
            saveUser(action.payload)
            state.user = action.payload
        },
        saveId: (state, action: PayloadAction<ObjectId>) => {
            saveIdSessionStorage(action.payload)
            state._id = action.payload
        },
        logout: (state, action: PayloadAction<void>) => {
            removeUser()
            state.user = undefined
        },
        verifySuccess: (state, action: PayloadAction<void>) => {
            removeId()
            state._id = undefined
        },
        updateProfile: (state, action: PayloadAction<User>) => {
            const user = action.payload;
            state.user = {
                ...state.user,
                fullName: user.fullName,
                phone: user.phone,
                birthday: user.birthday,
                gender: user.gender,
                email: user.email
            }
            saveProfile(user)
        },
    }
});

export const {login, logout, saveId, verifySuccess, updateProfile} = authSlice.actions;
export const authReducer = authSlice.reducer