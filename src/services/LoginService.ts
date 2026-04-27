import User from "../models/User";
import UserFactory from "../patterns/UserFactory";
import { Roles } from "../types/Types";
import UserService from "./UserService";

export default class LoginService {
    private static loginService:LoginService;

    static getInstance():LoginService{
        if(!this.loginService)
            this.loginService = new LoginService();
        return this.loginService;
    }

    verifyLogin(email:string,password:string):Roles | null {
        const userService = UserService.getInstance();
        const userData = userService.getData();
        const user = userService.findByEmail(email,userData);
        if(!user){
            console.log("\nInvalid User\n");
            return null;
        }
        if(user && user.password !== password){
            console.log("\nInvalid Password\n");
            return null;
        }
        console.log(`\n${user.name} Logged in Successfully as ${user.role}\n`);
        const u = new User(user.id,user.name,user.email,user.password,user.role);
        return UserFactory.createUser(u);
    }

}