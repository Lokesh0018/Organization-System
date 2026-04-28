import { UserJson } from "../types/Types";
import JsonService from "./JsonService";

export default class UserService {
    private static userService:UserService;
    private static userPath:string = "D:/organization-system/src/data/users.json";

    static getInstance():UserService {
        if(!this.userService)
            this.userService = new UserService;
        return this.userService;
    }

    static getPath():string{
        return this.userPath;
    }

    findById(id:string,data:UserJson[]):UserJson | undefined {
        return data.find(d => d.id === id);
    }
    
    findByEmail(email:string,data:UserJson[]):UserJson | undefined{
        return data.find(d => d.email === email);
    }

    getIndex(id:string):number {
        return parseInt(id)-1;
    }

    getData():UserJson[] {
        const jsonService = JsonService.getInstance();
        return jsonService.readJson(UserService.userPath) as UserJson[];
    }
}