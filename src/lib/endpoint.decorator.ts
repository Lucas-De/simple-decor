import { Request, Response } from "express";
import { router } from "./lib";
import { HttpMethod } from "./types";
import { documentEndpoint } from "./docBuilder";
import "reflect-metadata";

export function Endpoint(httpMethod: HttpMethod, path: string): any {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    const returnType = Reflect.getMetadata(
      "controller:response-body",
      target,
      propertyKey
    );
    console.log({ returnType });
    documentEndpoint(httpMethod, path, returnType);

    router[httpMethod](path, descriptor.value);

    return descriptor;
  };
}
