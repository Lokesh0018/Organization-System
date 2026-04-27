import promptSync from "prompt-sync";
import ProjectService from "./ProjectService";
import { TaskJson, TaskStatus } from "../types/Types";
import JsonService from "./JsonService";
import EmployeeService from "./EmployeeService";
import User from "../models/User";

const prompt = promptSync();
export default class TaskService{
    private static taskService:TaskService;
    private static path:string = "D:/organization-system/src/data/tasks.json";

    static getInstance():TaskService {
        if(!this.taskService)
            this.taskService = new TaskService();
        return this.taskService;
    }

    static getPath():string {
        return this.path;
    }

    getData():TaskJson[]{
        const jsonService = JsonService.getInstance();
        return jsonService.readJson(TaskService.getPath()); 
    }

    findById(id:string,data:TaskJson[]):TaskJson | undefined {
        return data.find(d => d.id === id);
    }

    getIndex(taskId:string,data:TaskJson[]):number{
        return data.findIndex(d => d.id === taskId);
    }

    tasksByProjectId(projectId:string,data:TaskJson[]){
        return data.filter((d) => d.projectId === projectId);
    }

    createTask():void {
        console.log(`\nCreating Task...\n`);
        const taskId = prompt("Enter Task Id: ");
        const taskService = TaskService.getInstance();
        const taskData = taskService.getData();
        const task = taskService.findById(taskId,taskData);
        if(task){
            console.log(`\nTask already created with id (${taskId})\n`);
            return;
        }
        const taskTitle = prompt("Enter Task Title: ");
        const projectId = prompt("Enter Project Id: ");
        if(!taskId || !taskTitle || !projectId){
            console.log("All Fields are Required !");
            return;
        }
        const projectService = ProjectService.getInstance();
        const projData = projectService.getData();
        const project = projectService.findById(projectId,projData);
        if(!project){
            console.log("\nProject not found !\n");
            return;
        }
        const t:TaskJson = {
            "id":taskId,
            "title":taskTitle,
            "projectId":projectId,
            "status":"TODO"
        }
        taskData.push(t);
        const jsonService = JsonService.getInstance();
        jsonService.writeJson(TaskService.getPath(),taskData);
        console.log(`\n${taskId} was Created Successfully\n`);
    }

    updateTask(user:User):void {
        console.log("\nUpdating Task...\n");
        const taskId = prompt("Enter Task Id: ");
        if(!taskId){
            console.log("\nTask Id cannot be Empty !\n");
            return;
        }
        const taskService = TaskService.getInstance();
        const taskData = taskService.getData();
        const task = taskService.findById(taskId,taskData);
        if(!task){
            console.log("\nTask not found !\n");
            return;
        }
        if(user.getRole() === "EMPLOYEE"){
            const employeeService = EmployeeService.getInstance();
            const employeeData = employeeService.getData();
            const employee = employeeService.findByEmail(user.getEmail(),employeeData);
            if(!employee?.assignedProjectIds.includes(task.projectId)){
                console.log(`\nEmployee ${employee?.id} cannot have access to update Task ${task.id}\n`);
                return;
            }
        }
        const status:TaskStatus[] = ["TODO", "In Progress", "Done"];
        status.forEach((t,idx) => console.log(`${idx+1}. ${t}`));
        const updatedStatus:number = parseInt(prompt("Enter Status: "));
        const taskIdx = taskService.getIndex(task.id,taskData);
        switch(updatedStatus){
            case 1:
                if(task.status === "TODO")
                    return;
                taskData[taskIdx]!.status = "TODO";
                break;
            case 2:
                if(task.status === "IN_PROGRESS")
                    return;
                taskData[taskIdx]!.status = "IN_PROGRESS";
                break;
            case 3:
                if(task.status === "DONE")
                    return;
                taskData[taskIdx]!.status = "DONE";
                break;
            default:
                console.log("\nInvalid Task Status !\n");
                return;
        }
        const jsonService = JsonService.getInstance();
        jsonService.writeJson(TaskService.getPath(),taskData);
        console.log(`\nTask Status Updated Successfully\n`);
    }

    viewOwnTasks(user:User):void {
        const taskService = TaskService.getInstance();
        const taskData = taskService.getData();
        if(user.getRole()==="ADMIN" || user.getRole()==="PM"){
            console.table(taskData);
            return;
        }
        const employeeService = EmployeeService.getInstance();
        const empData = employeeService.getData();
        const employee = employeeService.findByEmail(user.getEmail(),empData);
        const projectIds = employee?.assignedProjectIds;
        if(projectIds?.length === 0){
            console.log("\nNo tasks Found !\n");
            return;
        }
        projectIds?.forEach((id) => {
            console.table(taskService.tasksByProjectId(id,taskData));
        })
    }
}