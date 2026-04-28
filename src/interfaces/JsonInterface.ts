import { JsonTypes } from "../types/Types";

export default interface JsonInterface {
    readJson(path:string):JsonTypes[];
    writeJson(path:string,data:JsonTypes[]):void;
}