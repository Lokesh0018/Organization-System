import PromptSync from "prompt-sync";
import { FinanceJson } from "../types/Types";
import EmployeeService from "./EmployeeService";
import JsonService from "./JsonService";

const prompt = PromptSync();
export default class FinanceService {
    private static financeService:FinanceService;
    private static path:string = "D:/organization-system/src/data/finance.json";

    static getInstance():FinanceService {
        if(!this.financeService)
            this.financeService = new FinanceService();
        return this.financeService;
    }

    static getPath():string {
        return this.path;
    }

    getData():FinanceJson[]{
        const jsonService = JsonService.getInstance();
        return jsonService.readJson(FinanceService.getPath()) as FinanceJson[];
    }

    addEmployee(id:string):void{
        const financeService = FinanceService.getInstance();
        const financeData = financeService.getData();
        financeData.push({
            "id":id,
            "salary":0,
            "insurance":0
        });
        const jsonService = JsonService.getInstance();
        jsonService.writeJson(FinanceService.getPath(),financeData);
    }

    deleteEmployee(id:string):void{
        const financeService = FinanceService.getInstance();
        let financeData = financeService.getData();
        financeData = financeData.filter(f => f.id !== id);
        const jsonService = JsonService.getInstance();
        jsonService.writeJson(FinanceService.getPath(),financeData);
    }

    manageSalary():void{
        console.log("\nManaging Salary...\n");
        const empId = prompt("Enter Employee Id: ");
        if(!empId){
            console.log("\nEmployee Id cannot be Empty !\n");
            return;
        }
        const employeeService = EmployeeService.getInstance();
        const empData = employeeService.getData();
        const employee = employeeService.findById(empId,empData);
        if(!employee){
            console.log("\nEmployee not found !\n");
            return;
        }
        const salary = parseInt(prompt("Enter Salary: "));
        if(!salary){
            console.log("\nSalary Cannot be Empty !\n");
            return;
        }
        const financeService = FinanceService.getInstance();
        const financeData = financeService.getData();
        financeData.forEach((f) => {
            if(f.id === empId){
                f.salary = salary
            }
        })
        const jsonService = JsonService.getInstance();
        jsonService.writeJson(FinanceService.getPath(),financeData);
        console.log("\nSalary Updated Successfully !\n");
    }

    manageInsurance():void{
        const empId = prompt("Enter Employee Id: ");
        if(!empId){
            console.log("\nEmployee Id cannot be Empty !\n");
            return;
        }
        const employeeService = EmployeeService.getInstance();
        const empData = employeeService.getData();
        const employee = employeeService.findById(empId,empData);
        if(!employee){
            console.log("\nEmployee not found !\n");
            return;
        }
        const insurance = parseInt(prompt("Enter Insurance Amount: "));
        if(!insurance){
            console.log("\nInsurance Cannot be Empty !\n");
            return;
        }
        const financeService = FinanceService.getInstance();
        const financeData = financeService.getData();
        financeData.forEach((f) => {
            if(f.id === empId){
                f.insurance = insurance
            }
        })
        const jsonService = JsonService.getInstance();
        jsonService.writeJson(FinanceService.getPath(),financeData);
        console.log("\nInsurance Updated Successfully !\n");
    }
}