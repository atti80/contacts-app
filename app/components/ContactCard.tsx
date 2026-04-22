"use client";

import { useState, useRef, useEffect } from "react";
import { Contact } from "@/types/contact";
import MuteIcon from "./icons/MuteIcon";
import CallIcon from "./icons/CallIcon";
import MoreIcon from "./icons/MoreIcon";
import Image from "next/image";
import ContactMenu from "./ContactMenu";
import { motion } from "framer-motion";

interface Props {
  contact: Contact;
  onEdit: () => void;
  onDelete: () => void;
}

export default function ContactCard({ contact, onEdit, onDelete }: Props) {
  const [hovered, setHovered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={`h-16 py-3 flex items-center gap-4 bg-grey-100 ${menuOpen ? "z-50" : "z-0"}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setMenuOpen(false);
      }}
    >
      {/* Avatar */}
      {contact.avatar_url ? (
        <Image
          className="rounded-full border border-grey-60"
          src={contact.avatar_url}
          alt={contact.name}
          width={40}
          height={40}
        />
      ) : (
        <Image
          className="rounded-full border border-grey-60"
          src={"/images/profilepic.png"}
          alt={contact.name}
          width={40}
          height={40}
        />
      )}

      {/* Info */}
      <div>
        <h3>{contact.name}</h3>
        <span className="message">{contact.phone}</span>
      </div>

      {/* Actions - visible on hover */}
      <div className={`ml-auto flex ${hovered ? "sm:flex" : "sm:hidden"}`}>
        <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-grey-80">
          <MuteIcon />
        </button>
        <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-grey-80">
          <CallIcon />
        </button>
        <div ref={menuRef} className="relative">
          <button
            className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-grey-80"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <MoreIcon />
          </button>

          {menuOpen && (
            <ContactMenu
              onEdit={onEdit}
              onDelete={onDelete}
              closeMenu={() => setMenuOpen(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
