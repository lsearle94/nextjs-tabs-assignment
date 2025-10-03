import {NextResponse} from 'next/server';
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const attempts = await prisma.escapeAttempt.findMany({
            orderBy: {createdAt: 'desc'}
        });
        return NextResponse.json(attempts);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch attempts' }, { status: 500 });
    }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newAttempt = await prisma.escapeAttempt.create({
      data: {
        player: body.player,
        timeTaken: body.timeTaken,
        success: body.success,
      },
    });
    return NextResponse.json(newAttempt);
  } catch (error) {
    console.error("Prisma POST Error:", error);
    return NextResponse.json({ error: "Failed to save attempt" }, { status: 500 });
  }
}