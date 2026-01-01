// GET /api/anon/account/:id
import type { RouteHandler } from "../../../routing/route.types.js";

export const GET: RouteHandler = async (req, reply) => {
  const { id } = req.params as { id: string };

  return {
    accountId: id,
    status: "anon account info",
  };
};