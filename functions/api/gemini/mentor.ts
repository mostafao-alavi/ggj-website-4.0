interface Env {
  GEMINI_API_KEY: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const apiKey = context.env.GEMINI_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ 
          error: "کلید API برای مدل هوش مصنوعی (GEMINI_API_KEY) در بخش Environment Variables کلودفلر تعریف نشده است." 
        }),
        { 
          status: 400,
          headers: { "Content-Type": "application/json;charset=UTF-8" } 
        }
      );
    }

    const body: any = await context.request.json();
    const { theme, genre, platform, constraints } = body;

    if (!theme) {
      return new Response(
        JSON.stringify({ error: "لطفاً ابتدا تم یا موضوع بازی را وارد کنید." }),
        { 
          status: 400, 
          headers: { "Content-Type": "application/json;charset=UTF-8" } 
        }
      );
    }

    const prompt = `یک طرح ایده منسجم و نوآورانه برای ساخت بازی در ماراتن ۴۸ ساعته گیم جم با مشخصات زیر طراحی کن:
- تم / موضوع رویداد: ${theme}
- سبک بازی: ${genre || "آزاد"}
- پلتفرم هدف: ${platform || "آزاد"}
- محدودیت‌های چالش‌برانگیز انتخابی: ${constraints || "ندارد"}

لطفاً اطلاعات را به صورت کامل و به زبان فارسی و با ادبیاتی الهام‌بخش، هنری و حرفه‌ای در قالب فیلدهای ساختاریافته مشخص شده پاسخ بده.`;

    // Edge-native fetch to Google Gemini API
    const modelName = "gemini-2.5-flash"; // Highly reliable for global deployment
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

    const systemInstruction = "You are an expert game design mentor for the Global Game Jam (مربی و رهنما بازی‌سازی ماراتن گیم جم). Your goal is to help game jammers brainstorm exceptionally creative, innovative, and scoped game concepts that can be built in 48 hours. Provide answers ONLY in Persian language. Ensure the game concept directly solves the constraint and fits the 48-hour development scope perfectly.";

    const payload = {
      contents: [
        {
          parts: [
            { text: prompt }
          ]
        }
      ],
      systemInstruction: {
        parts: [
          { text: systemInstruction }
        ]
      },
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            title: {
              type: "STRING",
              description: "Proposed catchy and artistic game title in Persian"
            },
            concept: {
              type: "STRING",
              description: "Core concept and story hook of the game in Persian (مفهوم اصلی)"
            },
            mechanics: {
              type: "ARRAY",
              items: { type: "STRING" },
              description: "List of core gameplay mechanics suitable for 48 hour development (مکانیک‌های گیم‌پلی)"
            },
            creativeTwist: {
              type: "STRING",
              description: "The unique creative twist of the game concept that makes it stand out (پیچش خلاقانه)"
            },
            artStyle: {
              type: "STRING",
              description: "Suggested aesthetic and visual art style suitable for 48 hours (سبک هنری پیشنهادی)"
            },
            tips: {
              type: "ARRAY",
              items: { type: "STRING" },
              description: "Gold tips for development speed & scope management specifically for this concept (نکات طلایی توسعه)"
            }
          },
          required: ["title", "concept", "mechanics", "creativeTwist", "artStyle", "tips"]
        }
      }
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Gemini API responded with status ${response.status}: ${errText}`);
    }

    const data: any = await response.json();
    const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!resultText) {
      throw new Error("پاسخی معتبر از هوش مصنوعی دریافت نشد.");
    }

    return new Response(resultText, {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Cache-Control": "no-cache"
      }
    });

  } catch (err: any) {
    console.error("Cloudflare Pages Function Error:", err);
    return new Response(
      JSON.stringify({ 
        error: "خطایی در عملکرد سرور لبه رخ داد: " + (err.message || err) 
      }),
      { 
        status: 500, 
        headers: { "Content-Type": "application/json;charset=UTF-8" } 
      }
    );
  }
};
