import type { FastifyRequest, FastifyReply } from "fastify";

/**
 * HTTP handler exported by route files
 * (GET, POST, PUT, DELETE, etc.)
 */
export type RouteHandler = (
  req: FastifyRequest,
  reply: FastifyReply
) => Promise<unknown>;

/**
 * Optional route-level metadata
 * (auth, cache, rate limits, roles)
 */
export interface RouteMeta {
  auth?: "required" | "optional" | "none";
  roles?: string[];
  cache?: {
    ttlSeconds: number;
  };
}

/**
 * Shape every route module may export
 */
export type RouteModule = {
  meta?: RouteMeta;
  GET?: RouteHandler;
  POST?: RouteHandler;
  PUT?: RouteHandler;
  PATCH?: RouteHandler;
  DELETE?: RouteHandler;
};
