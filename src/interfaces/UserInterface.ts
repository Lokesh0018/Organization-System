import { UserRole } from "../types/Types";

export default interface UserInterface {
    getId(): string;
    getName(): string;
    getEmail(): string;
    getRole(): UserRole;
}