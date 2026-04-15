import { READINESS_LEVELS } from '@/data/result'

export default function ResultCard({ tingkatKesiapan }) {
  const meta = READINESS_LEVELS[tingkatKesiapan]

  if (!meta) return null

  return (
    <div className={`rounded-2xl border p-6 space-y-3 ${meta.bgClass}`}>
      <div className="flex items-center gap-3">
        <span className={`w-3 h-3 rounded-full ${meta.colorClass}`} />
        <span className="text-xs font-semibold uppercase opacity-70">
          Tingkat Kesiapan
        </span>
      </div>

      <h2 className="text-2xl font-bold">{meta.label}</h2>

      <p className="text-sm opacity-80">
        {meta.description}
      </p>
    </div>
  )
}