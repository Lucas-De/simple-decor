import { plainToClass } from "class-transformer";
import { Class } from "./types";
import { validate } from "class-validator";

export function guardIntegerString(
  str: string,
  name: string,
  location: string
) {
  const digitRegex = /^\d+$/;
  const isDigits = digitRegex.test(str);
  if (!isDigits)
    throw new Error(`Error in ${location}: ${name} must be an integer`);
}

export function guardEmailString(str: string, name: string, location: string) {
  const emailRegex = /.+@.+\..{2,4}/;
  const isEmail = emailRegex.test(str);
  if (!isEmail)
    throw new Error(`Error in ${location}: ${name} must be an email`);
}

export function guardEnumString(
  str: string,
  name: string,
  location: string,
  enumerator: Record<string | number, string>
) {
  const allowedValues = Object.values(enumerator);
  const isInEnum = allowedValues.some((val) => val == str);
  if (!isInEnum)
    throw new Error(
      `Error in ${location}: ${name} must be in [${Object.values(enumerator)}]`
    );
}

export function guardExistString(str: string, name: string, location: string) {
  const exist = str != null;
  if (!exist) throw new Error(`Error in ${location}: ${name} is missing`);
}

export async function guardObjecType(
  object: Record<string, unknown>,
  location: string,
  expectedClass: Class
) {
  const classedObject = plainToClass(expectedClass, object);
  const errors = await validate(classedObject);
  if (errors.length == 0) return;

  const errorProperties = errors.map((err) => err.property);
  throw new Error(
    `Error in ${location}: missing or invalid properties ${errorProperties} `
  );
}
