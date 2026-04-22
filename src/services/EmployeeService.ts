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

    getIndex(id:string):number {
        return parseInt(id.slice(1))-1;
    }

    findByEmail(email:string):EmployeeJson | undefined {
        const jsonService = JsonService.getInstance();
        const data:EmployeeJson[] = jsonService.readJson(EmployeeService.getPath());
        return data.find(e => e.email === email);
    }

    verifyEmployee(empName:string,empEmail:string,empPass:string):boolean {
        if(!empName || !empEmail || !empPass){
            console.log("\nAll Fields are Required !\n");
            return false;
        }
        const emp = this.findByEmail(empEmail);
        if(emp){
            console.log(`\nEmployee was already created with this email (${empEmail})\n`);
            return false;
        }
        return true;
    }

    createEmployee(): void {
        console.log("\nCreating Employee...\n");
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

    viewEmployees():void {
        console.log("\nViewing Employees...\n");
        console.table(this.getData());
    }

    updateEmployee():void {        
        console.log("\nUpdating Employee...\n");
        const email:string = prompt("Enter Email: ");
        const employee:EmployeeJson | undefined = this.findByEmail(email);
        const userService = UserService.getInstance();
        const user:UserJson | undefined = userService.findByEmail(email);
        if(!employee || !user){
            console.log("\nEmployee not found for Updation !\n");
            return;
        }
        const updatedEmployee = {
            "id":employee.id,
            "name":employee.name,
            "email":employee.email,
            "assignedProjectId":employee.assignedProjectId,
        }
        const updatedUser = {
            "id":user.id,
            "name":user.name,
            "email":user.email,
            "password":user.password,
            "role":user.role
        }
        const employeeService = EmployeeService.getInstance();
        const empData = employeeService.getData();
        const userData = userService.getData();
        const empIdx:number = employeeService.getIndex(employee.id);
        const userIdx:number = parseInt(user.id)-1;
        let saveChanges = false;
        const jsonService = JsonService.getInstance();
        while(!saveChanges){
            console.log("\n1. Update Name\n2. Update Email\n3. Update Password\n4. Save Changes\n5. Cancle\n");
            const update:number = parseInt(prompt("Enter Field to be updated: "));
            switch(update){
                case 1:
                    const name:string = prompt("Enter Name: ");
                    updatedEmployee.name = name;
                    updatedUser.name = name;
                    break;
                case 2:
                    const newEmail:string = prompt("Enter Email: ");
                    updatedEmployee.email = newEmail;
                    updatedUser.email = newEmail;
                    break;
                case 3:
                    const pass:string = prompt("Enter to be updated password: ");
                    updatedUser.password = pass;
                    break;
                case 4:
                    empData[empIdx]!.name = updatedEmployee.name;
                    empData[empIdx]!.email = updatedEmployee.email;
                    userData[userIdx]!.name = updatedUser.name;
                    userData[userIdx]!.email = updatedUser.email;
                    userData[userIdx]!.password = updatedUser.password;
                    jsonService.writeJson(EmployeeService.getPath(),empData);
                    jsonService.writeJson(UserService.getPath(),userData);
                    saveChanges = true;
                    break;
                case 5:
                    return;
            }
        }

    }
}