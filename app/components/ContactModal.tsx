"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Contact } from "@/types/contact";
import ChangeIcon from "./icons/ChangeIcon";
import AddIcon from "./icons/AddIcon";
import { uploadToS3 } from "@/lib/uploadImage";
import DeleteIcon from "./icons/DeleteIcon";

interface Props {
  contact: Contact | null;
  onClose: () => void;
  onSave: (contact: Contact) => void;
}

export default function ContactModal({ contact, onClose, onSave }: Props) {
  const isEditing = contact !== null;

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profilePic, setProfilePic] = useState(null);

  const [name, setName] = useState(contact?.name ?? "");
  const [phone, setPhone] = useState(contact?.phone ?? "");
  const [email, setEmail] = useState(contact?.email ?? "");
  const [avatarUrl, setAvatarUrl] = useState(contact?.avatar_url ?? "");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const url = await uploadToS3(file);
      setAvatarUrl(url);
    } catch (error) {
      setError("Failed to upload image");
    }
  }

  async function handleSubmit() {
    if (!name.trim()) {
      setError("Name is required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const url = isEditing ? `/api/contacts/${contact.id}` : "/api/contacts";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, avatar_url: avatarUrl }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      onSave(data);
      onClose();
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="rounded-lg w-91 h-135 flex flex-col bg-grey-100">
        <div className="flex flex-col p-6 gap-6">
          {/* Title */}
          <h2 className="text-primary text-2xl font-normal m-0">
            {isEditing ? "Edit contact" : "Add contact"}
          </h2>

          {/* Avatar row */}
          <div className="flex items-center gap-4">
            <div className="w-22 h-22 rounded-full overflow-hidden shrink-0">
              {avatarUrl ? (
                <Image
                  src={avatarUrl}
                  alt="avatar"
                  width={88}
                  height={88}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image
                  src="/images/profilepic.png"
                  alt="avatar"
                  width={88}
                  height={88}
                />
              )}
            </div>

            <div className="flex gap-2 items-center flex-1">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              <button
                className={`bg-grey-50 flex flex-1 items-center gap-2 px-2 py-2 rounded-lg text-primary text-sm font-light cursor-pointer transition-colors tracking-normal ${avatarUrl ? "max-w-42" : "max-w-35"}`}
                onClick={() => fileInputRef.current?.click()}
              >
                {avatarUrl ? (
                  <>
                    <ChangeIcon />
                    <span>Change picture</span>{" "}
                  </>
                ) : (
                  <>
                    <AddIcon /> <span>Add picture</span>{" "}
                  </>
                )}
              </button>

              {avatarUrl && (
                <button
                  className="w-10 h-10 flex items-center justify-center rounded-lg text-primary cursor-pointer transition-colors"
                  style={{ background: "var(--color-grey-40)" }}
                  onClick={() => setAvatarUrl("")}
                >
                  <DeleteIcon />
                </button>
              )}
            </div>
          </div>

          {/* Fields */}
          <div className="flex flex-col gap-4 relative">
            <div className="flex flex-col gap-1.5">
              <label>Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jamie Wright"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label>Phone number</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+01 234 5678"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label>Email address</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jamie.wright@mail.com"
              />
            </div>
            {/* Error */}
            {error && (
              <p className="text-red-400 text-sm m-0 absolute -bottom-8">
                {error}
              </p>
            )}
          </div>
        </div>
        {/* Footer */}
        <div className="flex p-6 justify-end gap-3">
          <button
            className="px-4 py-2.5 rounded-xl text-sm cursor-pointer transition-colors bg-transparent border-none"
            style={{ color: "var(--text-secondary)" }}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-6 py-2.5 rounded-xl text-primary text-sm cursor-pointer transition-colors disabled:opacity-50"
            style={{ background: "var(--color-grey-40)" }}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Saving..." : "Done"}
          </button>
        </div>
      </div>
    </div>
  );
}
