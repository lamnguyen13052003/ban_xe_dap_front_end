import {ObjectId} from "mongodb";

export type UserResponseType = {
    _id : ObjectId,
    fullName: string,
    urlAvatar: string,
    username: string,
}
