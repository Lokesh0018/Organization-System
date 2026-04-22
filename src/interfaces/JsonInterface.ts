import User from "../models/User";
import { UserJson } from "../types/Types";

export default interface JsonInterface {
    readJson(path:string):any[];
    writeJson(path:string,data:User[]):void;
}