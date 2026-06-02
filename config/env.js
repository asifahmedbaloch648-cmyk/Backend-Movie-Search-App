import dotenv from "dotenv";
dotenv.config();

if (!process.env.OMDB_API_KEY || process.env.OMDB_API_KEY === "your_omdb_api_key_here") {
  console.error("❌  OMDB_API_KEY is missing in .env");
  process.exit(1);
}

export const config = {
  port: process.env.PORT || 5000,
  omdbApiKey: process.env.OMDB_API_KEY,
  omdbBase: "https://www.omdbapi.com",
};
