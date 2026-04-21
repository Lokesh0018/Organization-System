export default class Employee {
    private employeeId:string;
    private name:string;
    private email:string;
    private assignedProjectId:string;

    constructor(employeeId:string,name:string,email:string,assignedProjectId:string) {
        this.employeeId = employeeId;
        this.name = name;
        this.email = email;
        this.assignedProjectId = assignedProjectId;
    }

    public getAssignedProjectId():string {
        return this.assignedProjectId;
    }

    public setAssignedProjectId(projectId:string):void {
        this.assignedProjectId = projectId;
    }
}