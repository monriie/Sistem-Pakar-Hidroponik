import { FACTOR_META } from '@/data/result'
import { QUESTIONS } from '@/data/questions'

export default function FactorList({ trace, answers }) {
  const getQuestion = (id) =>
    QUESTIONS.find((q) => q.id === id)

  const getAnswerLabel = (qId, value) => {
    const q = getQuestion(qId)
    if (!q) return '-'

    if (q.type === 'multi') {
      return value
        ?.map((v) => q.options.find((o) => o.id === v)?.label)
        .filter(Boolean)
        .join(', ')
    }

    return q.options.find((o) => o.id === value)?.label
  }

  const items = [
    { key: 'alat', value: trace.classifiedAlat },
    { key: 'nutrisi', value: trace.classifiedNutrisi },
    { key: 'ph', value: trace.classifiedPh },
    { key: 'cahaya', value: trace.classifiedCahaya },
    { key: 'pestisida', value: trace.classifiedPestisida },
  ]

  return (
    <div className="space-y-2.5">
      <h3 className="font-semibold text-[hsl(var(--foreground))]">
        Rincian Faktor
      </h3>

      {items.map(({ key, value }) => {
        const meta = FACTOR_META[key]
        const display = meta.display[value]
        const detail = getAnswerLabel(key, answers[key])

        if (!display) return null

        return (
          <div
            key={key}
            className="p-4 rounded-xl shadow-sm bg-white space-y-1"
          >
            {/* Header */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${display.dot}`} />
                <span className="font-medium">{meta.label}</span>
              </div>

              <span
                className={`
                  px-3 py-1 text-xs rounded-full font-medium
                  ${display.badgeClass}
                  bg-opacity-10
                `}
              >
                {display.label}
              </span>
            </div>

            {/* DETAIL JAWABAN USER */}
            <p className="text-xs text-gray-500">
              {detail || '-'}
            </p>
          </div>
        )
      })}
    </div>
  )
}