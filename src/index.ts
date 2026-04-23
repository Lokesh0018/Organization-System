import promptSync from "prompt-sync";
import LoginService from "./services/LoginService";
import { UserJson } from "./types/Types";
import EmployeeService from "./services/EmployeeService";
import ProjectService from "./services/ProjectService";

let curUser: UserJson | null = null;
const prompt = promptSync();
let service;

while (true) {
    if (!curUser) {
        console.log("\n1. Login\n2. Exit\n");
        const choice: number = parseInt(prompt("Enter Choice: "));
        switch (choice) {
            case 1:
                service = new LoginService();
                const email = prompt("Enter Email: ");
                const pass = prompt("Enter Password: ");
                curUser = service.verifyLogin(email, pass);
                break;
            case 2:
                process.exit(0);
            default:
                console.log("\nWrong Choice\n");
                break;
        }
    }
    else {
        let actions;
        switch(curUser.role){
            case "ADMIN":
                actions = ["Create Employee","View Employees","Update Employee","Delete Employee","Assign Roles","Create Project","Assign Project to Employees","Assign Clients","Create Tasks","View Project","Update Tasks","View Own Tasks","Track Project Progress","Manage Salaries","Manage Insurance","Logout\n"];
                actions.forEach((a,i) => console.log(`${i+1}. ${a}`));
                const adminAction = parseInt(prompt("Enter Action: "));
                switch(adminAction){
                    case 1:
                        service = EmployeeService.getInstance();
                        service.createEmployee();
                        break;
                    case 2:
                        service = EmployeeService.getInstance();
                        service.viewEmployees();
                        break;
                    case 3:
                        service = EmployeeService.getInstance();
                        service.updateEmployee();
                        break;
                    case 4:
                        service = EmployeeService.getInstance();
                        service.deleteEmployee();
                        break;
                    case 5:
                        service = EmployeeService.getInstance();
                        service.assignRole();
                        break;
                    case 6:
                        service = ProjectService.getInstance();
                        service.createProject();
                        break;
                    case 7:
                        service = ProjectService.getInstance();
                        service.assignProject();
                        break;
                    case 16:
                        curUser = null;
                        break;
                    default:
                        console.log("\nInvalid Action\n");
                        break;
                }
                break;
            case "HR":
                actions = ["Create Employee","View Employees","Update Employee","Logout\n"];
                actions.forEach((a,i) => console.log(`${i+1}. ${a}`));
                const hrAction = parseInt(prompt("Enter Action: "));
                if(hrAction===4)
                    curUser = null;
                break;
            case "PM":
                actions = ["View Employees","Create Project","Assign Project to Employees","Assign Clients","Create Tasks","View Project","Update Tasks","View Own Tasks","Track Project Progress","Logout\n"];
                actions.forEach((a,i) => console.log(`${i+1}. ${a}`));
                const pmAction = parseInt(prompt("Enter Action: "));
                if(pmAction===10)
                    curUser = null;
                break;
            case "EMPLOYEE":
                actions = ["View Project","Update Tasks","View Own Tasks","Track Project Progress","Logout\n"];
                actions.forEach((a,i) => console.log(`${i+1}. ${a}`));
                const employeeAction = parseInt(prompt("Enter Action: "));
                if(employeeAction===5)
                    curUser = null;
                break;
            case "CLIENT":
                actions = ["View Project","Track Project Progress","Logout\n"];
                actions.forEach((a,i) => console.log(`${i+1}. ${a}`));
                const clientAction = parseInt(prompt("Enter Action: "));
                if(clientAction===3)
                    curUser = null;
                break;
            case "FINANCE":
                actions = ["Manage Salaries","Manage Insurance","Logout\n"];
                actions.forEach((a,i) => console.log(`${i+1}. ${a}`));
                const financeAction = parseInt(prompt("Enter Action: "));
                if(financeAction===3)
                    curUser = null;
                break;
        }
    }
}