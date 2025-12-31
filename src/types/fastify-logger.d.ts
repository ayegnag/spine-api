import type { FastifyBaseLogger } from "fastify";

declare module "fastify" {
  interface FastifyBaseLogger {
    info: (...args: any[]) => void;
    error: (...args: any[]) => void;
    warn: (...args: any[]) => void;
    debug: (...args: any[]) => void;
  }
}
