import {NextResponse} from 'next/server';
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {playerName, timeTaken, success } = body;

        const attempt = await prisma.escape_attempts.create({
            data: {playerName, timeTaken, success}
        });
        return NextResponse.json(attempt);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to save attempt' }, {status: 500});
    }
}