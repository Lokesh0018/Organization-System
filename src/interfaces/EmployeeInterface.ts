import User from "../models/User";

export default interface EmployeeInterface {
    viewProject():void;
    updateTask(user:User):void;
    viewOwnTasks(user:User):void;
    trackProjectProgress():void;
}