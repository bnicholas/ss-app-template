# ss-app-template

`git clone git@github.com:bnicholas/ss-app-template.git FOLDER_NAME`

A starter template for Next.js app + Clerk Auth + tailwind + shadcn ui + CF (Worker + R2 + KV)

1. copy .dev.vars.example to .dev.vars
2. copy .env.example to .env.development
3. update wrangler.jsonc from `"name": "ss-app-template"` to `"name": "new-app-name",`
4. set `CLERK_PUBLISHABLE_KEY`
5.

## R2 (S3 compatible) obj storage

1. `npx wrangler r2 bucket create <BUCKET_NAME>`
2. Update the `wrangler.jsonc` file with the `<BUCKET_NAME>`

`npx wrangler r2 bucket list`

`cp ~/.dev.vars ./.dev.vars`
