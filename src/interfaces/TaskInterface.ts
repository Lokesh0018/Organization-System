import User from "../models/User";

export default interface TaskInterface {
    createTask(): void;
    updateTask(user: User): void;
    viewOwnTasks(user: User): void;
}