import "reflect-metadata";
import { Endpoint } from "./lib/endpoint.decorator";
import { EmailParam, IntParam } from "./lib/param.decorator";
import { Request } from "express";

export default class PersonController {
  @Endpoint("post", "/stuff/:id/:user")
  @IntParam("id")
  @EmailParam("user")
  get(_request: Request) {
    return { name: "Lucas" };
  }
}
