import {User} from "../types/user.type";
import {ProductType} from "../types/product.type";
import {ObjectId} from "mongodb";

enum KEY {
    USER = "USER",
    _ID = "_ID",
    RECENTLY_PRODUCT = "RECENTLY_PRODUCT"
}

const saveId = (_id: ObjectId) => {
    sessionStorage.setItem(KEY._ID, JSON.stringify(_id))
}

const removeId = () => {
    sessionStorage.removeItem(KEY._ID)
}

const getId = (): ObjectId | undefined => {
    const data = sessionStorage.getItem(KEY._ID);
    if (!data) return undefined;
    return JSON.parse(data);
}

const saveUser = (user: User) => {
    sessionStorage.setItem(KEY.USER, JSON.stringify(user))
}

const removeUser = () => {
    sessionStorage.removeItem(KEY.USER)
}

const getUser = (): User | undefined => {
    const data = sessionStorage.getItem(KEY.USER)
    if (!data) return undefined;
    return JSON.parse(data) as User
}

const updateProfile = (user: User): void => {
    const oldUser = getUser();
    if (!oldUser) return;
    oldUser.birthday = user.birthday
    oldUser.email = user.email
    oldUser.fullName = user.fullName
    oldUser.phone = user.phone
    oldUser.gender = user.gender
    saveUser(oldUser);
}

const getRecentlyProduct = (): ProductType[] => {
    const data = sessionStorage.getItem(KEY.RECENTLY_PRODUCT);
    return data ? JSON.parse(data) as ProductType[] : [];
}

const pushRecentlyProduct = (product: ProductType) => {
    let recentlyProductList: ProductType[] = getRecentlyProduct();

    if (recentlyProductList.filter(productFilter => productFilter._id === product._id).length) return;

    recentlyProductList.push(product);
    sessionStorage.setItem(KEY.RECENTLY_PRODUCT, JSON.stringify(recentlyProductList))
}

export {
    saveUser,
    saveId,
    removeUser,
    removeId,
    getUser,
    getId,
    getRecentlyProduct,
    pushRecentlyProduct,
    updateProfile
}
