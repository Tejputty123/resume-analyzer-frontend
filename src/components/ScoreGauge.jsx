import { RadialBarChart, RadialBar, PolarAngleAxis } from 'recharts';

export default function ScoreGauge({ score }) {
  const color = score >= 75 ? '#22c55e' : score >= 50 ? '#f59e0b' : '#ef4444';
  const data = [{ value: score, fill: color }];

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: 200, height: 140 }}>
        <RadialBarChart 
          width={200} 
          height={200} 
          innerRadius="65%" 
          outerRadius="100%"
          data={data} 
          startAngle={180} 
          endAngle={0}
          cx="50%"
          cy="100%"
        >
          <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
          <RadialBar background dataKey="value" cornerRadius={10} angleAxisId={0} />
        </RadialBarChart>
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-2">
          <p className="text-4xl font-bold" style={{ color }}>{score}</p>
          <p className="text-sm text-gray-500">ATS Score</p>
        </div>
      </div>
    </div>
  );
}