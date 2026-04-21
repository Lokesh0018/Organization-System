import UserInterface from "../interfaces/UserInterface";
import { TaskStatus, UserRole } from "../types/Types";
import Project from "./Project";
import Task from "./Task";

export default abstract class User implements UserInterface {

    private id: string;
    private name: string;
    private email: string;
    private password: string;
    private role: UserRole;

    constructor(id: string, name: string, email: string, password: string, role: UserRole) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    public getId(): string {
        return this.id;
    }

    public setId(id: string): void {
        this.id = id;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public getPassword(): string {
        return this.password;
    }

    public setPassword(password: string): void {
        this.password = password;
    }

    public getRole(): UserRole {
        return this.role;
    }

    public setRole(role: UserRole): void {
        this.role = role;
    }

    createEmployee(user: User): void {
        throw new Error("Method not implemented.");
    }

    viewEmployee(userId: number): User {
        throw new Error("Method not implemented.");
    }

    updateEmployee(userId: number, user: User): void {
        throw new Error("Method not implemented.");
    }

    deleteEmployee(userId: number): void {
        throw new Error("Method not implemented.");
    }

    assignRoles(userId: number, role: UserRole): void {
        throw new Error("Method not implemented.");
    }

    createProject(project: Project): void {
        throw new Error("Method not implemented.");
    }

    assignProjectToEmployee(projectId: string, employeeId: string): void {
        throw new Error("Method not implemented.");
    }

    viewProject(projectId: string): Project {
        throw new Error("Method not implemented.");
    }

    assignClients(clientId: string, employeeId: string): void {
        throw new Error("Method not implemented.");
    }

    createTasks(task: Task): void {
      throw new Error("Method not implemented.");
    }

    updateTasks(taskId: string, taskStatus: TaskStatus): void {
        throw new Error("Method not implemented.");
    }

    viewOwnTasks(employeeId: string): Task[] {
        throw new Error("Method not implemented.");
    }

    trackProjectProgress(projectId: string): Task[] {
        throw new Error("Method not implemented.");
    }

    manageSalary(employeeId: string): void {
        throw new Error("Method not implemented.");
    }

    manageInsurance(employeeId: string): void {
        throw new Error("Method not implemented.");
    }

}