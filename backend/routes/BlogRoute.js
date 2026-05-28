import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

router.get("/", (req, res) => {
  try {
    const filePath = path.join(__dirname, "..", "data", "blogs.json");
    const data = fs.readFileSync(filePath, "utf-8");
    const blogs = JSON.parse(data);
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Failed to load blogs" });
  }
});

export default router;