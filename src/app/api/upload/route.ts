import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse } from "next/server";

interface UploadRequest {
  filename: string;
  contentType: string;
}

// This is the R2 binding name from your wrangler.jsonc
const R2_BINDING_NAME = "MY_BUCKET";

export async function POST(request: Request) {
  try {
    const { filename, contentType } = await request.json() as UploadRequest;

    // You might want to add more robust validation and
    // authentication here to ensure the user is authorized to upload.

    const s3Client = new S3Client({
      region: "auto", // R2 uses "auto" for region
      endpoint: `https://${process.env.CF_ACCOUNT_ID}.r2.cloudflarestorage.com`, // Replace with your Account ID env var
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID || "", // Replace with your R2 access key ID env var
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "", // Replace with your R2 secret access key env var
      },
    });

    const putCommand = new PutObjectCommand({
      Bucket: R2_BINDING_NAME, // Use the R2 binding name
      Key: filename,
      ContentType: contentType,
    });

    // Generate a pre-signed URL with a reasonable expiration time (e.g., 15 minutes)
    const signedUrl = await getSignedUrl(s3Client, putCommand, { expiresIn: 60 * 15 });

    return NextResponse.json({ url: signedUrl });
  } catch (error) {
    console.error("Error generating pre-signed URL:", error);
    return NextResponse.json({ error: "Failed to generate upload URL" }, { status: 500 });
  }
}
