import type { MiddlewareFn, MiddlewareContext } from "./middleware.types.js";

export function composeMiddleware(
  middleware: MiddlewareFn[]
): (ctx: MiddlewareContext) => Promise<void> {
  return async function run(ctx) {
    let index = -1;

    async function dispatch(i: number): Promise<void> {
      if (i <= index) {
        throw new Error("next() called multiple times");
      }
      index = i;

      const fn = middleware[i];
      if (!fn) return;

      await fn(ctx, () => dispatch(i + 1));
    }

    await dispatch(0);
  };
}
