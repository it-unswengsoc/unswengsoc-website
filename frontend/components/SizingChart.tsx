import { hexToRgba } from '@/lib/utils';
import { NIGHTSHIFT_CREAM, NIGHTSHIFT_BLACK } from '@/lib/merchProducts';

interface SizeRow {
  size: string;
  length: number;
  chest: number;
  shoulders: number;
  sleeves: number;
}

// Measurements (cm) from the official Nightshift sizing chart artwork.
const SIZE_ROWS: SizeRow[] = [
  { size: 'XS', length: 68.6, chest: 57.25, shoulders: 56, sleeves: 56.5 },
  { size: 'S', length: 69.9, chest: 61, shoulders: 57.2, sleeves: 57.8 },
  { size: 'M', length: 72.4, chest: 63.5, shoulders: 59.7, sleeves: 60.3 },
  { size: 'L', length: 74.9, chest: 66, shoulders: 61, sleeves: 62.2 },
  { size: 'XL', length: 78.7, chest: 68.5, shoulders: 63.5, sleeves: 65.4 },
];

const COLUMNS: { key: keyof SizeRow; label: string }[] = [
  { key: 'size', label: 'Size' },
  { key: 'length', label: 'Length' },
  { key: 'chest', label: 'Chest' },
  { key: 'shoulders', label: 'Shoulders' },
  { key: 'sleeves', label: 'Sleeves' },
];

// Coded table (not the campaign artwork's own sizing-chart image) so it stays
// crisp/accessible at any size, but themed to the same Nightshift palette.
export default function SizingChart({ accent }: { accent: string }) {
  return (
    <div className="border-2 p-4 md:p-5" style={{ borderColor: hexToRgba(accent, 0.4), backgroundColor: NIGHTSHIFT_BLACK }}>
      <span className="block font-mono text-[10px] tracking-widest uppercase mb-4" style={{ color: accent }}>
        Sizing Chart <span style={{ color: hexToRgba(NIGHTSHIFT_CREAM, 0.5) }}>(cm)</span>
      </span>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              {COLUMNS.map((col) => (
                <th
                  key={col.key}
                  className="pb-2 pr-4 font-mono text-[10px] tracking-widest uppercase font-bold whitespace-nowrap"
                  style={{ color: NIGHTSHIFT_CREAM, borderBottom: `1px solid ${hexToRgba(accent, 0.35)}` }}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SIZE_ROWS.map((row) => (
              <tr key={row.size}>
                {COLUMNS.map((col) => (
                  <td
                    key={col.key}
                    className="py-2 pr-4 font-mono text-xs whitespace-nowrap"
                    style={{
                      color: col.key === 'size' ? NIGHTSHIFT_CREAM : hexToRgba(NIGHTSHIFT_CREAM, 0.75),
                      fontWeight: col.key === 'size' ? 700 : 400,
                      borderBottom: `1px solid ${hexToRgba(accent, 0.15)}`,
                    }}
                  >
                    {row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
