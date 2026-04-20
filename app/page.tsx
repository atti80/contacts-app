"use client";

import SettingsIcon from "./components/icons/SettingsIcon";
import { useState, useEffect } from "react";
import ContactList from "./components/ContactList";
import { Contact } from "@/types/contact";
import AddNewButton from "./components/AddNewButton";
import ProfilePic from "./components/ProfilePic";

export default function Home() {
  const [contacts, setContacts] = useState<Contact[]>([]);

  function handleEdit(contact: Contact) {
    console.log("edit", contact);
  }

  function handleDelete(id: number) {
    console.log("edit", id);
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
          <AddNewButton />
        </div>
      </header>
      <ContactList
        contacts={contacts}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
