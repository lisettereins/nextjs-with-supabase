import { NextRequest, NextResponse } from "next/server";

let notes: { id: string; title: string }[] = [];

export async function GET() {
  return NextResponse.json(notes);
}

export async function POST(req: NextRequest) {
  const { id, title } = await req.json();
  notes.push({ id, title });
  return NextResponse.json({ id, title }, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const { id, title } = await req.json();
  const note = notes.find(n => n.id === id);
  if (!note) return NextResponse.json({ error: "Not found" }, { status: 404 });
  note.title = title;
  return NextResponse.json(note);
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  notes = notes.filter(n => n.id !== id);
  return NextResponse.json({ success: true });
}
