import FinanceInterface from "../interfaces/FinanceInterface";
import User from "../models/User";
import FinanceService from "../services/FinanceService";

export default class Finance extends User implements FinanceInterface {
    constructor(id: string, name: string, email: string, password: string) {
        super(id, name, email, password, "FINANCE");
    }

    manageSalary(): void { 
        FinanceService.getInstance().manageSalary(); 
    }
    
    manageInsurance(): void { 
        FinanceService.getInstance().manageInsurance(); 
    }
}
