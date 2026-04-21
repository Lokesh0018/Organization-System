import User from "../models/User";

class Admin extends User {
    constructor(id:string,name:string,email:string,password:string) {
        super(id,name,email,password,"ADMIN");
    }
}