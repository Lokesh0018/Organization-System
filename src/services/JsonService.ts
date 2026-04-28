import * as fs from "fs";
import JsonInterface from "../interfaces/JsonInterface";
import { JsonTypes } from "../types/Types";

export default class JsonService implements JsonInterface {
    private static jsonService:JsonService;

    static getInstance():JsonService {
        if(!this.jsonService)
            this.jsonService = new JsonService();
        return this.jsonService;
    }

    readJson(path: string): JsonTypes[]{
        const raw = fs.readFileSync(path,"utf-8");
        const data = JSON.parse(raw);
        return data;
    }

    writeJson(path: string, data: JsonTypes[]): void {
        fs.writeFileSync(path,JSON.stringify(data,null,2));
    }

}