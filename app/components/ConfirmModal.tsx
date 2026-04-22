import { motion } from "framer-motion";

export default function ConfirmModal({
  title,
  message,
  onConfirm,
  onCancel,
}: {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
    >
      <div className="rounded-lg w-91 flex flex-col bg-grey-100 p-6">
        <h2 className="mb-4">{title}</h2>
        <p className="mb-12">{message}</p>
        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 text-primary rounded-lg text-sm cursor-pointer transition-colors bg-transparent border-none"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-6 py-2 bg-grey-60 hover:bg-grey-50 rounded-lg text-primary text-sm cursor-pointer transition-colors disabled:opacity-50"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </motion.div>
  );
}
