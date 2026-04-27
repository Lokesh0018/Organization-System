import Admin from "../roles/Admin";
import HR from "../roles/HR";
import PM from "../roles/PM";
import Employee from "../roles/Employee";
import Client from "../roles/Client";
import Finance from "../roles/Finance";
import { Roles } from "../types/Types";
import User from "../models/User";

export default class UserFactory {
    static createUser(userData: User): Roles {
        switch (userData.getRole()) {
            case "ADMIN":
                return new Admin(userData.getId(), userData.getName(), userData.getEmail(), userData.getPassword());
            case "HR": 
                return new HR(userData.getId(), userData.getName(), userData.getEmail(), userData.getPassword());
            case "PM": 
                return new PM(userData.getId(), userData.getName(), userData.getEmail(), userData.getPassword());
            case "EMPLOYEE":
                return new Employee(userData.getId(), userData.getName(), userData.getEmail(), userData.getPassword());
            case "CLIENT":
                return new Client(userData.getId(), userData.getName(), userData.getEmail(), userData.getPassword());
            case "FINANCE":
                return new Finance(userData.getId(), userData.getName(), userData.getEmail(), userData.getPassword());
            default:
                throw new Error(`Role ${userData.getRole()} is not Found`);
        }
    }
}