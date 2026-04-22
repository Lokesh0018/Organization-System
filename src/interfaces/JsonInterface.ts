import User from "../models/User";

export default interface JsonInterface {
    readJson(path:string):any[];
    writeJson(path:string,data:User[]):void;
}