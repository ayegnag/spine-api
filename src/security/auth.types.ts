export interface AuthUser {
  id: string;
  roles: string[];
}

export interface AuthContext {
  user: AuthUser | null;
  isAuthenticated: boolean;
}
