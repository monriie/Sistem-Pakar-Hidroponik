import { READINESS_LEVELS } from '@/data/result'

export default function ResultCard({ tingkatKesiapan }) {
  const meta = READINESS_LEVELS[tingkatKesiapan]
  if (!meta) return null

  const isGood = ['sangat_layak', 'layak']

  return (
    <div
      className={`
        p-6 rounded-2xl shadow-xs
        grid grid-cols-1 md:grid-cols-2
        items-center gap-6
        ${meta.bgClass}
      `}
    >
      <img
        src={isGood.includes(tingkatKesiapan)
          ? './happy.png'
          : './sad.png'}
        alt={isGood.includes(tingkatKesiapan)
          ? 'Happy'
          : 'Sad'}
        className="w-64 h-auto mx-auto"
      />

      <div>
        <h2 className="text-xl font-bold">
          {meta.label}
        </h2>

        <p className="text-sm text-[hsl(var(--muted-foreground))] mt-2">
          {meta.description}
        </p>
      </div>
    </div>
  )
}
