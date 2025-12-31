// GET /api/auth/profile
// Requires authentication
import type { RouteMeta } from "../../../routing/route.types.js";
import type { RouteHandler } from "../../../routing/route.types.js";

export const meta: RouteMeta = {
  auth: "required"
};

export const GET: RouteHandler = async (req, reply) => {
  return {
    userId: req.auth.user?.id ?? null,
    requestId: req.requestId
  };
};
