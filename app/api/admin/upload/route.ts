import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { isUserAuthenticated } from '@/lib/adminAuth';

const UPLOADS_DIR = path.join(process.cwd(), 'public', 'images', 'uploads');

async function commitBinaryToGitHub(filePath: string, buffer: Buffer, commitMsg: string) {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO || 'rynp/urbandecahomes';
  const branch = process.env.GITHUB_BRANCH || 'main';

  if (!token) return { success: false, reason: 'No GITHUB_TOKEN configured' };

  try {
    const putUrl = `https://api.github.com/repos/${repo}/contents/${filePath}`;
    const base64Content = buffer.toString('base64');

    const putRes = await fetch(putUrl, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: commitMsg,
        content: base64Content,
        branch,
      }),
    });

    if (!putRes.ok) {
      const errText = await putRes.text();
      console.error('GitHub API image upload error:', errText);
      return { success: false, error: errText };
    }

    return { success: true };
  } catch (err: any) {
    console.error('GitHub image upload error:', err);
    return { success: false, error: err.message };
  }
}

export async function POST(req: NextRequest) {
  if (!isUserAuthenticated()) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized. Please login.' },
      { status: 401 }
    );
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ success: false, message: 'No file provided' }, { status: 400 });
    }

    // Validate mime type (images and videos)
    const validImageTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/avif', 'image/jpg'];
    const validVideoTypes = ['video/mp4', 'video/webm', 'video/quicktime', 'video/ogg', 'video/x-msvideo'];
    const isVideo = validVideoTypes.includes(file.type) || file.type.startsWith('video/');
    const isImage = validImageTypes.includes(file.type) || file.type.startsWith('image/');

    if (!isImage && !isVideo) {
      return NextResponse.json(
        { success: false, message: 'Invalid file format. Please upload an image (JPG, PNG, WebP, SVG) or video (MP4, WebM, MOV).' },
        { status: 400 }
      );
    }

    // Size limit: 60MB for videos, 15MB for images
    const maxSize = isVideo ? 60 * 1024 * 1024 : 15 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, message: `File is too large. Maximum size is ${isVideo ? '60MB' : '15MB'}.` },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize file name
    const timestamp = Date.now();
    const cleanName = file.name.toLowerCase().replace(/[^a-z0-9.]/g, '-');
    const fileName = `${timestamp}-${cleanName}`;
    const localFilePath = path.join(UPLOADS_DIR, fileName);

    // Ensure directory exists
    await fs.mkdir(UPLOADS_DIR, { recursive: true });

    // Write file to local public directory
    try {
      await fs.writeFile(localFilePath, buffer);
    } catch (diskErr) {
      console.warn('Could not write to local disk (expected on read-only serverless hosts):', diskErr);
    }

    // Commit to GitHub if configured
    let gitUploaded = false;
    if (process.env.GITHUB_TOKEN) {
      const gitResult = await commitBinaryToGitHub(
        `public/images/uploads/${fileName}`,
        buffer,
        `chore(assets): upload image ${fileName} via admin portal`
      );
      gitUploaded = gitResult.success;
    }

    const publicUrl = `/images/uploads/${fileName}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName,
      gitUploaded,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || 'Image upload failed' },
      { status: 500 }
    );
  }
}
