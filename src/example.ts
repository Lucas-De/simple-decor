import express from "express";
import { setup } from "./lib";
import {
  BodyIsClass,
  ParamIsEmail,
  ParamIsInt,
  Post,
  QueryIsEmail,
  QueryIsEnum,
} from "./decorators";
import { Request, Response } from "express";
import { Expose } from "class-transformer";
import { IsString } from "class-validator";

const app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded\
app.listen(3000);
setup(app);

class Test {
  @Expose()
  @IsString()
  hello: string;
}

enum Status {
  Done = "done",
  Pending = "pending",
}

class PersonController {
  @Post("/stuff/:id")
  @ParamIsInt("id")
  @QueryIsEmail("email")
  get(req: Request, res: Response) {
    // const body = req.body as Test;

    res.json({ name: "Lucas" });
  }
}

PersonController;
