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
    
    findByEmail(path:string,email:string):UserJson | undefined{
        const jsonService = new JsonService();
        const data = jsonService.readJson(path);
        return data.find(d => d.email === email);
    }

    getData():UserJson[] {
        const jsonService = JsonService.getInstance();
        return jsonService.readJson(UserService.userPath);
    }
}