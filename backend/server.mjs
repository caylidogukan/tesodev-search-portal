import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cors());

// POST endpoint to handle URL shortening
app.post("/shorten-url", async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "No URL provided" });
  }

  try {
    const response = await fetch(
      `https://ulvis.net/API/write/get?url=${encodeURIComponent(
        url
      )}&private=1&format=json`
    );

    const data = await response.json();

    // check if the response is valid and contains the url
    if (data.success && data.data && data.data.url) {
      return res.json({ shortenedUrl: data.data.url });
    } else {
      throw new Error("Invalid response from ulvis.net");
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
