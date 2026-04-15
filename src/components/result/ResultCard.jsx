import { RESULT_META } from '../../data/rules.js'

const COLOR_MAP = {
  green : 'bg-green-50 border-green-200 text-green-800',
  teal  : 'bg-teal-50 border-teal-200 text-teal-800',
  amber : 'bg-amber-50 border-amber-200 text-amber-800',
  red   : 'bg-red-50 border-red-200 text-red-800',
}

const BADGE_MAP = {
  green : 'bg-green-500',
  teal  : 'bg-teal-500',
  amber : 'bg-amber-500',
  red   : 'bg-red-500',
}

export default function ResultCard({ tingkatKesiapan }) {
  const meta = RESULT_META[tingkatKesiapan]
  if (!meta) return null

  return (
    <div className={`rounded-2xl border-2 p-6 space-y-3 ${COLOR_MAP[meta.color]}`}>
      <div className="flex items-center gap-3">
        <span className={`w-3 h-3 rounded-full ${BADGE_MAP[meta.color]}`} />
        <span className="text-xs font-semibold uppercase tracking-wide opacity-70">
          Tingkat Kesiapan
        </span>
      </div>

      <h2 className="text-2xl font-bold">{meta.label}</h2>
      <p className="text-sm leading-relaxed opacity-80">{meta.description}</p>

      <div className="pt-2 border-t border-current border-opacity-20">
        <p className="text-xs font-semibold uppercase tracking-wide opacity-60 mb-1">
          Saran
        </p>
        <p className="text-sm leading-relaxed">{meta.advice}</p>
      </div>
    </div>
  )
}