import * as fs from "fs";
import JsonInterface from "../interfaces/JsonInterface";

export default class JsonService implements JsonInterface {
    private static jsonService:JsonService;

    static getInstance():JsonService {
        if(!this.jsonService)
            this.jsonService = new JsonService();
        return this.jsonService;
    }

    readJson(path: string): any[] {
        const raw = fs.readFileSync(path,"utf-8");
        const data = JSON.parse(raw);
        return data;
    }

    writeJson(path: string, data: any[]): void {
        fs.writeFileSync(path,JSON.stringify(data,null,2));
    }

}