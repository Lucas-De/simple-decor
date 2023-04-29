import { Endpoint } from "./lib/endpoint.decorator";
import { EmailParam, IntParam, EnumParam } from "./lib/param.decorator";
import { Request, Response } from "express";
import { RequestBody } from "./lib/body.decorator";
import { Expose } from "class-transformer";
import { IsString } from "class-validator";

class Test {
  @Expose()
  @IsString()
  hello: string;
}

enum Status {
  Done = "done",
  Pending = "pending",
}
export default class PersonController {
  @Endpoint("post", "/stuff/:id/:user/:status")
  @IntParam("id")
  @EmailParam("user")
  @EnumParam("status", Status)
  @RequestBody(Test)
  get(req: Request, res: Response) {
    const body = req.body as Test;

    res.json({ name: "Lucas" });
  }
}
