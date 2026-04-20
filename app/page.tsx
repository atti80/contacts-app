import SettingsIcon from "./components/icons/SettingsIcon";

export default function Home() {
  return (
    <div className="vertical-main-grid">
      <div className="border-b border-grey-80"></div>
      <header className="border-b border-grey-80 flex justify-between items-center px-6">
        <h1>Contacts</h1>
        <div className="flex gap-4">
          <SettingsIcon />
          <button>+ Add new</button>
        </div>
      </header>
      <div className="px-6 py-3">Contact List</div>
    </div>
  );
}
