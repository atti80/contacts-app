"use client"

import SettingsIcon from "./icons/SettingsIcon";
import DeleteIcon from "./icons/DeleteIcon";
import MenuButton from "./MenuButton";
import FavouriteIcon from "./icons/FavouriteIcon";
import { motion } from 'framer-motion';

interface Props {
  onEdit: () => void;
  onDelete: () => void;
  closeMenu: () => void;
}

export default function ContactMenu({ onEdit, onDelete, closeMenu }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="absolute top-12 left-0 bg-grey-80 rounded w-54 flex flex-col">
      <MenuButton
        icon={<SettingsIcon width={20} height={20} />}
        title="Edit"
        onClick={() => {
          onEdit();
          closeMenu();
        }}
      />
      <MenuButton
        icon={<FavouriteIcon width={20} height={20} />}
        title="Favourite"
        onClick={() => {
          closeMenu();
        }}
      />
      <MenuButton
        icon={<DeleteIcon width={20} height={20} />}
        title="Remove"
        onClick={() => {
          onDelete();
          closeMenu();
        }}
      />
    </motion.div>
  );
}
