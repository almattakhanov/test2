import { NextRequest } from 'next/server';
import http from 'http';
import https from 'https';
import { Readable } from 'stream';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const imageUrl = searchParams.get('url');

    if (!imageUrl) {
        return new Response('Missing URL', { status: 400 });
    }

    try {
        const res = await fetch(imageUrl);
        const contentType = res.headers.get('content-type') || 'image/jpeg';
        const buffer = await res.arrayBuffer();

        return new Response(buffer, {
            status: 200,
            headers: {
                'Content-Type': contentType,
                'Cache-Control': 'public, max-age=86400',
            },
        });
    } catch (e) {
        console.error('Image fetch error:', e);
        return new Response('Failed to fetch image', { status: 500 });
    }
}
