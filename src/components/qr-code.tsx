import Svg, { Path } from 'react-native-svg';

// Renders a precomputed QR module matrix ('1' = dark). Includes the standard
// 4-module quiet zone so scanners lock on reliably. Dark runs are merged per
// row so anti-aliasing doesn't leave seams between modules.
export function QrCode({ rows, size = 180, color = '#000000' }: { rows: string[]; size?: number; color?: string }) {
  const n = rows.length + 8;
  let d = '';
  rows.forEach((row, y) => {
    for (const m of row.matchAll(/1+/g)) d += `M${m.index + 4} ${y + 4}h${m[0].length}v1.02h-${m[0].length}z`;
  });
  return (
    <Svg width={size} height={size} viewBox={`0 0 ${n} ${n}`}>
      <Path d={d} fill={color} />
    </Svg>
  );
}
