import { z } from 'zod'
import { createEnv } from '@/lib/create-env'

const EnvSchema = z.object({
    POWERSYNC_URL: z.string(),
    POWERSYNC_TOKEN: z.string()
})

const env = createEnv(EnvSchema) as z.TypeOf<typeof EnvSchema>
export default env
