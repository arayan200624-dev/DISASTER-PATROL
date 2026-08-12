import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import "./UsageChart.css";

const usageData = [
  { day: "Mon", requests: 3200 },
  { day: "Tue", requests: 4100 },
  { day: "Wed", requests: 3800 },
  { day: "Thu", requests: 5200 },
  { day: "Fri", requests: 4700 },
  { day: "Sat", requests: 6100 },
  { day: "Sun", requests: 5800 },
];

export default function UsageChart() {
  return (
    <section className="usage-chart">

      <div className="usage-chart-header">

        <div>
          <p className="section-label">
            API USAGE
          </p>

          <h3>
            Requests overview
          </h3>

          <p className="section-description">
            API requests processed over the last 7 days
          </p>
        </div>

        <button className="chart-period">
          Last 7 days
        </button>

      </div>

      <div className="chart-wrapper">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <AreaChart
            data={usageData}
            margin={{
              top: 10,
              right: 10,
              left: -20,
              bottom: 0,
            }}
          >

            <defs>
              <linearGradient
                id="usageGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#786aff"
                  stopOpacity={0.35}
                />

                <stop
                  offset="100%"
                  stopColor="#786aff"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              stroke="#202535"
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#68738a",
                fontSize: 10,
              }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#68738a",
                fontSize: 10,
              }}
              tickFormatter={(value) =>
                `${value / 1000}k`
              }
            />

            <Tooltip
              contentStyle={{
                background: "#101522",
                border: "1px solid #202535",
                borderRadius: "8px",
                color: "#ffffff",
              }}
              labelStyle={{
                color: "#9da6b8",
              }}
              formatter={(value) => [
                `${Number(value).toLocaleString()} requests`,
                "Requests",
              ]}
            />

            <Area
              type="monotone"
              dataKey="requests"
              stroke="#786aff"
              strokeWidth={2}
              fill="url(#usageGradient)"
            />

          </AreaChart>
        </ResponsiveContainer>

      </div>

    </section>
  );
}