import { NextResponse, NextRequest } from "next/server";
import { GenerateContentResponse, GoogleGenAI } from "@google/genai";
import { BrandingSchemaInput, BrandingSchemaOutput } from "../outputType"
import { z } from "zod";


const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
export const POST = async (req: NextRequest) => {
    try {
        const { businessName, industry, slogan } = await req.json();
        if (businessName.length == 0 || industry.length == 0) {
            return NextResponse.json({ data: "Unable to generate", success: false, message: "Missing required fields" }, { status: 400 });
        }
        
        const prompt = `
You are a professional brand strategist and copywriter.  
I will provide you with the following details:  

Business Name: ${businessName}  
Industry: ${industry}  
Slogan: ${slogan.length > 0 ? slogan : "{}"}  

If a slogan is provided, use it. If no slogan is provided, create a new catchy and relevant one.  

Create branding content strictly in JSON format that matches the following rules:

1. slogan → An optional short phrase (if provided, use it; otherwise create one).  
   - Maximum length: 45 characters.  

2. headline → A catchy and attention-grabbing line.  
   - Minimum length: 5 characters.  
   - Maximum length: 120 characters.  

3. tagline → A short memorable line that complements the slogan.  
   - Minimum length: 3 characters.  
   - Maximum length: 130 characters.  

4. cta → A strong Call To Action line.  
   - Minimum length: 2 characters.  
   - Maximum length: 20 characters.  

5. aboutDetails → A short description of the business (2–3 sentences).  
   - Minimum length: 20 characters.  
   - Maximum length: 350 characters.  

6.  features → An array of between 3 and 5 objects.  
   Each feature object must contain:  
   - mainHeading → A short feature title (1–30 characters).  
   - content → One-sentence description of the feature (10–200 characters).  
   - iconName → Must exactly match a valid icon name from **Lucide** (https://lucide.dev/icons) or **react-icons/fa** (https://react-icons.github.io/react-icons/icons/fa6/).
   - iconSvg → The corresponding inline SVG string of that icon.  
       - Must follow Lucide/react-icons/fa style (minimal, clean, scalable).  
       - Do NOT include width or height attributes.  
       - Must include "xmlns" and "viewBox".  
       - Use stroke="currentColor" and/or fill="currentColor".  
    
   Important SVG rules for each feature.iconSvg:
- Return a valid inline SVG string (e.g. "<svg ...>...</svg>").
- Generate inline SVG similar in style to Lucide or React-Icons (clean, simple, minimal paths/lines, outline or filled icons).
- Do NOT include width or height attributes in the <svg> tag (these must be omitted).
- You may include "xmlns" and "viewBox" attributes. Always include a viewBox for proper scaling.
- Use "stroke='currentColor'" and/or "fill='currentColor'" so that the icon inherits text color from CSS.
- The SVG should only contain semantic elements (<path>, <circle>, <rect>, etc.), no <script>, no <style>.
- Example (GOOD):
  "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor'><path d='M5 12h14'/></svg>"
- Example (BAD — contains width/height):

Output strictly in this JSON format:     
    `
        // const response = await ai.models.generateContent(
        //     {
        //         model: "gemini-2.5-flash",
        //         contents: prompt,
        //         config: {
        //             responseMimeType: "application/json",
        //             responseSchema: z.toJSONSchema(BrandingSchemaInput),
        //         }
        //     });

        const response = await safeGeminiRequest(prompt);

        if (typeof response === "string") {
            return NextResponse.json(
                {
                    data: "Unable to generate",
                    success: false,
                    message: response
                },
                {
                    status: 503
                }
            )
        }
        let parsedJson;
        try {
            if (response.text) {
                parsedJson = JSON.parse(response.text);
            }
        } catch (err) {
            console.log(err)
            return NextResponse.json(
                {
                    data: "Unable to generate",
                    success: false,
                    message: "Json parsing error"
                },
                {
                    status: 500
                }
            )
        }
        
        const safeParsed = BrandingSchemaOutput.safeParse(parsedJson);
       
        if (!safeParsed.success) {
            return NextResponse.json(
                {
                    data: "Unable to generate",
                    success: false,
                    message: "Json Safe parsing error"
                },
                {
                    status: 500
                }
            )
        }
        
        return NextResponse.json(
            {
                data: safeParsed.data,
                success: true,
                message: "Successfully generated",
            },
            {
                status: 200
            }
        )
    } catch (err) {
        console.log(err)
        return NextResponse.json(
            {
                data: "Unable to generate",
                success: false,
                message: "Internal server error"
            },
            {

                status: 500
            }
        )
    }

}



async function safeGeminiRequest(prompt: string): Promise<GenerateContentResponse | string> {
  let retries = 4;
    console.log(retries);
  while (retries > 0) {
    try {
       const response = await ai.models.generateContent(
            {
                model: "gemini-2.5-flash",
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: z.toJSONSchema(BrandingSchemaInput),
                }
            });

      return response;
    } catch (error: any) {
      // model overloaded
       const statusCode =
    error?.status || error?.error?.status || error?.error?.code || error?.code;
    console.log("status code ===>>>", statusCode)
      if (statusCode === 503) {
        console.log("Model overloaded, retrying...");

        retries--;

        // exponential backoff
        const wait = (4 - retries) * 1000;
        await new Promise((res) => setTimeout(res, wait));
      } else {
        throw error; // normal errors throw back
      }
    }
  }
  return "Gemini service unavailable after retries.";
  throw new Error("Gemini service unavailable after retries.");
}