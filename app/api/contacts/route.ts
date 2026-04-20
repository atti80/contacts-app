import db from "@/db/database";
import { Contact } from "@/types/contact";

export async function GET() {
  try {
    const contacts = db
      .prepare("SELECT * FROM contacts ORDER BY name ASC")
      .all() as Contact[];
    return Response.json(contacts);
  } catch {
    return Response.json(
      { error: "Failed to fetch contacts" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { name, phone, email, avatar_url } = await request.json();

    if (!name || name.trim() === "") {
      return Response.json({ error: "Name is required" }, { status: 400 });
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ error: "Invalid email format" }, { status: 400 });
    }

    const result = db
      .prepare(
        "INSERT INTO contacts (name, phone, email, avatar_url) VALUES (?, ?, ?, ?)"
      )
      .run(name.trim(), phone, email, avatar_url);

    return Response.json(
      {
        id: result.lastInsertRowid,
        name,
        phone,
        email,
        avatar_url,
      },
      { status: 201 }
    );
  } catch {
    return Response.json(
      { error: "Failed to create contact" },
      { status: 500 }
    );
  }
}
