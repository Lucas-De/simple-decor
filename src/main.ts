import express from "express";
import "./person.controller";
import { setup } from "./lib/lib";

const app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
setup(app);

app.listen(3000);
