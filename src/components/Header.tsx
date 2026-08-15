import {
  Bell,
  Search,
  CircleCheck,
  ChevronDown,
} from "lucide-react";

import "./Header.css";

type HeaderProps = {
  onMenuClick: () => void;
};

export default function Header({
  onMenuClick,
}: HeaderProps) {
  return (
    <header className="header">

      <div className="header-left">

        <button
          className="services-button"
          onClick={onMenuClick}
          aria-label="Open services menu"
        >
          Services
        </button>

        <div className="system-status">

          <span className="live-badge">
            <i />
            LIVE
          </span>

          <span className="status-text">
            System Status:
          </span>

          <strong>
            <CircleCheck size={13} />
            OPERATIONAL
          </strong>

        </div>

      </div>

      <div className="header-right">

        <div className="header-search">

          <Search size={17} />

          <input
            type="text"
            placeholder="Search incidents, locations, teams..."
          />

          <kbd>
            ⌘ K
          </kbd>

        </div>

        <button
          className="header-notification"
          aria-label="Notifications"
        >
          <Bell size={19} />
          <i />
        </button>

        <div className="header-profile">

          <div className="header-avatar">
            AD
          </div>

          <div className="header-profile-info">
            <strong>
              Arayan Dwivedi
            </strong>

            <span>
              Administrator
            </span>
          </div>

          <ChevronDown size={15} />

        </div>

      </div>

    </header>
  );
}