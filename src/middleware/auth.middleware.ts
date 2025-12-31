// Authentication middleware
import type { MiddlewareFn } from "./middleware.types.js";
import type { AuthContext } from "../security/auth.types.js";

/**
 * TEMP token parser.
 * Later this will move to security/token.ts
 */
function parseAuthToken(authHeader?: string): AuthContext {
  if (!authHeader) {
    return { user: null, isAuthenticated: false };
  }

  // Placeholder logic
  // e.g. "Bearer user-123"
  const token = authHeader.replace("Bearer ", "");

  if (!token) {
    return { user: null, isAuthenticated: false };
  }

  return {
    user: {
      id: token,
      roles: ["user"]
    },
    isAuthenticated: true
  };
}

export const authMiddleware: MiddlewareFn = async (
  { req, reply, routeMeta, auth },
  next
) => {
  const authRequirement = routeMeta?.auth ?? "none";

  const parsedAuth = parseAuthToken(req.headers.authorization);
  auth = parsedAuth;

  // Attach to request for downstream usage
  (req as any).auth = parsedAuth;

  if (authRequirement === "required" && !parsedAuth.isAuthenticated) {
    reply.code(401).send({
      code: "UNAUTHORIZED",
      message: "Authentication required"
    });
    return;
  }

  if (
    parsedAuth.isAuthenticated &&
    routeMeta?.roles &&
    !routeMeta.roles.some(r => parsedAuth.user?.roles.includes(r))
  ) {
    reply.code(403).send({
      code: "FORBIDDEN",
      message: "Insufficient permissions"
    });
    return;
  }

  await next();
};
