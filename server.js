import express from "express";

process.loadEnvFile();

const app = express();
const PORT = 3000;

app.use(express.static("public"));

app.get("/api/background", async (req, res) => {
  try {
    const response = await fetch(
      `${process.env.UNSPLASH_URL}&client_id=${process.env.UNSPLASH_ACCESS_KEY}`
    );

    if (!response.ok) {
      throw new Error("Error en la petición a Unsplash");
    }

    const data = await response.json();
    res.json({ url: data.urls.regular });
  } catch (error) {
    console.error("Error al obtener la imagen:", error.message);
    res.status(500).json({ error: "No se pudo obtener la imagen" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
