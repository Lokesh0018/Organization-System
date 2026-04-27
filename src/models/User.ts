import UserInterface from "../interfaces/UserInterface";
import { UserRole } from "../types/Types";

export default class User implements UserInterface {
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
}