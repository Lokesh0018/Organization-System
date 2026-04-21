export default class Finance {
    private employeeId:string;
    private salary:number;
    private insurance:number;

    constructor(employeeId:string,salary:number,insurance:number){
        this.employeeId = employeeId;
        this.salary = salary;
        this.insurance = insurance
    }

    public getEmployeeId():string {
        return this.employeeId;
    }

    public setEmployeeId(employeeId:string):void {
        this.employeeId = employeeId;
    }

    public getSalary():number {
        return this.salary;
    }

    public setSalary(salary:number):void {
        this.salary = salary;
    }

    public getInsurance():number {
        return this.insurance;
    }

    public setInsurance(insurance:number) {
        this.insurance = insurance;
    }
}