import ClientInterface from "../interfaces/ClientInterface";
import User from "../models/User";
import ProjectService from "../services/ProjectService";

export default class Client extends User implements ClientInterface {
    constructor(id: string, name: string, email: string, password: string) {
        super(id, name, email, password, "CLIENT");
    }

    viewProject(): void { 
        ProjectService.getInstance().viewProject(); 
    }

    trackProjectProgress(): void { 
        ProjectService.getInstance().trackProjectProgress(); 
    }
}
