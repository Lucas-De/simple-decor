import { ValidationError, validate } from "class-validator";
import { ValidatorClass } from "./types";
import { plainToClass } from "class-transformer";
import { Request } from "express";

export function Body(paramClass: ValidatorClass) {
  return function (
    _target: any,
    _propertyKey: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    const method = descriptor.value;
    descriptor.value = async (req: Request) => {
      const body = plainToClass(paramClass, req.body);
      const errors = await validate(body);
      if (errors.length == 0) method(req);
      else handleValidationErrors(errors);
    };

    return descriptor;
  };
}

function handleValidationErrors(errors: ValidationError[]) {
  const errorProps = errors.map((err) => err.property).join(", ");
  // throw new Error(`Invalid parameters: ${errorProps}`);
  console.log(`Invalid parameters: ${errorProps}`);
}
