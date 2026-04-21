import User from "../models/User";

export default interface CsvInterface {
    readCSV(path:string):User | null;
    writeCSV(path:string):void;
}