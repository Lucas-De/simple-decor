export type HttpMethod =
  | "all"
  | "get"
  | "post"
  | "put"
  | "delete"
  | "patch"
  | "options"
  | "head";

export class Context {
  params: Record<string, string | number>;
  query: Record<string, unknown>;
  body: Record<string | number, unknown>;
}

export type ValidatorClass = { new (...args: any[]): any };

export type ControllerFunction = (req: Request) => Record<string, unknown>;
