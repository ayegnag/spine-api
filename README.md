# spine-api

**spine-api** is an opinionated Node.js framework for building secure, scalable modular monolith APIs with clarity and discipline.

It uses **filesystem-based routing**, explicit architectural layers, and **secure-by-default** conventions to help teams build complex backends without microservice overhead or architectural drift.

At its core, spine-api enforces a clean separation between routes, handlers, services, and infrastructure, acting as the structural backbone of your API, the spine that everything else builds upon.

Key ideas:
+ Path-based routing that mirrors your filesystem
+ Thin route files, orchestration-only handlers, pure service logic
+ Built-in security, validation, caching, and observability
+ OpenAPI-first documentation with Swagger support
+ Designed for long-lived codebases and serious backend work