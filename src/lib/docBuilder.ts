import { Class, HttpMethod } from "./types";
import _ from "lodash";

const documentation = { paths: {} };

export function documentEndpoint(
  httpMethod: HttpMethod,
  path: string,
  responseBodyClass: Class
) {
  _.set(documentation.paths, [path, httpMethod], "hello!!!");
  console.log({ documentation });
}
