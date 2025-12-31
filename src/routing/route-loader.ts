import * as fs from "node:fs";
import * as path from "node:path";
import { pathToFileURL } from "node:url";
import type { RouteModule } from "./route.types.js";

export interface LoadedRoute {
  url: string;
  filePath: string;
  module: RouteModule;
}

/**
 * Converts filesystem path → URL
 * api/account/id.ts → /api/account/:id
 */
function filePathToUrl(apiRoot: string, filePath: string): string {
  const relative = path
    .relative(apiRoot, filePath)
    .replace(/\\/g, "/")
    .replace(/\.ts$/, "");

  const segments = relative.split("/").map(seg =>
    seg === "index" ? "" : seg === "id" ? ":id" : seg
  );

  return "/api/" + segments.filter(Boolean).join("/");
}

function walk(dir: string, acc: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(fullPath, acc);
    else if (entry.isFile() && entry.name.endsWith(".ts")) acc.push(fullPath);
  }
  return acc;
}

export async function loadRoutes(apiDir: string): Promise<LoadedRoute[]> {
  const files = walk(apiDir);
  const routes: LoadedRoute[] = [];

  for (const file of files) {
    const url = filePathToUrl(apiDir, file);
    const module = (await import(pathToFileURL(file).href)) as RouteModule;

    routes.push({
      url,
      filePath: file,
      module
    });
  }

  return routes;
}
