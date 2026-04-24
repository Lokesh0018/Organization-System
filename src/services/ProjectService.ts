import promptSync from "prompt-sync";
import JsonService from "./JsonService";
import { ProjectJson, UserJson } from "../types/Types";
import EmployeeService from "./EmployeeService";
import UserService from "./UserService";
import TaskService from "./TaskService";

const prompt = promptSync();
export default class ProjectService {
    private static projectService: ProjectService;
    private static path = "D:/organization-system/src/data/projects.json";

    static getInstance(): ProjectService {
        if (!this.projectService)
            this.projectService = new ProjectService();
        return this.projectService;
    }

    static getPath(): string {
        return this.path;
    }

    getIndex(projectId: string, projData: ProjectJson[]): number {
        projData.forEach((p, i) => {
            if (projectId === p.id) 
                return i;
        })
        return 0;
    }

    getData(): ProjectJson[] {
        const jsonService = JsonService.getInstance();
        return jsonService.readJson(ProjectService.getPath());
    }

    findById(id: string, data: ProjectJson[]) {
        return data.find(d => d.id === id);
    }

    createProject(): void {
        console.log("\nCreating Project...\n");
        const projectId = prompt("Enter Project Id: ");
        if (!projectId) {
            console.log("\nProject Id cannot be Empty !\n");
            return;
        }
        const projectService = ProjectService.getInstance();
        const jsonService = JsonService.getInstance();
        const projectData = jsonService.readJson(ProjectService.getPath());
        const project = projectService.findById(projectId, projectData);
        if (project) {
            console.log(`\nAlready Created Project with Same Id (${projectId}) \n`);
            return;
        }
        const name = prompt("Enter Project Name: ");
        if (!name) {
            console.log("\nProject Name cannot be Empty !\n");
            return;
        }
        const proj: ProjectJson = {
            "id": projectId,
            "name": name,
            "employeeId": "",
            "clientId": ""
        }
        projectData.push(proj);
        jsonService.writeJson(ProjectService.getPath(), projectData);
        console.log("\nProject Created Successfully !\n");
    }

    assignProject(): void {
        console.log("\nAssigning Project to Employee...\n");
        const projectId = prompt("Enter Project Id: ");
        if (!projectId) {
            console.log("\nProject Id cannot be Empty !\n");
            return;
        }
        const projectService = ProjectService.getInstance();
        const projData = projectService.getData();
        const project = projectService.findById(projectId, projData);
        if (!project) {
            console.log("\nProject not found !\n");
            return;
        }
        const employeeId = prompt("Enter Employee Id: ");
        if (!employeeId) {
            console.log("\nEmployee Id cannot be Empty !\n");
            return;
        }
        const employeeService = EmployeeService.getInstance();
        const empData = employeeService.getData();
        const employee = employeeService.findById(employeeId, empData);
        if (!employee) {
            console.log("\nEmployee not found !\n");
            return;
        }
        const empIdx = employeeService.getIndex(employee.id);
        if (empData[empIdx]!.assignedProjectIds.includes(projectId)) {
            console.log(`\nProject ${projectId} was already Assigned to ${employeeId}\n`);
            return;
        }
        empData[empIdx]!.assignedProjectIds.push(projectId);
        const projIdx = projectService.getIndex(project.id, projData);
        projData[projIdx]!.employeeId = employeeId;
        const jsonService = JsonService.getInstance();
        jsonService.writeJson(EmployeeService.getPath(), empData);
        jsonService.writeJson(ProjectService.getPath(), projData);
        console.log(`\nProject ${projectId} was Assigned to ${employeeId}\n`);
    }

    assignClient():void {
        console.log("\nAssigning Client...\n");
        const clientId = prompt("Enter Client Id: ");
        if(!clientId) {
            console.log("\nClient Id cannot be Empty\n");
            return;
        }
        const userService = UserService.getInstance();
        const userData = userService.getData();
        const clientUser = userService.findById(clientId,userData);
        if(!clientUser){
            console.log("\nClient not found !\n");
            return;
        }
        if(clientUser.role !== "CLIENT"){
            console.log("\nRole was not Assigned as Client !\n");
            return;
        }
        const projId = prompt("Enter Project Id: ");
        if(!projId){
            console.log("\nProject Id cannot be Empty\n");
            return;
        }
        const projectService = ProjectService.getInstance();
        const projData = projectService.getData();
        const project = projectService.findById(projId,projData);
        if(!project){
            console.log("\nProject not found !\n");
            return;
        }
        const projIdx = projectService.getIndex(projId,projData);
        projData[projIdx]!.clientId = clientId;
        const jsonService = JsonService.getInstance();
        jsonService.writeJson(ProjectService.getPath(),projData);
        console.log(`\nClient ${clientId} was Assigned to Project ${projId}\n`);
    }

    viewProject():void{
        console.log("\nViewing Project...\n");
        const projectId = prompt("Enter Project Id: ");
        if(!projectId){
            console.log("\nProject Id cannot be Empty !\n");
            return;
        }
        const projectService = ProjectService.getInstance();
        const projData = projectService.getData();
        const project = projectService.findById(projectId,projData);
        if(!project){
            console.log("\nProject not found !\n");
            return;
        }
        console.log(`\n${project.id} -> ${project.name} -> ${project.employeeId} -> ${project.clientId}\n`);
    }

    trackProjectProgress():void{
        console.log("\nTracking Project Progress...\n");
        const projectId = prompt("Enter Project Id: ");
        if(!projectId){
            console.log("\nProject Id cannot be Empty !\n");
            return;
        }
        const projectService = ProjectService.getInstance();
        const projectData = projectService.getData();
        const project = projectService.findById(projectId,projectData);
        if(!project){
            console.log("\nProject not found\n");
            return;
        }
        const taskService = TaskService.getInstance();
        const taskData = taskService.getData();
        const tasks = taskService.tasksByProjectId(project.id,taskData);
        console.table(tasks);
    }
}