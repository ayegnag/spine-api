import type { MiddlewareFn } from "./middleware.types.js";

/**
 * Runs for every request
 */
export const requestLoggingMiddleware: MiddlewareFn = async (
  { req },
  next
) => {
  req.log.info(
    { method: req.method, url: req.url },
    "request start"
  );

  await next();
};

export const responseLoggingMiddleware: MiddlewareFn = async (
  { reply, req },
  next
) => {
  await next();

  req.log.info(
    { statusCode: reply.statusCode },
    "request complete"
  );
};

export const globalMiddleware: MiddlewareFn[] = [
  requestLoggingMiddleware,
  responseLoggingMiddleware
];
