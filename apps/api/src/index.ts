import "dotenv/config";
import { Hono } from "hono";
import { CONSTANT } from "@repo/constants";
import health from "./api/v1/health.js";

const app = new Hono();

// Root endpoint
app.get("/", (c) => {
  return c.text(CONSTANT);
});

// API v1 routes
const v1 = new Hono();
v1.route("/health", health);

app.route("/api/v1", v1);

export default app;
