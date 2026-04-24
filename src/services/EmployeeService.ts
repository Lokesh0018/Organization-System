import promptSync from "prompt-sync";
import JsonService from "./JsonService";
import { EmployeeJson, UserJson, UserRole } from "../types/Types";
import UserService from "./UserService";
import FinanceService from "./FinanceService";

const prompt = promptSync();
export default class EmployeeService {
    private static employeeService: EmployeeService;
    private static path: string = "D:/organization-system/src/data/employees.json";

    static getInstance(): EmployeeService {
        if (!this.employeeService)
            this.employeeService = new EmployeeService();
        return this.employeeService;
    }

    static getPath(): string {
        return this.path;
    }

    getData(): EmployeeJson[] {
        const jsonService = JsonService.getInstance();
        return jsonService.readJson(EmployeeService.getPath());
    }

    getIndex(id: string): number {
        return parseInt(id.slice(1)) - 1;
    }

    findByEmail(email: string, data: EmployeeJson[]): EmployeeJson | undefined {
        return data.find(e => e.email === email);
    }

    findById(id:string,data:EmployeeJson[]):EmployeeJson | undefined {
        return data.find(e => e.id === id);
    }

    verifyEmployee(empName: string, empEmail: string, empPass: string): boolean {
        if (!empName || !empEmail || !empPass) {
            console.log("\nAll Fields are Required !\n");
            return false;
        }
        const jsonService = JsonService.getInstance();
        const empData = jsonService.readJson(EmployeeService.getPath());
        const emp = this.findByEmail(empEmail, empData);
        if (emp) {
            console.log(`\nEmployee was already created with this email (${empEmail})\n`);
            return false;
        }
        return true;
    }

    createEmployee(): void {
        console.log("\nCreating Employee...\n");
        const empName: string = prompt("Enter Employee Name: ");
        const empEmail: string = prompt("Enter Employee Email: ");
        const empPass: string = prompt("Enter Employee Password: ");
        if (!this.verifyEmployee(empName, empEmail, empPass))
            return;
        const jsonService = JsonService.getInstance();
        const employeeService = EmployeeService.getInstance();
        const empData = employeeService.getData();
        const empId = `E${empData.length + 1}`;
        const emp = {
            "id": empId,
            "name": empName,
            "email": empEmail,
            "assignedProjectIds": [],
        }
        empData.push(emp);
        jsonService.writeJson(EmployeeService.getPath(), empData);
        const userService = UserService.getInstance();
        const userData: UserJson[] = userService.getData();
        const user: UserJson = {
            "id": `${userData.length + 1}`,
            "name": empName,
            "email": empEmail,
            "password": empPass,
            "role": "EMPLOYEE"
        }
        userData.push(user);
        jsonService.writeJson(UserService.getPath(), userData);
        const financeService = FinanceService.getInstance();
        financeService.addEmployee(empId);
        console.log("\nEmployee Created Successfully\n");
    }

    viewEmployees(): void {
        console.log("\nViewing Employees...\n");
        console.table(this.getData());
    }

