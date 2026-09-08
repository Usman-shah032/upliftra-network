import { createBackendApp } from "./app.js";
import { config } from "./config/env.js";

const app = createBackendApp();
const isProd = process.env.NODE_ENV === "production";
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : (isProd ? 3000 : 5000);

app.listen(port, "0.0.0.0", () => {
  console.log(`[Upliftra Network] Server listening on http://0.0.0.0:${port} (${isProd ? "Production Unified Mode" : "Development API Mode"})`);
  console.log(`[Upliftra Network] Health check: http://0.0.0.0:${port}/api/health`);
});

