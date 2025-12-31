import type { FastifyInstance } from "fastify";
import { loadRoutes } from "./route-loader.js";
import type { RouteHandler } from "./route.types.js";
import { composeMiddleware } from "../middleware/middleware-engine.js";
import { globalMiddleware } from "../middleware/global.middleware.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

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


      const runMiddleware = composeMiddleware([
        ...globalMiddleware,  // Global middleware
        authMiddleware, // Auth middleware
        async ({ req, reply }) => { // Final route handler
          await handler(req, reply);
        }
      ]);


      app.route({
        method,
        url: route.url,
        handler: async (req, reply) => {
          await runMiddleware({
            req,
            reply,
            routeMeta: route.module.meta
          });
        }
      });

      app.log.info({ method, url: route.url }, "route registered");
    }
  }
}
