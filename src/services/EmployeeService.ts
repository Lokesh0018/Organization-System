import promptSync from "prompt-sync";
import JsonService from "./JsonService";
import { EmployeeJson, UserJson } from "../types/Types";
import UserService from "./UserService";

const prompt = promptSync();
export default class EmployeeService {
    private static employeeService: EmployeeService;
    private static empPath:string = "D:/organization-system/src/data/employees.json";

    static getInstance(): EmployeeService {
        if (!this.employeeService)
            this.employeeService = new EmployeeService();
        return this.employeeService;
    }

    static getPath():string {
        return this.empPath;
    }

    getData():EmployeeJson[] {
        const jsonService = JsonService.getInstance();
        return jsonService.readJson(EmployeeService.empPath);
    }

    findByEmail(path:string,email:string):EmployeeJson | undefined {
        const jsonService = JsonService.getInstance();
        const data:EmployeeJson[] = jsonService.readJson(path);
        return data.find(e => e.email === email);
    }

    verifyEmployee(empName:string,empEmail:string,empPass:string):boolean {
        if(!empName || !empEmail || !empPass){
            console.log("\nAll Fields are Required !\n");
            return false;
        }
        const emp = this.findByEmail(EmployeeService.empPath,empEmail);
        if(emp){
            console.log(`\nEmployee was already created with this email (${empEmail})\n`);
            return false;
        }
        return true;
    }

    createEmployee(): void {
        const empName: string = prompt("Enter Employee Name: ");
        const empEmail:string = prompt("Enter Employee Email: ");
        const empPass:string = prompt("Enter Employee Password: ");
        if(!this.verifyEmployee(empName,empEmail,empPass))
            return;
        const jsonService = JsonService.getInstance();
        const employeeService = EmployeeService.getInstance();
        const empData = employeeService.getData();
        const empId = `E${empData.length+1}`;
        const emp = {
            "id":empId,
            "name":empName,
            "email":empEmail,
            "assignedProjectId":"",
        }
        empData.push(emp);
        jsonService.writeJson(EmployeeService.getPath(),empData);
        const userService = UserService.getInstance();
        const userData:UserJson[] = userService.getData();
        const user:UserJson = {
            "id":`${userData.length+1}`,
            "name":empName,
            "email": empEmail,
            "password":empPass,
            "role":"EMPLOYEE"
        }
        userData.push(user);
        jsonService.writeJson(UserService.getPath(),userData);
        console.log("\nEmployee Created Successfully\n");
    }
}