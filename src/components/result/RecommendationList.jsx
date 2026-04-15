import { FACTOR_META } from '@/data/result'

export default function RecommendationList({ trace }) {
  if (!trace) return null

  const items = [
    { key: 'alat', value: trace.classifiedAlat },
    { key: 'nutrisi', value: trace.classifiedNutrisi },
    { key: 'ph', value: trace.classifiedPh },
    { key: 'cahaya', value: trace.classifiedCahaya },
    { key: 'pestisida', value: trace.classifiedPestisida },
  ]

  const recommendations = items
    .map(({ key, value }) => {
      const meta = FACTOR_META[key]
      const text = meta?.recommendations?.[value]
      return text ? { key, text } : null
    })
    .filter(Boolean)

  if (recommendations.length === 0) return null

  return (
    <div className="mt-4 space-y-3">
      <h3 className="text-sm font-semibold text-[hsl(var(--foreground))]">
        Rekomendasi Perbaikan
      </h3>

      {recommendations.map((rec, i) => (
        <div
          key={i}
          className="p-4 rounded-xl bg-[hsl(var(--soft))] shadow-sm"
        >
          <p className="text-sm text-[hsl(var(--foreground))]">
            {rec.text}
          </p>
        </div>
      ))}
    </div>
  )
}