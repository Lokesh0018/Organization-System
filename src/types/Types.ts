export type UserRole = "ADMIN" | "HR" | "PM" | "EMPLOYEE" | "CLIENT" | "FINANCE";

export type TaskStatus = "TODO" | "In Progress" | "Done";

export type UserJson = {
    "id":string;
    "name":string;
    "email":string;
    "password":string;
    "role":UserRole;
}