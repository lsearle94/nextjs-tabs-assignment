import {NextResponse} from 'next/server';
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

// Logging Helper
function logAction(action: string, details: any = {}) {
  console.log(`[${new Date().toISOString()}] ACTION: ${action}`, details);
}

//GET
export async function GET() {
    try {
      logAction("FETCH_ATTEMPTS_START");
      const attempts = await prisma.escapeAttempt.findMany({
          orderBy: {createdAt: 'desc'}
      });
      logAction("FETCH_ATTEMPTS_SUCCESS", {count: attempts.length});
      return NextResponse.json(attempts);
    } catch (error) {
      logAction("FETCH_ATTEMPTS_ERROR", {error});
      return NextResponse.json({ error: 'Failed to fetch attempts' }, { status: 500 });
    }
}

//POST
export async function POST(req: Request) {
  try {
    const body = await req.json();
    logAction("CREATE_ATTEMPT_START", body);
    const newAttempt = await prisma.escapeAttempt.create({
      data: {
        player: body.player,
        timeTaken: body.timeTaken,
        success: body.success,
      },
    });
    logAction("CREATE_ATTEMPT_SUCCESS", newAttempt);
    return NextResponse.json(newAttempt);
  } catch (error) {
    logAction("CREATE_ATTEMPT_ERROR", {error});
    return NextResponse.json({ error: "Failed to save attempt" }, { status: 500 });
  }
}

//PUT
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    logAction("UPDATE_ATTEMPT_START", body);
    const updateAttempt = await prisma.escapeAttempt.update({
      where: {id: body.id},
      data: {
        player: body.player,
        timeTaken: body.timeTaken,
        success: body.success,
      },
    });
    logAction("UPDATE_ATTEMPT_SUCCESS", updateAttempt);
    return NextResponse.json(updateAttempt);
  } catch (error) {
    logAction("UPDATE_ATTEMPT_ERROR", {error});
    return NextResponse.json({ error: 'Failed to update attempt' }, {status: 500});
  }
}

//DELETE
export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    logAction("DELETE_ATTEMPT_START", body);
    await prisma.escapeAttempt.delete({
      where: {id: body.id},
    });
    logAction("DELETE_ATTEMPT_SUCCESS", {id: body.id});
    return NextResponse.json({ message: 'Attempt deleted successfully' });
  } catch (error) {
    logAction("DELETE_ATTEMPT_ERROR", {error});
    return NextResponse.json({error: 'Failed to delete attempt' }, {status: 500});
  }
}