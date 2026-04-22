import AddIcon from "./icons/AddIcon";

export default function AddNewButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="bg-linear-to-b from-grey-60/70 hover:from-grey50/70 to-grey-60 hover:to-grey-50 px-2 py-2 rounded-full w-30 h-10 border border-grey-20 flex items-center gap-2 cursor-pointer"
    >
      <AddIcon />
      <span className="">Add new</span>
    </button>
  );
}
