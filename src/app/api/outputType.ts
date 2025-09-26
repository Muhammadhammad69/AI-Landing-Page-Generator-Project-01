import { z } from 'zod';


// Feature structure: matches your requested format
export const FeatureSchema = z.object({
    mainHeading: z.string()
        .min(1, { message: 'Main-Heading is required' })
        .max(30, { message: 'Main-Heading is too long (max 30 chars)' }),

    content: z.string()
        .min(10, { message: 'Content should be at least 10 characters' })
        .max(200, { message: 'Content is too long (max 200 chars)' }),

    // iconName for reference (e.g. Globe, Zap, ShieldCheck)
    iconName: z.string()
        .min(1, { message: 'Icon name is required' })
        .max(50, { message: 'Icon name too long (max 50 chars)' }),

    // svg field will hold actual inline SVG string
    iconSvg: z.string()
        .min(10, { message: 'SVG is required' })
        .regex(/^<svg[\s\S]*<\/svg>$/, { message: 'Must be valid inline SVG markup' }),
});


// Full branding output schema
export const BrandingSchema = z.object({
    // Slogan is optional; user may provide it or leave it empty
    slogan: z.string().max(45).optional(),


    // Output fields
    headline: z.string().min(5).max(120),
    tagline: z.string().min(3).max(130),
    cta: z.string().min(2).max(20),
    aboutDetails: z.string().min(20).max(350),


    // Features: array of 3-5 items, each following FeatureSchema
    features: z.array(FeatureSchema).min(3).max(5),
});


// TypeScript type helper
export type Branding = z.infer<typeof BrandingSchema>;