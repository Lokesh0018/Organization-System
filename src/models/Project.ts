export default class Project {
    private projectId: string;
    private projectName: string;
    private managerId:string;
    private employeeId:string;
    private clientId:string;

    constructor(projectId:string, projectName:string, managerId:string,employeeId:string,clientId:string) {
        this.projectId = projectId;
        this.projectName = projectName;
        this.managerId = managerId;
        this.employeeId = employeeId;
        this.clientId = clientId;
    }

    public getProjectId(): string {
        return this.projectId;
    }

    public setProjectId(projectId: string):void {
        this.projectId = projectId;
    }

    public getProjectName():string {
        return this.projectName;
    }

    public setProjectName(projectName:string):void {
        this.projectName = projectName;
    }

    public getManagerId():string {
        return this.managerId;
    }

    public setManagerId(managerId:string):void {
        this.managerId = managerId;
    }

    public getEmployeeId():string {
        return this.employeeId;
    }

    public setEmployeeId(employeeId:string):void {
        this.employeeId = employeeId;
    }

    public getClientId():string {
        return this.clientId;
    }

    public setClientId(clientId:string):void {
        this.clientId = clientId
    }
}