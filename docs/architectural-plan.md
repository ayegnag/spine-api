## A. Spine-API - Architectural Overview

This framework follows a **Layered Modular Monolith Architecture** with strict boundaries enforced by convention and tooling.

┌──────────────────────────────────────────┐
│               API ROUTES                 │ ← File-based routing layer
│   (Filesystem → HTTP method resolution)  │
└──────────────────────────────────────────┘
                    ↓
┌──────────────────────────────────────────┐
│               HANDLERS                   │ ← Orchestration layer
│   (Validation, auth context, responses)  │
└──────────────────────────────────────────┘
                    ↓
┌──────────────────────────────────────────┐
│               SERVICES                   │ ← Business logic
│       (Pure, stateless, reusable)        │
└──────────────────────────────────────────┘
                    ↓
┌──────────────────────────────────────────┐
│         DOMAIN / INFRASTRUCTURE          │ ← DB, cache, queues, externals
└──────────────────────────────────────────┘
---

## B. Core Architectural Rules (Must-Enforce)

1. API routes **must not** contain business logic
    
2. Handlers **must not** access infrastructure directly
    
3. Services **must not** depend on HTTP concepts
    
4. Infrastructure **must not** import from handlers or routes
    
5. Cross-module access only via explicit exports
    
6. No circular dependencies
    

These rules should be enforced via:

- ESLint boundaries
    
- Folder-based lint rules
    
- CI checks
    

---

## C. Runtime Boot Sequence

1. Load environment variables
    
2. Validate configuration schema
    
3. Initialize logger
    
4. Initialize database connections
    
5. Initialize cache / Redis
    
6. Register middleware
    
7. Resolve filesystem-based routes
    
8. Generate OpenAPI bindings
    
9. Start HTTP server
    
10. Attach graceful shutdown hooks
    

---

## D. File-Based Routing Architecture

### Responsibilities

- Scan `src/api` directory at startup
    
- Map folder paths to URL paths
    
- Map filenames to dynamic route params
    
- Register HTTP methods dynamically
    

### Mapping Rules

|File Path|URL|
|---|---|
|api/account/index.ts|/api/account|
|api/account/id.ts|/api/account/:id|
|api/auth/user/profile.ts|/api/auth/user/profile|

### Route File Contract

export const GET: RouteHandler

export const POST: RouteHandler

Route files:

- Must only delegate to handlers
    
- Must declare route metadata (auth, cache, rate limits)
    

---

## E. Middleware Architecture

### Types of Middleware

1. Global middleware (always runs)
    
2. Route-level middleware
    
3. Conditional middleware (auth, cache)
    

### Execution Order

1. Request ID & logging
    
2. Security headers
    
3. Rate limiting
    
4. Authentication
    
5. Authorization
    
6. Cache lookup
    
7. Handler execution
    
8. Cache write
    
9. Response logging
    

---

## F. Authentication & Authorization Architecture

- Token parsing happens once per request
    
- Auth context injected into request scope
    
- Role & permission checks declarative
    

route.meta = {
	auth: "required",
	roles: ["admin"]
}

---

## G. Validation & Serialization

- All external inputs validated via schemas
    
- Validation occurs before handler execution
    
- Responses serialized via schema to avoid leaks
    

---

## H. Service Layer Architecture

### Characteristics

- Stateless
    
- Side-effect-free except via infrastructure ports
    
- Accept plain data objects
    
- Return domain objects or primitives
    

### Dependency Rule

Services depend on:

- Domain models
    
- Infrastructure interfaces (not implementations)
    

---

## I. Infrastructure Architecture

### Database

- Connection lifecycle owned by framework
    
- Repositories abstract DB access
    
- Transaction helper provided
    

### Cache

- Cache-aside pattern
    
- Namespaced keys
    
- TTL enforced centrally
    

### External Services

- Wrapped via adapters
    
- Retry and timeout policies built-in
    

---

## J. Error Architecture

- Base `AppError`
    
- Typed subclasses per domain
    
- HTTP mapping layer
    

throw new NotFoundError("Account")

---

## K. Observability Architecture

### Logging

- Structured logs only
    
- Correlation ID propagated
    

### Metrics

- Exposed `/metrics` endpoint
    
- Prometheus compatible
    

### Tracing

- OpenTelemetry hooks
    
- Span per request
    

---

## L. Configuration Architecture

- Central config loader
    
- Typed config object
    
- Immutable at runtime
    

---

## M. Testing Architecture

- Services tested in isolation
    
- Handlers tested with mocked services
    
- API tested end-to-end
    

---

## N. Code Generation & Automation

- Route scaffolding tool
    
- Schema-first workflow
    
- OpenAPI auto-sync
    

---

## O. CI/CD Expectations

- Linting must pass
    
- Tests must pass
    
- Route/OpenAPI mismatch fails build
    

---

## P. Agent Instructions (Important)

When building this project:

- Follow folder boundaries strictly
    
- Do not introduce cross-layer imports
    
- Prefer explicitness over abstraction
    
- Do not add magic runtime behavior
    
- Optimize for readability over cleverness
    

---

## Q. Deliverables for Initial Implementation

1. Core server bootstrap
    
2. File-based route resolver
    
3. Middleware engine
    
4. Auth module
    
5. Example API module
    
6. OpenAPI integration
    

---

## R. Definition of Done

- Single example service fully working
    
- Routes resolved from filesystem
    
- Auth + validation enforced
    
- OpenAPI generated
    
- Tests passing
    

---

## S. Long-Term Maintainability Guidelines

- One responsibility per file
    
- Explicit dependency direction
    
- Avoid global state
    
- Document decisions in ADRs