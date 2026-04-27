import Employee from "../roles/Employee";
import Admin from "../roles/Admin";
import HR from "../roles/HR";
import PM from "../roles/PM";
import Client from "../roles/Client";
import Finance from "../roles/Finance";

export type UserRole = "ADMIN" | "HR" | "PM" | "EMPLOYEE" | "CLIENT" | "FINANCE";

export type TaskStatus = "TODO" | "In Progress" | "Done";

export type Roles = Admin | HR | PM | Employee | Client | Finance;

export type UserJson = {
    "id": string;
    "name": string;
    "email": string;
    "password": string;
    "role": UserRole;
}

export type EmployeeJson = {
    "id": string;
    "name": string;
    "email": string;
    "assignedProjectIds": string[];
}

export type ProjectJson = {
    "id": string,
    "name": string,
    "employeeId": string,
    "clientId": string
}

export type TaskJson = {
    "id": string,
    "title": string,
    "projectId": string,
    "status": "TODO" | "IN_PROGRESS" | "DONE"
}

export type FinanceJson = {
    "id":string;
    "salary":number;
    "insurance":number;
}