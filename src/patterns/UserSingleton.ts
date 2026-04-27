import User from "../models/User";
import { Roles } from "../types/Types";

export default class UserSingleton {
    private static curUser:Roles | null;

    static setUser(user:Roles | null):void {
        this.curUser = user;
    }

    static getUser():Roles | null{
        return this.curUser;
    }
}