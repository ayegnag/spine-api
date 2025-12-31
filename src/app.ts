// App initialization
// Load config, init logger, middleware, routes
import Fastify, { FastifyInstance } from "fastify";
import * as path from "node:path";
import { registerRoutes } from "./routing/register-routes.js";

export async function buildApp(): Promise<FastifyInstance> {
    const app = Fastify({
        logger: true
    });

    // --- Global middleware (placeholder) ---
    app.addHook("onRequest", async (req) => {
        app.log.info({ url: req.url }, "incoming request");
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

    const apiDir = path.resolve("src/api");
    await registerRoutes(app, apiDir);

    return app;
}
