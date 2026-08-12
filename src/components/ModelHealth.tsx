import {
  CheckCircle2,
  CircleAlert,
  Cpu,
  MoreHorizontal,
} from "lucide-react";

import "./ModelHealth.css";

type Model = {
  name: string;
  type: string;
  status: "Operational" | "Degraded";
  usage: number;
  responseTime: string;
};

const models: Model[] = [
  {
    name: "GPT-4o",
    type: "Large Language Model",
    status: "Operational",
    usage: 82,
    responseTime: "1.18s",
  },
  {
    name: "Claude 3.5 Sonnet",
    type: "Large Language Model",
    status: "Operational",
    usage: 67,
    responseTime: "1.32s",
  },
  {
    name: "Llama 3.1 70B",
    type: "Open Source Model",
    status: "Operational",
    usage: 54,
    responseTime: "1.47s",
  },
  {
    name: "Gemini 1.5 Pro",
    type: "Multimodal Model",
    status: "Degraded",
    usage: 39,
    responseTime: "2.08s",
  },
];

export default function ModelHealth() {
  return (
    <section className="model-health-card">

      <div className="model-health-header">

        <div className="model-health-title">

          <div className="model-health-icon">
            <Cpu size={19} />
          </div>

          <div>
            <p className="section-label">
              AI INFRASTRUCTURE
            </p>

            <h3>
              Model Health
            </h3>

            <p className="section-description">
              Current status of your AI models
            </p>
          </div>

        </div>

        <button
          className="more-button"
          aria-label="More options"
        >
          <MoreHorizontal size={19} />
        </button>

      </div>

      <div className="model-list">

        {models.map((model) => (
          <div
            className="model-row"
            key={model.name}
          >

            <div className="model-info">

              <div className="model-avatar">
                <Cpu size={16} />
              </div>

              <div>
                <strong>
                  {model.name}
                </strong>

                <span>
                  {model.type}
                </span>
              </div>

            </div>

            <div className="model-status">

              {model.status === "Operational" ? (
                <CheckCircle2
                  size={14}
                  className="status-operational"
                />
              ) : (
                <CircleAlert
                  size={14}
                  className="status-degraded"
                />
              )}

              <span
                className={
                  model.status === "Operational"
                    ? "status-text operational"
                    : "status-text degraded"
                }
              >
                {model.status}
              </span>

            </div>

            <div className="model-usage">

              <div className="usage-label">
                <span>Usage</span>
                <strong>{model.usage}%</strong>
              </div>

              <div className="usage-bar">
                <i
                  style={{
                    width: `${model.usage}%`,
                  }}
                />
              </div>

            </div>

            <div className="response-time">

              <span>
                Response
              </span>

              <strong>
                {model.responseTime}
              </strong>

            </div>

          </div>
        ))}

      </div>

    </section>
  );
}