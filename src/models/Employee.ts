export default class Employee {
    private id:string;
    private name:string;
    private email:string;
    private assignedProjectId:string;

    constructor(id:string,name:string,email:string,assignedProjectId:string) {
        this.id = id;
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