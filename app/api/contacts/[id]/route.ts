import db from "@/db/database";
import { Contact } from "@/types/contact";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const result = await db.execute({
      sql: "SELECT * FROM contacts WHERE id = ?",
      args: [id],
    });

    const existing = result.rows[0] as unknown as Contact | undefined;
    if (!existing) {
      return Response.json({ error: "Contact not found" }, { status: 404 });
    }

    const { name, phone, email, avatar_url } = await request.json();

    if (!name || name.trim() === "") {
      return Response.json({ error: "Name is required" }, { status: 400 });
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ error: "Invalid email format" }, { status: 400 });
    }

    await db.execute({
      sql: "UPDATE contacts SET name = ?, phone = ?, email = ?, avatar_url = ? WHERE id = ?",
      args: [name, phone, email, avatar_url, id],
    });

    return Response.json({ id, name, phone, email, avatar_url });
  } catch {
    return Response.json(
      { error: "Failed to update contact" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const result = await db.execute({
      sql: "SELECT * FROM contacts WHERE id = ?",
      args: [id],
    });

    const existing = result.rows[0] as unknown as Contact | undefined;
    if (!existing) {
      return Response.json({ error: "Contact not found" }, { status: 404 });
    }

    await db.execute({
      sql: "DELETE FROM contacts WHERE id = ?",
      args: [id],
    });

    return Response.json({ success: true });
  } catch {
    return Response.json(
      { error: "Failed to delete contact" },
      { status: 500 }
    );
  }
}
