import promptSync from "prompt-sync";
import LoginService from "./services/LoginService";
import { UserJson } from "./types/Types";

let curUser: UserJson | null = null;
const prompt = promptSync();

while (true) {
    if (!curUser) {
        console.log("\n1. Login\n2. Exit");
        const choice: number = parseInt(prompt("Enter Choice: "));
        switch (choice) {
            case 1:
                const email = prompt("Enter Email: ");
                const pass = prompt("Enter Password: ");
                curUser = LoginService.verifyLogin(email, pass);
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
                actions = ["Create Employee","View Employee","Update Employee","Delete Employee","Assign Roles","Create Project","Assign Project to Employees","Assign Clients","Create Tasks","View Project","Update Tasks","View Own Tasks","Track Project Progress","Manage Salaries","Manage Insurance","Logout"];
                actions.forEach((a,i) => console.log(`${i+1}. ${a}`));
                console.log();
                const adminAction = parseInt(prompt("Enter Action: "));
                if(adminAction===16)
                    curUser = null;
                break;
            case "HR":
                actions = ["Create Employee","View Employee","Update Employee","Logout"];
                actions.forEach((a,i) => console.log(`${i+1}. ${a}`));
                console.log();
                const hrAction = parseInt(prompt("Enter Action: "));
                if(hrAction===4)
                    curUser = null;
                break;
            case "PM":
                actions = ["View Employee","Create Project","Assign Project to Employees","Assign Clients","Create Tasks","View Project","Update Tasks","View Own Tasks","Track Project Progress","Logout"];
                actions.forEach((a,i) => console.log(`${i+1}. ${a}`));
                console.log();
                const pmAction = parseInt(prompt("Enter Action: "));
                if(pmAction===10)
                    curUser = null;
                break;
            case "EMPLOYEE":
                actions = ["View Project","Update Tasks","View Own Tasks","Track Project Progress","Logout"];
                actions.forEach((a,i) => console.log(`${i+1}. ${a}`));
                console.log();
                const employeeAction = parseInt(prompt("Enter Action: "));
                if(employeeAction===5)
                    curUser = null;
                break;
            case "CLIENT":
                actions = ["View Project","Track Project Progress","Logout"];
                actions.forEach((a,i) => console.log(`${i+1}. ${a}`));
                console.log();
                const clientAction = parseInt(prompt("Enter Action: "));
                if(clientAction===3)
                    curUser = null;
                break;
            case "FINANCE":
                actions = ["Manage Salaries","Manage Insurance","Logout"];
                actions.forEach((a,i) => console.log(`${i+1}. ${a}`));
                console.log();
                const financeAction = parseInt(prompt("Enter Action: "));
                if(financeAction===3)
                    curUser = null;
                break;
        }
    }
}