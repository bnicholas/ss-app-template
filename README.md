# SS-NEXTJS-APP-TEMPLATE

This is a template Next.js application designed to be deployed on Cloudflare Workers using the `@opennextjs/cloudflare` adapter.

## Getting Started

To get started with this template, follow the steps below.

### Prerequisites

Make sure you have Node.js (v18 or later recommended) and pnpm installed.

### Installation

1. Clone this repository or use it as a template for a new project.
2. Navigate to the project directory in your terminal.
3. Install dependencies:

```bash
pnpm install
```

### Running Locally

Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

## Cloudflare Setup

To deploy this application to Cloudflare Workers, you need to install the Wrangler CLI and authenticate.

### Install Wrangler CLI

If you don't have Wrangler installed globally, you can install it using npm (pnpm might have issues with global installs depending on configuration, npm is generally more reliable for global CLIs):

```bash
npm install -g wrangler
```

### Authenticate Wrangler

Log in to your Cloudflare account through Wrangler. This command will open a browser window for authentication.

```bash
wrangler login
```

Follow the prompts in your browser to authorize Wrangler.

## Cloudflare R2 Bucket Setup

To use Cloudflare R2 for object storage, you'll need to create a bucket and bind it to your worker.

### Create an R2 Bucket

Use the Wrangler CLI to create a new R2 bucket. Replace `<YOUR_BUCKET_NAME>` with a unique name for your bucket.

```bash
wrangler r2 bucket create <YOUR_BUCKET_NAME>
```

### Configure Wrangler Binding

Update the `wrangler.jsonc` file to include the R2 bucket binding. Locate the `r2_buckets` section and update the `bucket_name` to the name you chose in the previous step. You can also change the `binding` name if desired (e.g., to `BUCKET_NAME`). The binding name is how you will access the R2 bucket in your code.

```jsonc
// wrangler.jsonc
// ... existing code ...
"r2_buckets": [
    { "binding": "MY_BUCKET", "bucket_name": "<YOUR_BUCKET_NAME>" }
  ]
// ... existing code ...
```

Make sure the binding name in `wrangler.jsonc` matches the name you use to access the bucket in your application code.

## Environment Variables

This project uses environment variables, typically managed via a `.dev.vars` file for local development and configured in Cloudflare for production.

For Clerk authentication, you will need to add the following variables to your `.dev.vars` file:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your_publishable_key>
CLERK_SECRET_KEY=<your_secret_key>
```

Replace `<your_publishable_key>` and `<your_secret_key>` with your actual keys obtained from your Clerk dashboard. Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser, while others are only available on the server.

It is recommended to keep a master `.dev.vars` file in your home directory (`~/.dev.vars`). When starting a new project based on this template, copy your master file into the project root:

```
