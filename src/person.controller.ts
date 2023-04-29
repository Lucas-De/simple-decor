import "reflect-metadata";
import { Endpoint } from "./lib/decorators";
import { Context } from "./lib/types";

export default class PersonController {
  @Endpoint("post", "/person")
  get({ params, query, body }: Context) {
    return { name: "Lucas", params, query, body };
  }
}
