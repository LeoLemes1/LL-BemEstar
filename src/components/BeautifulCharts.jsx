import React from 'react';

// Beautiful responsive line chart for weight progress
export function WeightProgressChart({ data = [] }) {
  const width = 800;
  const height = 260;
  const padding = { top: 24, right: 24, bottom: 36, left: 40 };

  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;

  const values = data.map(d => d.value);
  const minY = Math.min(...values) - 1;
  const maxY = Math.max(...values) + 1;

  const x = (i) => (i / (data.length - 1)) * innerWidth;
  const y = (v) => innerHeight - ((v - minY) / (maxY - minY)) * innerHeight;

  const pathD = data
    .map((d, i) => `${i === 0 ? 'M' : 'L'} ${padding.left + x(i)} ${padding.top + y(d.value)}`)
    .join(' ');

  const areaD = [
    `M ${padding.left} ${padding.top + y(data[0].value)}`,
    ...data.slice(1).map((d, i) => `L ${padding.left + x(i + 1)} ${padding.top + y(d.value)}`),
    `L ${padding.left + innerWidth} ${padding.top + innerHeight}`,
    `L ${padding.left} ${padding.top + innerHeight}`,
    'Z'
  ].join(' ');

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-64">
      <defs>
        <linearGradient id="lineGrad" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="50%" stopColor="#14b8a6" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
        <linearGradient id="areaGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#22c55e" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
        </linearGradient>
        <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Axes */}
      <g transform={`translate(${padding.left}, ${padding.top})`}>
        <line x1="0" y1={innerHeight} x2={innerWidth} y2={innerHeight} stroke="#e5e7eb" />
        <line x1="0" y1="0" x2="0" y2={innerHeight} stroke="#e5e7eb" />

        {/* Y ticks */}
        {[0, 0.25, 0.5, 0.75, 1].map((t, i) => {
          const yPos = innerHeight - t * innerHeight;
          const val = (minY + (maxY - minY) * t).toFixed(1);
          return (
            <g key={i}>
              <line x1="0" y1={yPos} x2={innerWidth} y2={yPos} stroke="#f3f4f6" />
              <text x={-10} y={yPos} textAnchor="end" dominantBaseline="middle" fontSize="10" fill="#6b7280">
                {val}
              </text>
            </g>
          );
        })}

        {/* X labels */}
        {data.map((d, i) => (
          <text key={d.label} x={x(i)} y={innerHeight + 18} textAnchor="middle" fontSize="10" fill="#6b7280">
            {d.label}
          </text>
        ))}
      </g>

      {/* Area fill */}
      <path d={areaD} fill="url(#areaGrad)" />
      {/* Line with glow */}
      <path d={pathD} fill="none" stroke="url(#lineGrad)" strokeWidth="3.5" filter="url(#softGlow)" />

      {/* Points */}
      {data.map((d, i) => (
        <g key={i}>
          <circle cx={padding.left + x(i)} cy={padding.top + y(d.value)} r="4" fill="#ffffff" stroke="#22c55e" strokeWidth="2" />
        </g>
      ))}
    </svg>
  );
}

// Gorgeous donut chart for macros
export function MacrosDonutChart({ protein = 0, carbs = 0, fat = 0 }) {
  const size = 260;
  const stroke = 22;
  const radius = (size - stroke) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * radius;

  const total = protein + carbs + fat || 1;
  const segments = [
    { label: 'Proteínas', value: protein, color: '#3b82f6' },
    { label: 'Carboidratos', value: carbs, color: '#22c55e' },
    { label: 'Gorduras', value: fat, color: '#f59e0b' }
  ];

  let offset = 0;
  const arcs = segments.map((seg, i) => {
    const fraction = seg.value / total;
    const length = circumference * fraction;
    const dashArray = `${length} ${circumference - length}`;
    const dashOffset = circumference - offset;
    offset += length;
    return { ...seg, dashArray, dashOffset };
  });

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-64">
      <defs>
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#111827" floodOpacity="0.15" />
        </filter>
      </defs>
      <g transform={`rotate(-90 ${cx} ${cy})`}>
        <circle cx={cx} cy={cy} r={radius} fill="none" stroke="#f3f4f6" strokeWidth={stroke} />
        {arcs.map((arc, i) => (
          <circle
            key={arc.label}
            cx={cx}
            cy={cy}
            r={radius}
            fill="none"
            stroke={arc.color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={arc.dashArray}
            strokeDashoffset={arc.dashOffset}
            filter="url(#shadow)"
          />
        ))}
      </g>
      <g>
        <text x={cx} y={cy - 4} textAnchor="middle" className="fill-gray-800" fontSize="20" fontWeight="700">Macros</text>
        <text x={cx} y={cy + 18} textAnchor="middle" className="fill-gray-500" fontSize="12">distribuição diária</text>
      </g>
      <g transform={`translate(${cx}, ${cy + radius + 24})`}>
        {segments.map((s, i) => (
          <g key={s.label} transform={`translate(${(-90) + i * 95}, 0)`}>
            <rect width="10" height="10" rx="2" fill={s.color} />
            <text x="14" y="9" fontSize="11" className="fill-gray-600">{s.label}</text>
          </g>
        ))}
      </g>
    </svg>
  );
}

export default {
  WeightProgressChart,
  MacrosDonutChart
};


