import { Request } from "express";

export function IntParam(name: string) {
  return function (
    _target: any,
    _propertyKey: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    const method = descriptor.value;
    descriptor.value = async (req: Request, res: Response) => {
      const digitRegex = /^\d+$/;
      const isParamNumber = digitRegex.test(req.params[name]);
      if (isParamNumber) return method(req, res);
      else throw new Error(`Request parameter '${name}' must be a number`);
    };
    return descriptor;
  };
}

export function EmailParam(name: string) {
  return function (
    _target: any,
    _propertyKey: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    const method = descriptor.value;
    descriptor.value = async (req: Request, res: Response) => {
      const emailRegex = /.+@.+\..{2,4}/;
      const isParamEmail = emailRegex.test(req.params[name]);
      if (isParamEmail) return method(req, res);
      else throw new Error(`Request parameter '${name}' must be an email`);
    };
    return descriptor;
  };
}

export function EnumParam(
  name: string,
  enumerator: Record<string | number, string>
) {
  return function (
    _target: any,
    _propertyKey: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    const method = descriptor.value;
    descriptor.value = async (req: Request, res: Response) => {
      const allowedValues = Object.values(enumerator);
      const isInEnum = allowedValues.some((val) => val == req.params[name]);
      if (isInEnum) return method(req, res);
      throw new Error(
        `Parameter '${name}' must be in [${allowedValues.join(", ")}]`
      );
    };
    return descriptor;
  };
}
