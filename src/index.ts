import promptSync from "prompt-sync";
import LoginService from "./services/LoginService";
import { UserJson } from "./types/Types";
import EmployeeService from "./services/EmployeeService";
import ProjectService from "./services/ProjectService";
import TaskService from "./services/TaskService";
import FinanceService from "./services/FinanceService";

let curUser: UserJson | null = null;
const prompt = promptSync();

while (true) {
    if (!curUser) {
        console.log("\n1. Login\n2. Exit\n");
        const choice: number = parseInt(prompt("Enter Choice: "));
        switch (choice) {
            case 1:
                const loginService = new LoginService();
                const email = prompt("Enter Email: ");
                const pass = prompt("Enter Password: ");
                curUser = loginService.verifyLogin(email, pass);
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
        switch (curUser.role) {
            case "ADMIN":
                actions = ["Create Employee", "View Employees", "Update Employee", "Delete Employee", "Assign Roles", "Create Project", "Assign Project to Employees", "Assign Clients", "Create Tasks", "View Project", "Update Tasks", "View Own Tasks", "Track Project Progress", "Manage Salaries", "Manage Insurance", "Logout\n"];
                actions.forEach((a, i) => console.log(`${i + 1}. ${a}`));
                const adminAction = parseInt(prompt("Enter Action: "));
                switch (adminAction) {
                    case 1:
                        EmployeeService.getInstance().createEmployee();
                        break;
                    case 2:
                        EmployeeService.getInstance().viewEmployees();
                        break;
                    case 3:
                        EmployeeService.getInstance().updateEmployee();
                        break;
                    case 4:
                        EmployeeService.getInstance().deleteEmployee();
                        break;
                    case 5:
                        EmployeeService.getInstance().assignRole();
                        break;
                    case 6:
                        ProjectService.getInstance().createProject();
                        break;
                    case 7:
                        ProjectService.getInstance().assignProject();
                        break;
                    case 8:
                        ProjectService.getInstance().assignClient();
                        break;
                    case 9:
                        TaskService.getInstance().createTask();
                        break;
                    case 10:
                        ProjectService.getInstance().viewProject();
                        break;
                    case 11:
                        TaskService.getInstance().updateTask(curUser);
                        break;
                    case 12:
                        TaskService.getInstance().viewOwnTasks(curUser);
                        break;
                    case 13:
                        ProjectService.getInstance().trackProjectProgress();
                        break;
                    case 14:
                        FinanceService.getInstance().manageSalary();
                        break;
                    case 15:
                        FinanceService.getInstance().manageInsurance();
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
                actions = ["Create Employee", "View Employees", "Update Employee", "Logout\n"];
                actions.forEach((a, i) => console.log(`${i + 1}. ${a}`));
                const hrAction = parseInt(prompt("Enter Action: "));
                switch (hrAction) {
                    case 1:
                        EmployeeService.getInstance().createEmployee();
                        break;
                    case 2:
                        EmployeeService.getInstance().viewEmployees();
                        break;
                    case 3:
                        EmployeeService.getInstance().updateEmployee();
                        break;
                    case 4:
                        curUser = null;
                        break;
                    default:
                        console.log("\nInvalid Action\n");
                        break;
                }
                break;
            case "PM":
                actions = ["View Employees", "Create Project", "Assign Project to Employees", "Assign Clients", "Create Tasks", "View Project", "Update Tasks", "View Own Tasks", "Track Project Progress", "Logout\n"];
                actions.forEach((a, i) => console.log(`${i + 1}. ${a}`));
                const pmAction = parseInt(prompt("Enter Action: "));
                switch (pmAction) {
                    case 1:
                        EmployeeService.getInstance().viewEmployees();
                        break;
                    case 2:
                        ProjectService.getInstance().createProject();
                        break;
                    case 3:
                        ProjectService.getInstance().assignProject();
                        break;
                    case 4:
                        ProjectService.getInstance().assignClient();
                        break;
                    case 5:
                        TaskService.getInstance().createTask();
                        break;
                    case 6:
                        ProjectService.getInstance().viewProject();
                        break;
                    case 7:
                        TaskService.getInstance().updateTask(curUser!);
                        break;
                    case 8:
                        TaskService.getInstance().viewOwnTasks(curUser!);
                        break;
                    case 9:
                        ProjectService.getInstance().trackProjectProgress();
                        break;
                    case 10:
                        curUser = null;
                        break;
                    default:
                        console.log("\nInvalid Action\n");
                        break;
                }
                break;
            case "EMPLOYEE":
                actions = ["View Project", "Update Tasks", "View Own Tasks", "Track Project Progress", "Logout\n"];
                actions.forEach((a, i) => console.log(`${i + 1}. ${a}`));
                const employeeAction = parseInt(prompt("Enter Action: "));
                switch (employeeAction) {
                    case 1:
                        ProjectService.getInstance().viewProject();
                        break;
                    case 2:
                        TaskService.getInstance().updateTask(curUser!);
                        break;
                    case 3:
                        TaskService.getInstance().viewOwnTasks(curUser!);
                        break;
                    case 4:
                        ProjectService.getInstance().trackProjectProgress();
                        break;
                    case 5:
                        curUser = null;
                        break;
                    default:
                        console.log("\nInvalid Action\n");
                        break;
                }
                break;
            case "CLIENT":
                actions = ["View Project", "Track Project Progress", "Logout\n"];
                actions.forEach((a, i) => console.log(`${i + 1}. ${a}`));
                const clientAction = parseInt(prompt("Enter Action: "));
                switch(clientAction){
                    case 1:
                        ProjectService.getInstance().viewProject();
                        break;
                    case 2:
                        ProjectService.getInstance().trackProjectProgress();
                        break;
                    case 3:
                        curUser = null;
                        break;
                    default:
                        console.log("\nInvalid Action\n");
                        break;
                }
                break;
            case "FINANCE":
                actions = ["Manage Salaries", "Manage Insurance", "Logout\n"];
                actions.forEach((a, i) => console.log(`${i + 1}. ${a}`));
                const financeAction = parseInt(prompt("Enter Action: "));
                switch(financeAction){
                    case 1:
                        FinanceService.getInstance().manageSalary();
                        break;
                    case 2:
                        FinanceService.getInstance().manageInsurance();
                        break;
                    case 3:
                        curUser = null;
                        break;
                    default:
                        console.log("\nInvalid Action\n");
                        break;
                }
                break;
        }
    }
}