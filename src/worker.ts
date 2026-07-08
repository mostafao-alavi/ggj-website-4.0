interface Env {
  GEMINI_API_KEY: string;
  ASSETS: {
    fetch: (request: Request) => Promise<Response>;
  };
}

export default {
  async fetch(request: Request, env: Env, ctx: any): Promise<Response> {
    const url = new URL(request.url);

    // CORS headers for all responses
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    // Route: POST /api/gemini/mentor
    if (url.pathname === "/api/gemini/mentor" && request.method === "POST") {
      try {
        const apiKey = env.GEMINI_API_KEY;
        if (!apiKey) {
          return new Response(
            JSON.stringify({ 
              error: "کلید API برای مدل هوش مصنوعی (GEMINI_API_KEY) در بخش Environment Variables کلودفلر تعریف نشده است." 
            }),
            { 
              status: 400,
              headers: { 
                "Content-Type": "application/json;charset=UTF-8",
                ...corsHeaders
              } 
            }
          );
        }

        const body: any = await request.json();
        const { theme, genre, platform, constraints } = body;

        if (!theme) {
          return new Response(
            JSON.stringify({ error: "لطفاً ابتدا تم یا موضوع بازی را وارد کنید." }),
            { 
              status: 400, 
              headers: { 
                "Content-Type": "application/json;charset=UTF-8",
                ...corsHeaders
              } 
            }
          );
        }

        const prompt = `یک طرح ایده منسجم و نوآورانه برای ساخت بازی در رویداد ۴۸ ساعته گیم جم با مشخصات زیر طراحی کن:
- تم / موضوع رویداد: ${theme}
- سبک بازی: ${genre || "آزاد"}
- پلتفرم هدف: ${platform || "آزاد"}
- محدودیت‌های چالش‌برانگیز انتخابی: ${constraints || "ندارد"}

لطفاً اطلاعات را به صورت کامل و به زبان فارسی و با ادبیاتی الهام‌بخش، هنری و حرفه‌ای در قالب فیلدهای ساختاریافته مشخص شده پاسخ بده.`;

        const modelName = "gemini-2.5-flash"; 
        const apiURL = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

        const systemInstruction = "You are an expert game design mentor for the Global Game Jam (مربی و رهنما بازی‌سازی رویداد گیم جم). Your goal is to help game jammers brainstorm exceptionally creative, innovative, and scoped game concepts that can be built in 48 hours. Provide answers ONLY in Persian language. Ensure the game concept directly solves the constraint and fits the 48-hour development scope perfectly.";

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

        const response = await fetch(apiURL, {
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
            "Cache-Control": "no-cache",
            ...corsHeaders
          }
        });

      } catch (err: any) {
        console.error("Cloudflare Worker Error:", err);
        return new Response(
          JSON.stringify({ 
            error: "خطایی در عملکرد سرور رخ داد: " + (err.message || err) 
          }),
          { 
            status: 500, 
            headers: { 
              "Content-Type": "application/json;charset=UTF-8",
              ...corsHeaders
            } 
          }
        );
      }
    }

    // Serve static assets or fallback to index.html for SPA routing
    try {
      const assetResponse = await env.ASSETS.fetch(request);
      if (assetResponse.status === 404 && !url.pathname.startsWith("/api/")) {
        // Fallback to index.html for frontend SPA routing
        const indexRequest = new Request(new URL("/index.html", request.url), request);
        return await env.ASSETS.fetch(indexRequest);
      }
      return assetResponse;
    } catch (e) {
      return new Response("Not Found", { status: 404 });
    }
  }
};
