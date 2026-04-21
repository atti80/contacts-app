"use client";

import SettingsIcon from "./components/icons/SettingsIcon";
import { useState, useEffect } from "react";
import ContactList from "./components/ContactList";
import { Contact } from "@/types/contact";
import AddNewButton from "./components/AddNewButton";
import ProfilePic from "./components/ProfilePic";
import ContactModal from "./components/ContactModal";

export default function Home() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);

  function handleAdd() {
    setEditingContact(null);
    setModalOpen(true);
  }

  function handleEdit(contact: Contact) {
    setEditingContact(contact);
    setModalOpen(true);
  }

  async function handleDelete(id: number) {
    const res = await fetch(`/api/contacts/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (!res.ok) {
      //setError(data.error || "Something went wrong");
      return;
    }
    setContacts((prev) => prev.filter((c) => c.id !== id));
  }

  function handleClose() {
    setModalOpen(false);
    setEditingContact(null);
  }

  function handleSave(contact: Contact) {
    setContacts((prev) => {
      const exists = prev.some((c) => c.id == contact.id);
      if (exists) {
        return prev.map((c) => (c.id == contact.id ? contact : c));
      } else {
        return [...prev, contact];
      }
    });
  }

  useEffect(() => {
    fetch("/api/contacts")
      .then((res) => res.json())
      .then(setContacts);
  }, []);

  return (
    <div className="vertical-main-grid">
      <div className="border-b border-grey-80"></div>
      <header className="border-b border-grey-80 flex justify-between items-center px-6">
        <h1>Contacts</h1>
        <div className="flex gap-6 items-center">
          <div className="flex gap-2 items-center">
            <div className="w-10 h-10 flex justify-center items-center">
              <SettingsIcon />
            </div>
            <ProfilePic />
          </div>
          <AddNewButton onClick={handleAdd} />
        </div>
      </header>
      <ContactList
        contacts={contacts}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      {modalOpen && (
        <ContactModal
          contact={editingContact}
          onClose={handleClose}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
