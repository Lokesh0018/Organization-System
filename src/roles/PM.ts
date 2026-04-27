import User from "../models/User";
import ProjectService from "../services/ProjectService";
import TaskService from "../services/TaskService";
import EmployeeService from "../services/EmployeeService";
import PMInterface from "../interfaces/PMInterface";

export default class PM extends User implements PMInterface {
    constructor(id: string, name: string, email: string, password: string) {
        super(id, name, email, password, "PM");
    }

    viewEmployees(): void { 
        EmployeeService.getInstance().viewEmployees(); 
    }

    createProject(): void { 
        ProjectService.getInstance().createProject(); 
    }

    assignProject(): void { 
        ProjectService.getInstance().assignProject(); 
    }

    assignClient(): void { 
        ProjectService.getInstance().assignClient(); 
    }

    createTask(): void { 
        TaskService.getInstance().createTask(); 
    }
    
    viewProject(): void { 
        ProjectService.getInstance().viewProject(); 
    }

    updateTask(user: User): void { 
        TaskService.getInstance().updateTask(user); 
    }

    viewOwnTasks(user: User): void { 
        TaskService.getInstance().viewOwnTasks(user); 
    }

    trackProjectProgress(): void { 
        ProjectService.getInstance().trackProjectProgress(); 
    }

}