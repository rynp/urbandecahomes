import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { isUserAuthenticated } from '@/lib/adminAuth';
import initialProjects from '@/data/projects.json';

const PROJECTS_FILE_PATH = path.join(process.cwd(), 'data', 'projects.json');

async function commitToGitHub(filePath: string, contentStr: string, commitMsg: string) {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO || 'rynp/urbandecahomes';
  const branch = process.env.GITHUB_BRANCH || 'main';

  if (!token) return { success: false, reason: 'No GITHUB_TOKEN configured' };

  try {
    // 1. Get current file sha (if exists)
    const getUrl = `https://api.github.com/repos/${repo}/contents/${filePath}?ref=${branch}`;
    const getRes = await fetch(getUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });

    let sha: string | undefined;
    if (getRes.ok) {
      const getData = await getRes.json();
      sha = getData.sha;
    }

    // 2. Put file to commit
    const putUrl = `https://api.github.com/repos/${repo}/contents/${filePath}`;
    const base64Content = Buffer.from(contentStr).toString('base64');

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
        ...(sha ? { sha } : {}),
      }),
    });

    if (!putRes.ok) {
      const errText = await putRes.text();
      console.error('GitHub API error:', errText);
      return { success: false, error: errText };
    }

    return { success: true };
  } catch (err: any) {
    console.error('GitHub sync error:', err);
    return { success: false, error: err.message };
  }
}

export async function GET() {
  try {
    // Attempt to read current file from disk
    let projectsData = initialProjects;
    try {
      const raw = await fs.readFile(PROJECTS_FILE_PATH, 'utf8');
      projectsData = JSON.parse(raw);
    } catch {
      // Fallback to imported json if running on readonly filesystem
    }

    return NextResponse.json({
      success: true,
      projects: projectsData,
      gitSyncConfigured: Boolean(process.env.GITHUB_TOKEN),
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || 'Failed to read projects' },
      { status: 500 }
    );
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
    const body = await req.json();
    const { projects } = body;

    if (!Array.isArray(projects)) {
      return NextResponse.json(
        { success: false, message: 'Invalid payload: expected an array of projects' },
        { status: 400 }
      );
    }

    const formattedJson = JSON.stringify(projects, null, 2);

    // 1. Write to local file on disk
    let diskSaved = false;
    try {
      await fs.writeFile(PROJECTS_FILE_PATH, formattedJson, 'utf8');
      diskSaved = true;
    } catch (diskErr) {
      console.warn('Could not write to local disk (expected on read-only serverless hosts):', diskErr);
    }

    // 2. If GitHub token is configured, commit directly to GitHub repository (for Netlify auto-deploy)
    let gitSynced = false;
    if (process.env.GITHUB_TOKEN) {
      const gitResult = await commitToGitHub(
        'data/projects.json',
        formattedJson,
        'chore(content): update projects details via admin portal'
      );
      gitSynced = gitResult.success;
    }

    return NextResponse.json({
      success: true,
      message: gitSynced
        ? 'Changes committed to GitHub! Netlify will automatically build and deploy the update.'
        : diskSaved
        ? 'Changes saved to data/projects.json successfully.'
        : 'Changes staged in memory (configure GITHUB_TOKEN for persistent Netlify deploys).',
      gitSynced,
      diskSaved,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || 'Failed to update projects' },
      { status: 500 }
    );
  }
}
