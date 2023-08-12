require("dotenv").config(); // Load .env file.
import cors from "cors"; // Limit server access.
import express from "express";
import loanerController from "./6-controllers/loaners-controller";
import appConfig from "./2-utils/app-config";
import verbose from "./4-middleware/verbose";
import doorman from "./4-middleware/doorman";
import catchAll from "./4-middleware/catch-all";
import routeNotFound from "./4-middleware/route-not-found";
import expressRateLimit from "express-rate-limit"; // Secured from DOS attack.

// Create server:
const server = express();

// Rate limit:
server.use(expressRateLimit({
    windowMs: 1000, // Time window
    max: 20 // Max request limit on that time window.
}));

// Enable cors (for the frontend):
server.use(cors({ origin: appConfig.origin })); // * Needs "real time" browser testing.

// Support request.body as JSON:
server.use(express.json());

// Connect middleware:
server.use(verbose);
server.use(doorman);

// Route shortcut (for the controllers):
server.use("/api", loanerController);

// Route not found:
server.use("*", routeNotFound);

// Catch all middleware:
server.use(catchAll);

// Upload server:
server.listen(appConfig.port, () => console.log("Listening on port: " + appConfig.port));