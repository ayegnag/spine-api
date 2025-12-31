import type { FastifyRequest, FastifyReply } from "fastify";
import type { RouteMeta } from "../routing/route.types.js";
import type { AuthContext } from "../security/auth.types.js";


export interface MiddlewareContext {
  req: FastifyRequest;
  reply: FastifyReply;
  routeMeta?: RouteMeta;

  // mutable per-request state
  auth?: AuthContext;
}

export type MiddlewareFn = (
  ctx: MiddlewareContext,
  next: () => Promise<void>
) => Promise<void>;
