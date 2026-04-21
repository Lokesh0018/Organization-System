import { TaskStatus } from "../types/Types";

export default class Task {
    private taskId:string;
    private taskTitle:string;
    private projectId:string;
    private taskStatus:TaskStatus;

    constructor(taskId:string,taskTitle:string,projectId:string,taskStatus:TaskStatus){
        this.taskId = taskId;
        this.taskTitle = taskTitle;
        this.projectId = projectId;
        this.taskStatus = taskStatus;
    }

    public getTaskId():string {
        return this.taskId;
    }

    public setTaskId(taskId:string):void {
        this.taskId = taskId;
    }

    public getTaskTitle():string {
        return this.taskTitle;
    }

    public setTaskTitle(taskTitle:string):void {
        this.taskTitle = taskTitle;
    }

    public getProjectId():string {
        return this.projectId;
    }

    public setProjectId(projectId:string):void {
        this.projectId = projectId;
    }

    public getTaskStatus():TaskStatus {
        return this.taskStatus;
    }

    public setTaskStatus(taskStatus:TaskStatus):void {
        this.taskStatus = taskStatus;
    }
}