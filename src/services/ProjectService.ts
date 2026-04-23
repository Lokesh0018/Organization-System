import promptSync from "prompt-sync";
import JsonService from "./JsonService";
import { ProjectJson } from "../types/Types";

const prompt = promptSync();
export default class ProjectService {
    private static projectService:ProjectService;
    private static projPath = "D:/organization-system/src/data/projects.json";

    static getInstance():ProjectService{
        if(!this.projectService)
            this.projectService = new ProjectService();
        return this.projectService;
    }

    static getProjectPath():string {
        return this.projPath;
    }
    
    getProjectById(id:string,data:ProjectJson[]){
        return data.find(d => d.id === id);
    }

    createProject():void {
        console.log("\nCreating Project...\n");
        const projectId = prompt("Enter Project Id: ");
        if(!projectId){
            console.log("\nProject Id cannot be Empty !\n");
            return;
        }
        const projectService = ProjectService.getInstance();
        const jsonService = JsonService.getInstance();
        const projectData = jsonService.readJson(ProjectService.getProjectPath());
        const project = projectService.getProjectById(projectId,projectData);
        if(project){
            console.log(`\nAlready Created Project with Same Id (${projectId}) \n`);
            return;
        }
        const name = prompt("Enter Project Name: ");
        if(!name){
           console.log("\nProject Name cannot be Empty !\n");
            return; 
        }
        const proj:ProjectJson = {
            "id":projectId,
            "name":name,
            "employeeId":"",
            "clientId":""
        }
        projectData.push(proj);
        jsonService.writeJson(ProjectService.getProjectPath(),projectData);
    }

}