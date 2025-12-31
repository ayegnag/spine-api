// App initialization
// Load config, init logger, middleware, routes
import Fastify, { FastifyInstance } from "fastify";

export async function buildApp(): Promise<FastifyInstance> {
  const app = Fastify({
    logger: true
  });

  // --- Global middleware (placeholder) ---
  app.addHook("onRequest", async (req) => {
    req.log.info({ url: req.url }, "incoming request");
  });

  // --- Temporary test route (will be replaced by FS router) ---
  app.get("/health", async () => {
    return { status: "ok" };
  });

  // TODO (next):
  // - load config
  // - init logger
  // - init infra (db, redis)
  // - resolve filesystem routes
  // - register middleware chain
  // - attach graceful shutdown hooks

  return app;
}
