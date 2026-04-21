import CsvInterface from "../interfaces/CsvInterface";
import * as fs from "fs";
import User from "../models/User";

export default class CsvService implements CsvInterface {

    readCSV(path:string): any[] | null {
        const data = fs.readFileSync(path,"utf-8");
        const lines = data.trim().split("\n");
        const headers = lines[0]?.split(",").map(h => h.trim());
        const res:User[] = [];

        for(let i=2;i<lines.length;i++){
            const obj = {};
            const values = lines[i]?.split(",");
            headers?.forEach((val,idx) => {
                obj[val] = values[idx];
            }); 
            res.push(obj);
        }

        return res;
    }

    writeCSV(path: string): void {
        
    }
}