import { NextRequest, NextResponse } from 'next/server';
import { getIdVerifyApiUrl } from '@/lib/id-verify-api';

type RouteContext = { params: Promise<{ path: string[] }> };

async function proxyToIdVerifyApi(req: NextRequest, context: RouteContext) {
  const { path } = await context.params;
  const segment = path.join('/');
  const apiBase = getIdVerifyApiUrl();
  const url = `${apiBase}/api/v1/partners/${segment}`;

  const headers = new Headers();
  const contentType = req.headers.get('content-type');
  if (contentType) headers.set('Content-Type', contentType);
  const authorization = req.headers.get('authorization');
  if (authorization) headers.set('Authorization', authorization);

  const init: RequestInit = {
    method: req.method,
    headers,
  };

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    init.body = await req.text();
  }

  const upstream = await fetch(url, init);
  const body = await upstream.text();

  return new NextResponse(body, {
    status: upstream.status,
    headers: {
      'Content-Type': upstream.headers.get('content-type') || 'application/json',
    },
  });
}

export async function GET(req: NextRequest, context: RouteContext) {
  return proxyToIdVerifyApi(req, context);
}

export async function POST(req: NextRequest, context: RouteContext) {
  return proxyToIdVerifyApi(req, context);
}

export async function PUT(req: NextRequest, context: RouteContext) {
  return proxyToIdVerifyApi(req, context);
}

export async function PATCH(req: NextRequest, context: RouteContext) {
  return proxyToIdVerifyApi(req, context);
}

export async function DELETE(req: NextRequest, context: RouteContext) {
  return proxyToIdVerifyApi(req, context);
}
