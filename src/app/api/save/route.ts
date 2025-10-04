import {NextResponse} from 'next/server';
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {player, timeTaken, success } = body;

        const attempt = await prisma.escapeAttempt.create({
            data: {player, timeTaken, success}
        });
        return NextResponse.json(attempt);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to save attempt' }, {status: 500});
    }
}