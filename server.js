import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

import { logger, logEvents } from "./middleware/logEvents.js";
import { errorHandler } from "./middleware/errorHandler.js";
import rootRoutes from "./routes/root.js";
import employeesRoutes from "./routes/api/employees.js";
import registerRoute from "./routes/register.js";
import authRoute from "./routes/auth.js";

import { corsOptions } from "./config/corsOptions.js";

const app = express();
const PORT = process.env.PORT || 3500;

// custom middleware
app.use(logger);

// Cross Origin Resource Sharing

app.use(cors(corsOptions));

// Get the directory name of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

//routes for static files
app.use("/", express.static(path.join(__dirname, "/public")));

//routes
app.use("/", rootRoutes);
app.use("/register", registerRoute);
app.use("/auth", authRoute);
app.use("/employees", employeesRoutes);

// Handles HTTP 404 Not Found errors
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "..", "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

//Custom middleware for error handling
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
