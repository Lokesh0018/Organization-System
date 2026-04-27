import EmployeeInterface from "../interfaces/EmployeeInterface";
import User from "../models/User";
import ProjectService from "../services/ProjectService";
import TaskService from "../services/TaskService";

export default class Employee extends User implements EmployeeInterface {
    constructor(id: string, name: string, email: string, password: string) {
        super(id, name, email, password, "EMPLOYEE");
    }

    viewProject(): void {
        ProjectService.getInstance().viewProject();
    }

    updateTask(curUser: User): void {
        TaskService.getInstance().updateTask(curUser);
    }

    viewOwnTasks(curUser: User): void {
        TaskService.getInstance().viewOwnTasks(curUser);
    }

    trackProjectProgress(): void {
        ProjectService.getInstance().trackProjectProgress();
    }
}