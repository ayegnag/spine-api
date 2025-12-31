import "fastify";
import type { AuthContext } from "../security/auth.types.js";

declare module "fastify" {
  interface FastifyRequest {
    auth: AuthContext;
    requestId: string;
  }
}
