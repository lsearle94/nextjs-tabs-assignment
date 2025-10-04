import {NextResponse} from 'next/server';
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

//GET
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

//POST
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

//PUT
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const updateAttempt = await prisma.escapeAttempt.update({
      where: {id: body.id},
      data: {
        player: body.player,
        timeTaken: body.timeTaken,
        success: body.success,
      },
    });
    return NextResponse.json(updateAttempt);
  } catch (error) {
    console.error('Prisma PUT error:', error);
    return NextResponse.json({ error: 'Failed to update attempt' }, {status: 500});
  }
}

//DELETE
export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    await prisma.escapeAttempt.delete({
      where: {id: body.id},
    });
    return NextResponse.json({ message: 'Attempt deleted successfully' });
  } catch (error) {
    console.error('Prisma DELETE error:', error);
    return NextResponse.json({error: 'Failed to delete attempt' }, {status: 500});
  }
}