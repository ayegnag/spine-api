// GET /api/anon/account
// POST /api/anon/account
// Route delegates only to handlers
import type { RouteHandler } from "../../../routing/route.types.js";

export const GET: RouteHandler = async (req, reply) => {
  return {
    userId: "12345",
    status: "anon account info",
  };
};

export const POST: RouteHandler  = async (req, res) => {
  // TODO: call account handler (create account)
  return {
    userId: req.auth.user?.id ?? null,
    requestId: req.requestId
  };
};
