import {User} from "../types/user.type";
import {ObjectId} from "mongodb";

export  type AuthState = {
    user?: User,
    _id?: ObjectId
}