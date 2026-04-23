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
    {
      key:'alat',
      value:trace.classifiedAlat,
      cf:trace.cfAlat
    },
    {
      key:'nutrisi',
      value:trace.classifiedNutrisi,
      cf:trace.cfNutrisi
    },
    {
      key:'ph',
      value:trace.classifiedPh,
      cf:trace.cfPh
    },
    {
      key:'cahaya',
      value:trace.classifiedCahaya,
      cf:trace.cfCahaya
    },
    {
      key:'pestisida',
      value:trace.classifiedPestisida,
      cf:trace.cfPestisida
    },
  ]


  const getCFStyle = (cf) => {
    if (cf >= 0.8)
      return 'bg-emerald-50 text-emerald-700 border-emerald-200'

    if (cf >= 0.6)
      return 'bg-teal-50 text-teal-700 border-teal-200'

    if (cf >= 0.4)
      return 'bg-amber-50 text-amber-700 border-amber-200'

    return 'bg-gray-50 text-gray-600 border-gray-200'
  }

  return (
    <div className="space-y-2.5">
      {items.map(({ key, value, cf }) => {

        const meta = FACTOR_META[key]
        const display = meta.display[value]
        const detail = getAnswerLabel(key, answers[key])

        if (!display) return null

        return (
          <div
            key={key}
            className="
              p-4 rounded-xl
              shadow-sm bg-white
              space-y-2
            "
          >

            {/* HEADER */}
            <div className="flex justify-between items-center">

              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">
                  {meta.label}
                </span>
              </div>


              {/* status + CF badge */}
              <div className="flex items-center gap-2">

                <span
                  className={`
                    px-3 py-1 text-xs rounded-full font-medium
                    ${display.badgeClass}
                  `}
                >
                  {display.label}
                </span>

                <span
                  className={`
                    px-2.5 py-1
                    rounded-full
                    border
                    text-xs
                    font-semibold
                    ${getCFStyle(cf)}
                  `}
                >
                  CF {cf.toFixed(1)}
                </span>

              </div>

            </div>


            {/* DETAIL USER ANSWER */}
            <p className="text-xs text-gray-500">
              {detail || '-'}
            </p>

          </div>
        )
      })}
    </div>
  )
}
