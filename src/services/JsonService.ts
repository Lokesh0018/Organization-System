import * as fs from "fs";
import JsonInterface from "../interfaces/JsonInterface";
import users from "../data/users.json";
import User from "../models/User";
import { UserJson } from "../types/Types";

export default class JsonService implements JsonInterface {

    readJson(path: string): UserJson[] {
        const raw = fs.readFileSync(path,"utf-8");
        const data: UserJson[] = JSON.parse(raw);
        return data;
    }

    writeJson(path: string, data: User[]): void {
        fs.writeFileSync(path,JSON.stringify(data,null,2));
    }

}