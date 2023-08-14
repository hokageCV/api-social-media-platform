import { z } from 'zod';

const envSchema = z.object({
    MONGO_URI: z.string().nonempty(),
    SECRET_STRING: z.string().nonempty(),
    PORT: z.string().optional(),
});

type Env = z.infer<typeof envSchema>;

export const ENV: Env = envSchema.parse(process.env);

export default ENV;
