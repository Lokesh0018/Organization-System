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

    abstract createEmployee(user: User): void;
    abstract viewEmployee(userId: number): User;
    abstract updateEmployee(userId: number, user: User): void;
    abstract deleteEmployee(userId: number): void;
    abstract assignRoles(userId: number, role: UserRole): void;
    abstract createProject(project: Project): void;
    abstract assignProjectToEmployee(projectId: string, employeeId: string): void;
    abstract viewProject(projectId: string): Project;
    abstract assignClients(clientId: string, employeeId: string): void;
    abstract createTasks(task: Task): void;
    abstract updateTasks(taskId: string, taskStatus: TaskStatus): void;
    abstract viewOwnTasks(employeeId: string): Task[];
    abstract trackProjectProgress(projectId: string): Task[];
    abstract manageSalary(employeeId: string): void;
    abstract manageInsurance(employeeId: string): void;
}