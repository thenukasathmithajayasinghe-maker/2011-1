import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = parseInt(process.env.PORT || '3000', 10);
  const isProduction = process.env.NODE_ENV === 'production';

  app.use(express.json({ limit: '10mb' }));

  // Initialize server-side Gemini client
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  // 1. AI Gem Consultant Multi-Turn Chat Endpoint
  app.post('/api/gemini/chat', async (req, res) => {
    try {
      const { messages, model = 'gemini-3.5-flash', enableThinking = false } = req.body;

      if (!messages || !Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ error: 'Messages array is required.' });
      }

      // Determine model based on task request
      let selectedModel = model;
      // Supported models: gemini-3.1-pro-preview, gemini-3.5-flash, gemini-3.1-flash-lite
      if (enableThinking || model === 'gemini-3.1-pro-preview') {
        selectedModel = 'gemini-3.1-pro-preview';
      } else if (model === 'gemini-3.1-flash-lite') {
        selectedModel = 'gemini-3.1-flash-lite';
      } else {
        selectedModel = 'gemini-3.5-flash';
      }

      const systemInstruction = `You are the THENUKA AI GEM CONSULTANT for "THENUKA SATHMITHA GEMS" (Designed, Created & Owned by THENUKA SATHMITHA JAYASINGHE).
You are a world-renowned Senior Gemologist holding GIA Graduate Gemologist (GG), FGA, and Gübelin credentials, specializing in Ceylon gemstones, geological provenance, crystal lattice systems, refractive index optics, spectroscopy, and laboratory treatment detection.

Your expertise covers:
1. Ceylon Corundum: Natural Unheated Royal Blue Sapphire, Padparadscha (the true lotus flower 50/50 pink-orange color balance), Pigeon Blood Rubies, Star Sapphires, Pushparaga Yellow Sapphires, and Geuda heat transformation history.
2. Sri Lankan localities: Ratnapura (City of Gems / Illam gravels), Pelmadulla, Balangoda, Elahera (Alexandrite & Cobalt Spinel), and Meetiyagoda (exclusive blue sheen adularescent moonstone).
3. Diagnostic Laboratory Testing: Polariscope reactions (SR vs DR vs AGG), Refractometer spot & range techniques, Hydrostatic specific gravity, Dichroscope pleochroic axes, Chelsea filter reactions, UV fluorescence (SWUV/LWUV), and advanced spectroscopy (FTIR, Raman, LA-ICP-MS, EDXRF).
4. Treatment Detection: Distinguishing natural unheated silk from thermal melted discoidal halos, beryllium lattice diffusion, lead-glass clarity filling, irradiation, and oiling/resin filling.
5. Synthetics vs Naturals: Identifying Verneuil flame-fusion curved striae, flux feathers, hydrothermal chevron growth, and Czochralski pulled simulants.

Tone & Demeanor:
- Eloquent, authoritative, scientifically rigorous yet welcoming and refined luxury advisory.
- Provide clear scientific values (Mohs hardness, RI, SG, optical character) whenever discussing species.
- Always uphold THENUKA SATHMITHA GEMS' ethical mining and 100% provenance standards.`;

      // Format conversation contents for GoogleGenAI
      const formattedContents = messages.map((m: { role: string; content: string }) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
      }));

      // Build model configuration
      const config: any = {
        systemInstruction,
      };

      // Add high thinking mode if requested with gemini-3.1-pro-preview
      if (selectedModel === 'gemini-3.1-pro-preview' && enableThinking) {
        config.thinkingConfig = {
          thinkingLevel: ThinkingLevel.HIGH,
        };
        // Per instructions: Do not set maxOutputTokens
      }

      const response = await ai.models.generateContent({
        model: selectedModel,
        contents: formattedContents,
        config,
      });

      const replyText = response.text || 'No response generated.';
      return res.json({ reply: replyText, modelUsed: selectedModel, thinkingEnabled: enableThinking });
    } catch (error: any) {
      console.error('Error calling Gemini chat API:', error);
      return res.status(500).json({
        error: error.message || 'An error occurred while consulting the AI Gemologist.',
      });
    }
  });

  // 2. Recruitment Sandbox Endpoint (Generates LinkedIn JD + 10 Behavioral Interview Questions)
  app.post('/api/gemini/recruitment', async (req, res) => {
    try {
      const { rawNotes, roleTitle, seniority = 'Senior' } = req.body;

      if (!rawNotes || typeof rawNotes !== 'string') {
        return res.status(400).json({ error: 'Raw notes are required to generate JD and interview guide.' });
      }

      const systemInstruction = `You are an executive talent strategist and technical recruiting expert for THENUKA SATHMITHA GEMS and the global luxury gemological/jewelry industry.
When given raw notes about a desired role, you generate two distinct outputs:
1) A polished, correctly formatted, highly engaging Job Description tailored specifically for LinkedIn (including catchy headline, company mission, role summary, key responsibilities, hard skills, soft skills, compensation & perks).
2) An Interview Guide containing exactly 10 behavioral & technical questions specifically targeting the soft and hard skills mentioned in that new JD, complete with evaluation criteria / "What to listen for in top candidates".`;

      const prompt = `Please review these raw notes for the role "${roleTitle || 'Gemological Specialist'}" (${seniority} level):

RAW NOTES:
"""
${rawNotes}
"""

Generate the response in clear, beautifully formatted Markdown with two distinct, comprehensive sections:
# SECTION 1: POLISHED LINKEDIN JOB DESCRIPTION
(Include Role Title, About THENUKA SATHMITHA GEMS, Mission, Key Responsibilities, Technical Requirements / Hard Skills, Behavioral / Soft Skills, Qualifications, and Benefits)

---

# SECTION 2: INTERVIEW GUIDE (10 TARGETED BEHAVIORAL QUESTIONS)
(Provide exactly 10 structured behavioral and technical scenario questions directly evaluating the hard and soft skills outlined in the JD. For each question, include:
- Question Number & Targeted Competency (e.g. Hard Skill: Spectroscopic Treatment Verification, or Soft Skill: Client High-Stakes Negotiation)
- The Behavioral Question (using STAR format prompts)
- What Great Candidates Say / Look-for signals
- Red Flags / Warning signals)
`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: prompt,
        config: {
          systemInstruction,
        },
      });

      const resultText = response.text || '';
      return res.json({ output: resultText });
    } catch (error: any) {
      console.error('Error in recruitment sandbox API:', error);
      return res.status(500).json({
        error: error.message || 'Failed to generate recruitment package.',
      });
    }
  });

  // Vite integration in development or static serving in production
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`THENUKA SATHMITHA GEMS server running on http://localhost:${PORT}`);
  });
}

startServer();
