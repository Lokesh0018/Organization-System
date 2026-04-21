import LoginInterface from "../interfaces/LoginInterface";
import User from "../models/User";

export default class LoginService implements LoginInterface {
    verifyLogin(email: string, password: string): User | null {
        
    }
}