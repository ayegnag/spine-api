import type { FastifyInstance } from "fastify";
import { loadRoutes } from "./route-loader.js";
import type { RouteHandler } from "./route.types.js";

const HTTP_METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE"] as const;

export async function registerRoutes(
  app: FastifyInstance,
  apiDir: string
) {
  const routes = await loadRoutes(apiDir);

  for (const route of routes) {
    for (const method of HTTP_METHODS) {
      const handler = route.module[method] as RouteHandler | undefined;
      if (!handler) continue;

      app.route({
        method,
        url: route.url,
        handler
      });

      app.log.info(
        { method, url: route.url },
        "route registered"
      );
    }
  }
}
