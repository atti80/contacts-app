"use client";

import { Contact } from "@/types/contact";
import ContactCard from "./ContactCard";

interface Props {
  contacts: Contact[];
  onEdit: (contact: Contact) => void;
  onDelete: (id: number) => void;
}

export default function ContactList({ contacts, onEdit, onDelete }: Props) {
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
