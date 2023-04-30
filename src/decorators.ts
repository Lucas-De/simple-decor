import { Request, Response } from "express";
import {
  guardIntegerString,
  guardEmailString,
  guardEnumString,
  guardObjecType,
  guardExistString,
} from "./util";
import { Class } from "./types";
import { router } from "./routing";

// Endpoint Registration Decorators

export function Get(path: string): any {
  return function (
    _target: any,
    _propertyKey: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    router.get(path, descriptor.value);
    return descriptor;
  };
}

export function Patch(path: string): any {
  return function (
    _target: any,
    _propertyKey: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    router.patch(path, descriptor.value);
    return descriptor;
  };
}

export function Post(path: string): any {
  return function (
    _target: any,
    _propertyKey: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    router.post(path, descriptor.value);
    return descriptor;
  };
}

export function Put(path: string): any {
  return function (
    _target: any,
    _propertyKey: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    router.put(path, descriptor.value);
    return descriptor;
  };
}

export function Delete(path: string): any {
  return function (
    _target: any,
    _propertyKey: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    router.delete(path, descriptor.value);
    return descriptor;
  };
}

// Path Parameter Validation Decorators

export function ParamExists(name: string) {
  return function (
    _target: any,
    _propertyKey: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    const method = descriptor.value;
    descriptor.value = async (req: Request, res: Response) => {
      guardExistString(req.params[name], name, "path param");
      return method(req, res);
    };
    return descriptor;
  };
}

export function ParamIsInt(name: string) {
  return function (
    _target: any,
    _propertyKey: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    const method = descriptor.value;
    descriptor.value = async (req: Request, res: Response) => {
      guardIntegerString(req.params[name], name, "path param");
      return method(req, res);
    };
    return descriptor;
  };
}

export function ParamIsEmail(name: string) {
  return function (
    _target: any,
    _propertyKey: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    const method = descriptor.value;
    descriptor.value = async (req: Request, res: Response) => {
      guardEmailString(req.params[name], name, "path param");
      return method(req, res);
    };
    return descriptor;
  };
}

export function ParamIsEnum(
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
      guardEnumString(req.params[name], name, "path param", enumerator);
      return method(req, res);
    };
    return descriptor;
  };
}

// Query Parameter Validation Decorators

export function QueryExists(name: string) {
  return function (
    _target: any,
    _propertyKey: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    const method = descriptor.value;
    descriptor.value = async (req: Request, res: Response) => {
      guardExistString(req.query[name] as string, name, "query param");
      return method(req, res);
    };
    return descriptor;
  };
}

export function QueryIsInt(name: string) {
  return function (
    _target: any,
    _propertyKey: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    const method = descriptor.value;
    descriptor.value = async (req: Request, res: Response) => {
      guardIntegerString(req.query[name] as string, name, "query param");
      return method(req, res);
    };
    return descriptor;
  };
}

export function QueryIsEmail(name: string) {
  return function (
    _target: any,
    _propertyKey: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    const method = descriptor.value;
    descriptor.value = async (req: Request, res: Response) => {
      guardEmailString(req.query[name] as string, name, "query param");
      return method(req, res);
    };
    return descriptor;
  };
}

export function QueryIsEnum(
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
      guardEnumString(
        req.query[name] as string,
        name,
        "query param",
        enumerator
      );
      return method(req, res);
    };
    return descriptor;
  };
}

// Request body validation decorators

export function BodyIsClass(bodyClass: Class) {
  return function (
    _target: any,
    _propertyKey: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    const method = descriptor.value;
    descriptor.value = async (req: Request, res: Response) => {
      guardObjecType(req.body, "request body", bodyClass);
      return method(req, res);
    };

    return descriptor;
  };
}
