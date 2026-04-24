import promptSync from "prompt-sync";
import ProjectService from "./ProjectService";
import { TaskJson } from "../types/Types";
import JsonService from "./JsonService";

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
}