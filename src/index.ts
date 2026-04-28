import promptSync from "prompt-sync";
import LoginService from "./services/LoginService";
import UserSingleton from "./patterns/UserSingleton";
import { Roles } from "./types/Types";
import Admin from "./roles/Admin";
import HR from "./roles/HR";
import PM from "./roles/PM";
import Employee from "./roles/Employee";
import Client from "./roles/Client";
import Finance from "./roles/Finance";

const prompt = promptSync();

while (true) {
    const curUser:Roles | null = UserSingleton.getUser();
    if (!curUser) {
        console.log("\n1. Login\n2. Exit\n");
        const choice: number = parseInt(prompt("Enter Choice: "));
        switch (choice) {
            case 1:
                const email = prompt("Enter Email: ");
                const password = prompt("Enter Password: ");
                UserSingleton.setUser(LoginService.getInstance().verifyLogin({email, password}));
                break;
            case 2:
                process.exit(0);
                break;
            default:
                console.log("\nWrong Choice\n");
                break;
        }
    }
    else {
        let actions: string[];
        switch (curUser.getRole()) {
            case "ADMIN":
                actions = ["Create Employee", "View Employees", "Update Employee", "Delete Employee", "Assign Roles", "Create Project", "Assign Project to Employees", "Assign Clients", "Create Tasks", "View Project", "Update Tasks", "View Own Tasks", "Track Project Progress", "Manage Salaries", "Manage Insurance", "Logout\n"];
                actions.forEach((a, i) => console.log(`${i + 1}. ${a}`));
                const adminAction = parseInt(prompt("Enter Action: "));
                switch (adminAction) {
                    case 1:
                        (curUser as Admin).createEmployee();
                        break;
                    case 2:
                        (curUser as Admin).viewEmployees();
                        break;
                    case 3:
                        (curUser as Admin).updateEmployee();
                        break;
                    case 4:
                        (curUser as Admin).deleteEmployee();
                        break;
                    case 5:
                        (curUser as Admin).assignRole();
                        break;
                    case 6:
                        (curUser as Admin).createProject();
                        break;
                    case 7:
                        (curUser as Admin).assignProject();
                        break;
                    case 8:
                        (curUser as Admin).assignClient();
                        break;
                    case 9:
                        (curUser as Admin).createTask();
                        break;
                    case 10:
                        (curUser as Admin).viewProject();
                        break;
                    case 11:
                        (curUser as Admin).updateTask(curUser);
                        break;
                    case 12:
                        (curUser as Admin).viewOwnTasks(curUser);
                        break;
                    case 13:
                        (curUser as Admin).trackProjectProgress();
                        break;
                    case 14:
                        (curUser as Admin).manageSalary();
                        break;
                    case 15:
                        (curUser as Admin).manageInsurance();
                        break;
                    case 16:
                        UserSingleton.setUser(null);
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
                        (curUser as HR).createEmployee();
                        break;
                    case 2:
                        (curUser as HR).viewEmployees();
                        break;
                    case 3:
                        (curUser as HR).updateEmployee();
                        break;
                    case 4:
                        UserSingleton.setUser(null);
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
                        (curUser as PM).viewEmployees();
                        break;
                    case 2:
                        (curUser as PM).createProject();
                        break;
                    case 3:
                        (curUser as PM).assignProject();
                        break;
                    case 4:
                        (curUser as PM).assignClient();
                        break;
                    case 5:
                        (curUser as PM).createTask();
                        break;
                    case 6:
                        (curUser as PM).viewProject();
                        break;
                    case 7:
                        (curUser as PM).updateTask(curUser);
                        break;
                    case 8:
                        (curUser as PM).viewOwnTasks(curUser);
                        break;
                    case 9:
                        (curUser as PM).trackProjectProgress();
                        break;
                    case 10:
                        UserSingleton.setUser(null);
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
                        (curUser as Employee).viewProject();
                        break;
                    case 2:
                        (curUser as Employee).updateTask(curUser);
                        break;
                    case 3:
                        (curUser as Employee).viewOwnTasks(curUser);
                        break;
                    case 4:
                        (curUser as Employee).trackProjectProgress();
                        break;
                    case 5:
                        UserSingleton.setUser(null);
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
                        (curUser as Client).viewProject();
                        break;
                    case 2:
                        (curUser as Client).trackProjectProgress();
                        break;
                    case 3:
                        UserSingleton.setUser(null);
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
                        (curUser as Finance).manageSalary();
                        break;
                    case 2:
                        (curUser as Finance).manageInsurance();
                        break;
                    case 3:
                        UserSingleton.setUser(null);
                        break;
                    default:
                        console.log("\nInvalid Action\n");
                        break;
                }
                break;
            default:
                console.log("Invalid User !");
                break;
        }
    }
}