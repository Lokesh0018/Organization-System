import User from "../models/User";

export default interface LoginInterface {
    verifyLogin(email:string,password:string):User | null;
}