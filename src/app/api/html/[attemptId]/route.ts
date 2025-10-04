import {NextResponse} from 'next/server';
import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();

export async function GET(_: Request, {params}: {params: {attemptId: string}}){
    const attempt = await prisma.escapeAttempt.findUnique({
        where: {id: Number(params.attemptId)},
    });

    if (!attempt) return NextResponse.json({ error: 'Not Found' }, {status: 404});

    const html = `
    <html>
        <head><title>Attempt ${attempt.id}</title></head>
        <body>
            <h1>Escape Room Attempt</h1>
            <p><strong>Player:</strong> ${attempt.player}</p>
            <p><strong>Time Taken:</strong> ${attempt.timeTaken}s</p>
            <p><strong>Success:</strong> ${attempt.success ? 'Yes' : 'No'}</p>
        </body>
    </html>
    `;
    return new Response(html, {headers: {'Content-Type': 'text/html'}});
}