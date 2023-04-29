import { Request, Response } from "express";
import { router } from "./lib";
import { HttpMethod, Context } from "./types";

export function Endpoint(httpMethod: HttpMethod, endpoint: string): any {
  return function (
    _target: any,
    _propertyKey: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    const requestHandler = requestHandlerFactory(descriptor.value);
    router[httpMethod](endpoint, requestHandler);

    return descriptor;
  };
}

function requestHandlerFactory(
  func: (context: Context) => Record<string, unknown>
) {
  return async function (req: Request, res: Response) {
    const response = func({
      body: req.body,
      params: req.params,
      query: req.query,
    });
    res.json(response);
  };
}
