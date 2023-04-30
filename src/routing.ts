import "reflect-metadata";
import express from "express";

export const router = express.Router();

export function setup(app: express.Application) {
  app.use(router);
}
