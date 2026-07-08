import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini client (securely on the server-side)
  const apiKey = process.env.GEMINI_API_KEY;
  const ai = new GoogleGenAI({
    apiKey: apiKey || "",
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // AI Game Design Mentor endpoint
  app.post("/api/gemini/mentor", async (req, res) => {
    try {
      if (!apiKey) {
        return res.status(400).json({ 
          error: "کلید API برای مدل هوش مصنوعی در سرور تنظیم نشده است. لطفاً آن را در بخش تنظیمات (Secrets) وارد کنید." 
        });
      }

      const { theme, genre, platform, constraints } = req.body;

      if (!theme) {
        return res.status(400).json({ error: "لطفاً تم یا موضوع بازی را وارد کنید." });
      }

      const prompt = `یک طرح ایده منسجم و نوآورانه برای ساخت بازی در ماراتن ۴۸ ساعته گیم جم با مشخصات زیر طراحی کن:
- تم / موضوع رویداد: ${theme}
- سبک بازی: ${genre || "آزاد"}
- پلتفرم هدف: ${platform || "آزاد"}
- محدودیت‌های چالش‌برانگیز انتخابی: ${constraints || "ندارد"}

لطفاً اطلاعات را به صورت کامل و به زبان فارسی و با ادبیاتی الهام‌بخش، هنری و حرفه‌ای در قالب فیلدهای ساختاریافته مشخص شده پاسخ بده.`;

      const modelsToTry = ["gemini-3.5-flash", "gemini-flash-latest", "gemini-3.1-flash-lite"];
      let lastError: any = null;
      let response = null;

      for (const modelName of modelsToTry) {
        try {
          console.log(`Trying model: ${modelName}`);
          response = await ai.models.generateContent({
            model: modelName,
            contents: prompt,
            config: {
              systemInstruction: "You are an expert game design mentor for the Global Game Jam (مربی و رهنما بازی‌سازی ماراتن گیم جم). Your goal is to help game jammers brainstorm exceptionally creative, innovative, and scoped game concepts that can be built in 48 hours. Provide answers ONLY in Persian language. Ensure the game concept directly solves the constraint and fits the 48-hour development scope perfectly.",
              responseMimeType: "application/json",
              responseSchema: {
                type: Type.OBJECT,
                properties: {
                  title: {
                    type: Type.STRING,
                    description: "Proposed catchy and artistic game title in Persian"
                  },
                  concept: {
                    type: Type.STRING,
                    description: "Core concept and story hook of the game in Persian (مفهوم اصلی)"
                  },
                  mechanics: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "List of core gameplay mechanics suitable for 48 hour development (مکانیک‌های گیم‌پلی)"
                  },
                  creativeTwist: {
                    type: Type.STRING,
                    description: "The unique creative twist of the game concept that makes it stand out (پیچش خلاقانه)"
                  },
                  artStyle: {
                    type: Type.STRING,
                    description: "Suggested aesthetic and visual art style suitable for 48 hours (سبک هنری پیشنهادی)"
                  },
                  tips: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "Gold tips for development speed & scope management specifically for this concept (نکات طلایی توسعه)"
                  }
                },
                required: ["title", "concept", "mechanics", "creativeTwist", "artStyle", "tips"]
              }
            }
          });
          if (response && response.text) {
            console.log(`Successfully generated content using model: ${modelName}`);
            break;
          }
        } catch (err: any) {
          console.warn(`Model ${modelName} failed:`, err.message || err);
          lastError = err;
        }
      }

      if (!response) {
        throw lastError || new Error("تمامی تلاش‌ها برای برقراری ارتباط با مدل‌های هوش مصنوعی شکست خورد.");
      }

      const responseText = response.text;
      if (!responseText) {
        throw new Error("پاسخی از مدل دریافت نشد.");
      }

      const parsedGdd = JSON.parse(responseText.trim());
      return res.json(parsedGdd);
    } catch (err: any) {
      console.error("Gemini API Error:", err);
      return res.status(500).json({ 
        error: "خطایی در برقراری ارتباط با دستیار هوشمند رخ داد: " + (err.message || err)
      });
    }
  });

  // Serve SEO files explicitly
  app.get('/robots.txt', (req, res) => {
    res.sendFile(path.join(process.cwd(), process.env.NODE_ENV === "production" ? 'dist' : 'public', 'robots.txt'));
  });
  app.get('/sitemap.xml', (req, res) => {
    res.sendFile(path.join(process.cwd(), process.env.NODE_ENV === "production" ? 'dist' : 'public', 'sitemap.xml'));
  });

  // Serve static files or setup Vite in dev mode
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
