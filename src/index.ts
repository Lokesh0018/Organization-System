import CsvService from "./services/CsvService";

const c = new CsvService();
console.log(c.readCSV("D:/organization-system/src/data/users.csv"));