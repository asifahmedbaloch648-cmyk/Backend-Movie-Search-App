import axios from "axios";
import { config } from "../config/env.js";

const omdb = (params) =>
  axios.get(config.omdbBase, { params: { apikey: config.omdbApiKey, ...params } });

export const searchMovies = async (req, res) => {
  const { query, page = 1 } = req.query;

  if (!query || !query.trim()) {
    return res.status(400).json({ message: "Query parameter is required." });
  }

  try {
    const { data } = await omdb({ s: query.trim(), page });
    if (data.Response === "False") {
      return res.status(200).json({ Response: "False", Error: data.Error, Search: [], totalResults: "0" });
    }
    res.json(data);
  } catch (err) {
    console.error("Search error:", err.response?.data || err.message);
    res.status(500).json({ message: "Failed to fetch movies.", error: err.response?.data || err.message });
  }
};

export const getMovieDetails = async (req, res) => {
  const { id } = req.params;

  if (!id || !/^tt\d+$/.test(id)) {
    return res.status(400).json({ message: "Invalid IMDb ID." });
  }

  try {
    const { data } = await omdb({ i: id, plot: "full" });
    if (data.Response === "False") {
      return res.status(404).json({ message: data.Error });
    }
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch movie details.", error: err.message });
  }
};
