export default function MenuButton({
  icon,
  title,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full h-11 p-3 flex items-center justify-start gap-2 hover:bg-grey-70 text-secondary rounded z-50 cursor-pointer"
    >
      {icon}
      <span className="text-primary">{title}</span>
    </button>
  );
}
