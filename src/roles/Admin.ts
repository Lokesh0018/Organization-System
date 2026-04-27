import User from "../models/User";
import EmployeeService from "../services/EmployeeService";
import ProjectService from "../services/ProjectService";
import FinanceService from "../services/FinanceService";
import TaskService from "../services/TaskService";
import EmployeeInterface from "../interfaces/EmployeeInterface";
import ProjectInterface from "../interfaces/PMInterface";
import FinanceInterface from "../interfaces/FinanceInterface";
import TaskInterface from "../interfaces/TaskInterface";

export default class Admin extends User implements EmployeeInterface, ProjectInterface, FinanceInterface, TaskInterface {
    constructor(id:string,name:string,email:string,password:string) {
        super(id,name,email,password,"ADMIN");
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

    deleteEmployee(): void { 
        EmployeeService.getInstance().deleteEmployee(); 
    }

    assignRole(): void { 
        EmployeeService.getInstance().assignRole(); 
    }

    createProject(): void { 
        ProjectService.getInstance().createProject(); 
    }

    assignProject(): void { 
        ProjectService.getInstance().assignProject(); 
    }

    viewProject(): void { 
        ProjectService.getInstance().viewProject();
    }

    assignClient(): void { 
        ProjectService.getInstance().assignClient();
    }

    trackProjectProgress(): void { 
        ProjectService.getInstance().trackProjectProgress(); 
    }

    createTask(): void { 
        TaskService.getInstance().createTask(); 
    }

    updateTask(user: User): void { 
        TaskService.getInstance().updateTask(user);
    }

    viewOwnTasks(user: User): void { 
        TaskService.getInstance().viewOwnTasks(user); 
    }

    manageSalary(): void { 
        FinanceService.getInstance().manageSalary(); 
    }

    manageInsurance(): void { 
        FinanceService.getInstance().manageInsurance(); 
    }
}