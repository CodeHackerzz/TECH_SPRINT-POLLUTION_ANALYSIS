import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from "recharts";
import { motion } from "framer-motion";

export default function TrendsChart({ data }) {
 
  const dangerPoint = data.find(d => d.aqi >= 150);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6"
    >
      <h2 className="text-xl font-semibold text-cyan-400 mb-1">
        24-Hour Air Quality Trend
      </h2>
      <p className="text-xs text-slate-400 mb-4">
        Green = Safe | Yellow = Moderate | Red = Dangerous
      </p>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="hour" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />

            <Tooltip
              content={({ payload }) => {
                if (!payload || !payload.length) return null;
                const aqi = payload[0].value;
                return (
                  <div className="bg-black/90 px-4 py-2 rounded-lg border border-white/20">
                    <p className="text-white font-semibold">
                      AQI: {Math.round(aqi)}
                    </p>
                    <p className="text-xs text-slate-400">
                      {aqi < 100 && "Air quality is safe"}
                      {aqi >= 100 && aqi < 150 && "Moderate – monitor closely"}
                      {aqi >= 150 && "Dangerous – action required"}
                    </p>
                  </div>
                );
              }}
            />

            {}
            <Line
              type="monotone"
              dataKey="aqi"
              strokeWidth={3}
              dot={false}
              stroke={(d) =>
                d.aqi >= 150
                  ? "#ef4444"
                  : d.aqi >= 100
                  ? "#facc15"
                  : "#22c55e"
              }
            />

            {}
            {dangerPoint && (
              <ReferenceLine
                x={dangerPoint.hour}
                stroke="red"
                strokeDasharray="4 4"
                label={{
                  value: "Danger level crossed",
                  position: "top",
                  fill: "red",
                  fontSize: 12
                }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
