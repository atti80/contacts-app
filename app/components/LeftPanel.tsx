import BackArrowIcon from "./icons/BackArrowIcon";

export default function LeftPanel() {
  return (
    <div className="vertical-main-grid border-r border-grey-80">
      <div className="border-b border-grey-80"></div>
      <div className="border-b border-grey-80 flex justify-end items-center pr-8">
        <BackArrowIcon />
      </div>
      <div></div>
    </div>
  );
}
