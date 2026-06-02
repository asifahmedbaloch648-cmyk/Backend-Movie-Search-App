import express from "express";
import cors from "cors";
import { config } from "./config/env.js";
import movieRoutes from "./routes/movieRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => res.json({ status: "ok" }));
app.use("/api/movies", movieRoutes);

app.listen(config.port, () => {
  console.log(`🎬  Server running on http://localhost:${config.port}`);
});
