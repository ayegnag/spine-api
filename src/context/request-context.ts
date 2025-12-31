import type { AuthContext } from "../security/auth.types.js";

export interface RequestContext {
  auth: AuthContext;
  requestId: string;
}
