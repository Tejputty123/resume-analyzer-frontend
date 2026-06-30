import { RadialBarChart, RadialBar, PolarAngleAxis } from 'recharts';

export default function ScoreGauge({ score }) {
  const color = score >= 75 ? '#22c55e' : score >= 50 ? '#f59e0b' : '#ef4444';
  const data = [{ value: score, fill: color }];

  return (
    <div className="flex flex-col items-center justify-center" style={{ width: 220, height: 220 }}>
      <div className="relative" style={{ width: 220, height: 220 }}>
        <RadialBarChart
          width={220}
          height={220}
          innerRadius="70%"
          outerRadius="100%"
          data={data}
          startAngle={90}
          endAngle={-270}
          cx="50%"
          cy="50%"
        >
          <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
          <RadialBar background dataKey="value" cornerRadius={10} angleAxisId={0} />
        </RadialBarChart>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <p className="text-4xl font-bold" style={{ color }}>{score}</p>
          <p className="text-sm text-gray-500">ATS Score</p>
        </div>
      </div>
    </div>
  );
}