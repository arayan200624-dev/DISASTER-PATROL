import {
  Activity,
  Bot,
  CheckCircle2,
  Gauge,
  TrendingUp,
} from "lucide-react";

import "./StatCard.css";

type StatCardProps = {
  title: string;
  value: string;
  change: string;
  icon: "requests" | "ai" | "speed" | "success";
};

const icons = {
  requests: Activity,
  ai: Bot,
  speed: Gauge,
  success: CheckCircle2,
};

export default function StatCard({
  title,
  value,
  change,
  icon,
}: StatCardProps) {
  const Icon = icons[icon];

  return (
    <article className="stat-card">
      <div className="stat-top">
        <div className="stat-icon">
          <Icon size={20} />
        </div>

        <span className="change">
          <TrendingUp size={14} />
          {change}
        </span>
      </div>

      <p className="stat-title">
        {title}
      </p>

      <h2 className="stat-value">
        {value}
      </h2>

      <small>
        Compared with last month
      </small>
    </article>
  );
}