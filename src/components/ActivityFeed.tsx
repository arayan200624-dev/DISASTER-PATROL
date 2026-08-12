import {
  Bot,
  CheckCircle2,
  Clock3,
  MoreHorizontal,
  User,
} from "lucide-react";

import "./ActivityFeed.css";

type Activity = {
  title: string;
  description: string;
  time: string;
  status: "Success" | "Processing";
  icon: "ai" | "user";
};

const activities: Activity[] = [
  {
    title: "GPT-4o request completed",
    description: "Generated response for customer query",
    time: "2 min ago",
    status: "Success",
    icon: "ai",
  },
  {
    title: "New user registered",
    description: "user_2489 joined the platform",
    time: "8 min ago",
    status: "Success",
    icon: "user",
  },
  {
    title: "Claude request completed",
    description: "Document analysis completed successfully",
    time: "14 min ago",
    status: "Success",
    icon: "ai",
  },
  {
    title: "AI request processing",
    description: "Llama 3.1 is processing a new request",
    time: "18 min ago",
    status: "Processing",
    icon: "ai",
  },
];

export default function ActivityFeed() {
  return (
    <section className="activity-card">

      <div className="activity-header">

        <div>
          <p className="section-label">
            ACTIVITY
          </p>

          <h3>
            Recent Activity
          </h3>

          <p className="section-description">
            Latest events across your platform
          </p>
        </div>

        <button
          className="more-button"
          aria-label="More options"
        >
          <MoreHorizontal size={19} />
        </button>

      </div>

      <div className="activity-list">

        {activities.map((activity, index) => {

          const Icon =
            activity.icon === "ai"
              ? Bot
              : User;

          return (
            <div
              className="activity-item"
              key={index}
            >

              <div className="activity-icon">
                <Icon size={16} />
              </div>

              <div className="activity-content">

                <strong>
                  {activity.title}
                </strong>

                <span>
                  {activity.description}
                </span>

              </div>

              <div className="activity-meta">

                <span className="activity-time">
                  <Clock3 size={11} />
                  {activity.time}
                </span>

                <span
                  className={
                    activity.status === "Success"
                      ? "activity-status success"
                      : "activity-status processing"
                  }
                >
                  {activity.status === "Success" ? (
                    <CheckCircle2 size={12} />
                  ) : (
                    <Clock3 size={12} />
                  )}

                  {activity.status}
                </span>

              </div>

            </div>
          );
        })}

      </div>

    </section>
  );
}