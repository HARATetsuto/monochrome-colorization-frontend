import express from "express";
import type { Express } from "express";
import cors from "cors";
import multer from "multer"
import * as dotenv from "dotenv";

const app: Express = express();
dotenv.config();
const upload = multer();
const port = 3000;
app.use(cors());

app.get("/", (req: express.Request, res: express.Response) => {
  res.send({
    "returnText": "Hello world",
  });
});

app.post("/", upload.single("file"), async (req: express.Request, res: express.Response) => {
  const file: any = req?.file;
  if (!file) {
    return res.status(400).json({ ok: false, error: "No file" });
  }

  const FAST_API_URL = process.env?.FAST_API_URL + "api/colorize";
  if (!FAST_API_URL) {
    return res.status(400).json({ ok: false, error: "No API URL" });
  }

  const form = new FormData();
  const blob = new Blob([file.buffer]);
  form.append("file", blob, file.originalname);
  try {
    const apiRes = await fetch(FAST_API_URL, {
      method: "POST",
      body: form,
    });
    
    const arrayBuffer = await apiRes.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const contentType = apiRes.headers.get("content-type") || "application/octet-stream";

    res
      .status(apiRes.status)
      .setHeader("Content-Type", contentType)
      .send(buffer);
  } catch (e) {
    console.error(e);
  }
});

app.listen(port, "127.0.0.1", () => {
  console.log(`Listening on port ${port}`);
});