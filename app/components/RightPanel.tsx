import LightModeIcon from "./icons/LightModeIcon";

export default function RightPanel() {
  return (
    <div className="vertical-main-grid border-l border-grey-80 max-sm:hidden!">
      <div className="border-b border-grey-80"></div>
      <div className="border-b border-grey-80 flex justify-start items-center pl-2 sm:pl-8">
        <LightModeIcon />
      </div>
      <div></div>
    </div>
  );
}
