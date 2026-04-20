import Image from "next/image";

export default function ProfilePic() {
  return (
    <div className="w-10 h-10 flex items-center justify-center">
      <Image
        className="rounded-full border border-white"
        src="/images/profileImg.jpg"
        alt="Profile Picture"
        width={24}
        height={24}
      />
    </div>
  );
}
