"use client";

import { Contact } from "@/types/contact";
import ContactCard from "./ContactCard";

interface Props {
  contacts: Contact[];
  onEdit: (contact: Contact) => void;
  onDelete: (id: number) => void;
}

export default function ContactList({ contacts, onEdit, onDelete }: Props) {
  if (contacts.length === 0) {
    return <p>No contacts yet.</p>;
  }

  return (
    <div className="px-6 pt-3">
      {contacts.map((contact) => (
        <ContactCard
          key={contact.id}
          contact={contact}
          onEdit={() => onEdit(contact)}
          onDelete={() => onDelete(contact.id)}
        />
      ))}
    </div>
  );
}
