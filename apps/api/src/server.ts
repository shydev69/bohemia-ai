import "dotenv/config";
import { serve } from "@hono/node-server";
import app from "./index.js";

const port = parseInt(process.env.PORT || "8080", 10);

console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