    updateEmployee(): void {
        console.log("\nUpdating Employee...\n");
        const email: string = prompt("Enter Email: ");
        if (!email) {
            console.log("\nEmail cannot be Empty !\n");
            return;
        }
        const employeeService = EmployeeService.getInstance();
        const empData = employeeService.getData();
        const employee: EmployeeJson | undefined = employeeService.findByEmail(email, empData);
        const userService = UserService.getInstance();
        const userData = userService.getData();
        const user: UserJson | undefined = userService.findByEmail(email, userData);
        if (!employee || !user) {
            console.log("\nEmployee not found for Updation !\n");
            return;
        }
        const updatedEmployee = {
            "id": employee.id,
            "name": employee.name,
            "email": employee.email,
            "assignedProjectIds": employee.assignedProjectIds,
        }
        const updatedUser = {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "password": user.password,
            "role": user.role
        }
        const empIdx: number = employeeService.getIndex(employee.id);
        const userIdx: number = userService.getIndex(user.id);
        let saveChanges = false;
        const jsonService = JsonService.getInstance();
        while (!saveChanges) {
            console.log("\n1. Update Name\n2. Update Email\n3. Update Password\n4. Save Changes\n5. Cancle\n");
            const update: number = parseInt(prompt("Enter Field to be updated: "));
            switch (update) {
                case 1:
                    const name: string = prompt("Enter Name: ");
                    if (!name) {
                        console.log("\nName cannot be Empty !\n");
                        break;
                    }
                    updatedEmployee.name = name;
                    updatedUser.name = name;
                    break;
                case 2:
                    const newEmail: string = prompt("Enter Email: ");
                    if (!newEmail) {
                        console.log("\nEmail cannot be Empty !\n");
                        break;
                    }
                    updatedEmployee.email = newEmail;
                    updatedUser.email = newEmail;
                    break;
                case 3:
                    const pass: string = prompt("Enter to be updated password: ");
                    if (!pass) {
                        console.log("\nPassword cannot be Empty !\n");
                        break;
                    }
                    updatedUser.password = pass;
                    break;
                case 4:
                    empData[empIdx]!.name = updatedEmployee.name;
                    empData[empIdx]!.email = updatedEmployee.email;
                    userData[userIdx]!.name = updatedUser.name;
                    userData[userIdx]!.email = updatedUser.email;
                    userData[userIdx]!.password = updatedUser.password;
                    jsonService.writeJson(EmployeeService.getPath(), empData);
                    jsonService.writeJson(UserService.getPath(), userData);
                    saveChanges = true;
                    console.log(`\n${updatedEmployee.name} Updated Successfully\n`);
                    break;
                case 5:
                    return;
                default:
                    console.log("\nInvalid Field !\n");
            }
        }
    }

    deleteEmployee(): void {
        console.log("\nDeleting Employee...\n");
        const email: string = prompt("Enter Email: ");
        if (!email) {
            console.log("\nEmail cannot be Empty !\n");
            return;
        }
        const employeeService = EmployeeService.getInstance();
        let empData = employeeService.getData();
        const employee: EmployeeJson | undefined = employeeService.findByEmail(email, empData);
        const userService = UserService.getInstance();
        let userData = userService.getData();
        const user: UserJson | undefined = userService.findByEmail(email, userData);
        if (!employee || !user) {
            console.log("\nEmployee not found for Deletion !\n");
            return;
        }
        empData = empData.filter(e => e.email !== email);
        userData = userData.filter(u => u.email !== email);
        const empIdx = employeeService.getIndex(employee.id);
        const userIdx = userService.getIndex(user.id);
        for (let i: number = empIdx; i < empData.length; i++)
            empData[i]!.id = `E${i + 1}`;
        for (let i: number = userIdx; i < userData.length; i++)
            userData[i]!.id = `${i + 1}`;
        const jsonService = JsonService.getInstance();
        jsonService.writeJson(EmployeeService.getPath(), empData);
        jsonService.writeJson(UserService.getPath(), userData);
        const financeService = FinanceService.getInstance();
        financeService.deleteEmployee(employee.id);
        console.log(`\n${employee.name} Deleted Successfully !\n`);
    }

    assignRole(): void {
        console.log("\nAssigning Role...\n");
        const email: string = prompt("Enter Email: ");
        if (!email) {
            console.log("\nEmail cannot be Empty !\n");
            return;
        }
        const userService = UserService.getInstance();
        const userData = userService.getData();
        const user: UserJson | undefined = userService.findByEmail(email, userData);
        if (!user) {
            console.log("\nEmployee not found for Deletion !\n");
            return;
        }
        const roles = ["HR", "PM", "EMPLOYEE", "CLIENT", "FINANCE"];
        roles.forEach((r, idx) => console.log(`${idx + 1}. ${r}`));
        const newRole = parseInt(prompt("Enter New Role to be assigned: ")) - 1;
        if(newRole<0 || newRole>=roles.length){
            console.log("\nInvalid Role !\n");
            return;
        }
        if (user.role === roles[newRole]) {
            console.log("\nUpdating with Same Role\n");
            return;
        }
        const userIdx = userService.getIndex(user.id);
        userData[userIdx]!.role = roles[newRole] as UserRole;
        const jsonService = JsonService.getInstance();
        jsonService.writeJson(UserService.getPath(), userData);
        console.log(`\n${roles[newRole]} Role has Updated to ${user.name}\n`);
    }
}