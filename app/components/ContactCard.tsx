"use client";

import { useState } from "react";
import { Contact } from "@/types/contact";
import MuteIcon from "./icons/MuteIcon";
import CallIcon from "./icons/CallIcon";
import MoreIcon from "./icons/MoreIcon";
import Image from "next/image";

interface Props {
  contact: Contact;
}

export default function ContactCard({ contact }: Props) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="h-16 py-3 flex items-center gap-4"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
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
      {hovered && (
        <div className="ml-auto flex">
          <button className="w-10 h-10 flex items-center justify-center">
            <MuteIcon />
          </button>
          <button className="w-10 h-10 flex items-center justify-center">
            <CallIcon />
          </button>
          <button className="w-10 h-10 flex items-center justify-center">
            <MoreIcon />
          </button>
        </div>
      )}
    </div>
  );
}
