import { ValidationError, validate } from "class-validator";
import { Class } from "./types";
import { plainToClass } from "class-transformer";
import { Request, Response } from "express";

export function RequestBody(requestBodyClass: Class) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    Reflect.defineMetadata(
      "controller:response-body",
      requestBodyClass,
      target,
      propertyKey
    );

    const method = descriptor.value;
    descriptor.value = async (req: Request, res: Response) => {
      const body = plainToClass(requestBodyClass, req.body);
      const errors = await validate(body);
      if (errors.length == 0) return method(req, res);
      handleValidationErrors(errors);
    };

    return descriptor;
  };
}

function handleValidationErrors(errors: ValidationError[]) {
  const errorProperties = errors.map((err) => err.property).join(", ");
  throw new Error(`Invalid properties in body: ${errorProperties}`);
}
