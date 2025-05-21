'use client';

import { useState, ChangeEvent } from 'react';

interface UploadResponse {
  url: string;
}

export default function R2UploadButton() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    } else {
      setFile(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    setUploading(true);

    try {
      // Step 1: Get pre-signed URL from your API route
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filename: file.name,
          contentType: file.type,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to get pre-signed URL: ${response.statusText}`);
      }

      const { url } = await response.json() as UploadResponse;

      // Step 2: Upload the file directly to R2 using the pre-signed URL
      const uploadResponse = await fetch(url, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type, // Important: Set content type for R2
        },
      });

      if (!uploadResponse.ok) {
        throw new Error(`Failed to upload file to R2: ${uploadResponse.statusText}`);
      }

      alert('File uploaded successfully!');
      setFile(null); // Clear selected file after upload
    } catch (error: any) {
      console.error('Upload failed:', error);
      alert(`Upload failed: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} disabled={uploading} />
      <button onClick={handleUpload} disabled={!file || uploading}>
        {uploading ? 'Uploading...' : 'Upload File'}
      </button>
    </div>
  );
}
