import HRInterface from "../interfaces/HRInterface";
import User from "../models/User";
import EmployeeService from "../services/EmployeeService";

export default class HR extends User implements HRInterface {
    constructor(id: string, name: string, email: string, password: string) {
        super(id, name, email, password, "HR");
    }

    createEmployee(): void { 
        EmployeeService.getInstance().createEmployee(); 
    }

    viewEmployees(): void { 
        EmployeeService.getInstance().viewEmployees(); 
    }
    
    updateEmployee(): void { 
        EmployeeService.getInstance().updateEmployee(); 
    }
}