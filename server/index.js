import express from "express";
import cors from "cors";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const employees = fs
  .readFileSync(
    path.join(path.dirname(fileURLToPath(import.meta.url)), "employees.json")
  )
  .toString("utf-8");

const app = express();
const port = process.env.PORT || 9000;

app.get("/employees", cors(), (_, res) => {
  res.send(JSON.parse(employees));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
