import Project from "../models/Project";
import Task from "../models/Task";
import User from "../models/User";
import { TaskStatus, UserRole } from "../types/Types";

export default interface UserInterface {

    createEmployee(user:User):void;
    viewEmployee(userId:number):User;
    updateEmployee(userId:number,user:User):void;
    deleteEmployee(userId:number):void;
    assignRoles(userId:number,role:UserRole):void;

    createProject(project:Project):void;
    assignProjectToEmployee(projectId:string,employeeId:string):void;
    viewProject(projectId:string):Project;
    assignClients(clientId:string,employeeId:string):void;

    createTasks(task:Task):void;
    updateTasks(taskId:string,taskStatus:TaskStatus):void;
    viewOwnTasks(employeeId:string):Task[];
    trackProjectProgress(projectId:string):Task[];

    manageSalary(employeeId:string):void;
    manageInsurance(employeeId:string):void;
}