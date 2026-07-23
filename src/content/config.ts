import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content', // Markdown / MDX फाइलों से
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    category: z.enum([
      'passport-photo',
      'pdf-tools',
      'aadhaar',
      'pan-card',
      'bank-tools',
      'csc-tools',
      'general',
    ]),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    // 🧠 AI Search / JSON-LD के लिए
    author: z.string().default('RDS Kendra'),
    faq: z
      .array(z.object({ question: z.string(), answer: z.string() }))
      .optional(), // FAQ Schema -> ChatGPT/Gemini/Perplexity snippets के लिए बहुत उपयोगी
  }),
});

export const collections = { blog };
