import { UserJson } from "../types/Types";
import JsonService from "./JsonService";

export default class LoginService {
    static jsonService = new JsonService();

    static verifyLogin(email:string,password:string):UserJson | null {
        const data: UserJson[] = this.jsonService.readJson("D:/organization-system/src/data/users.json");
        const user = data.find(u => u.email === email);
        if(!user){
            console.log("\nInvalid User\n");
            return null;
        }
        if(user && user.password !== password){
            console.log("\nInvalid Password\n");
            return null;
        }
        console.log(`\n${user.name} Logged in Successfully as ${user.role}\n`);
        return user;
    }

}