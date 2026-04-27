import User from "../models/User";

export default interface PMInterface {
    viewEmployees():void;
    createProject(): void;
    assignProject(): void;
    assignClient():void;
    createTask():void;
    viewProject(): void;
    updateTask(user:User):void;
    viewOwnTasks(user:User):void;
    trackProjectProgress(): void;
}