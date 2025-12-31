import type { FastifyRequest, FastifyReply } from "fastify";
import type { RouteMeta } from "../routing/route.types.js";

export interface MiddlewareContext {
  req: FastifyRequest;
  reply: FastifyReply;
  routeMeta?: RouteMeta;
}

export type MiddlewareFn = (
  ctx: MiddlewareContext,
  next: () => Promise<void>
) => Promise<void>;
