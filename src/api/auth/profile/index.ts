// GET /api/auth/profile
// Requires authentication
import type { RouteMeta } from "../../../routing/route.types.js";

export const meta: RouteMeta = {
  auth: "required"
};

export const GET = async (req, reply) => {
  const auth = (req as any).auth;

  return {
    userId: auth.user.id
  };
};
