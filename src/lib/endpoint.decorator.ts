import { Request, Response } from "express";
import { router } from "./lib";
import { HttpMethod } from "./types";

export function Endpoint(httpMethod: HttpMethod, endpoint: string): any {
  return function (
    _target: any,
    _propertyKey: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    router[httpMethod](endpoint, async (req: Request, res: Response) => {
      const response = await descriptor.value(req);
      res.json(response);
    });

    return descriptor;
  };
}
