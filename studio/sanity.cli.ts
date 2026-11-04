import { defineCliConfig } from 'sanity/cli'

import { dataset, projectId } from './env'

export default defineCliConfig({
  api: { projectId, dataset },
  // Hosted studio – lets `npm run deploy` run without prompts.
  deployment: {
    appId: 'k5wqr3ggkpv8r4jvnxmmxabu',
  },
  // Types for the website are generated from GROQ queries in ../src.
  typegen: {
    path: '../src/**/*.{ts,tsx}',
    schema: './schema.json',
    generates: '../src/sanity.types.ts',
    overloadClientMethods: true,
  },
})
