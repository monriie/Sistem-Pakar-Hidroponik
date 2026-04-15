const FACTOR_LABELS = {
  alat_dasar       : 'Kelengkapan alat dasar',
  nutrisi          : 'Kesiapan nutrisi',
  ph_air           : 'pH air',
  cahaya           : 'Intensitas cahaya',
  pestisida        : 'Rencana pengendalian hama',
  fundamental      : 'Kesiapan fundamental',
  param_lingkungan : 'Parameter lingkungan',
}

const STATUS_OK  = new Set(['siap', 'sesuai', 'cukup', 'pakai', 'lengkap', 'sebagian'])

export default function RecommendationList({ trace }) {
  if (!trace) return null

  const rows = [
    { key: 'alat_dasar',       value: trace.input_classified.alat_dasar },
    { key: 'nutrisi',          value: trace.input_classified.nutrisi },
    { key: 'fundamental',      value: trace.fundamental.value,       rule: trace.fundamental.firedRule },
    { key: 'ph_air',           value: trace.input_classified.ph_air },
    { key: 'cahaya',           value: trace.input_classified.cahaya },
    { key: 'param_lingkungan', value: trace.param_lingkungan.value,  rule: trace.param_lingkungan.firedRule },
    { key: 'pestisida',        value: trace.input_classified.pestisida },
  ]

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
        Rincian evaluasi
      </h3>
      {rows.map(({ key, value, rule }) => {
        const ok = STATUS_OK.has(value)
        return (
          <div
            key={key}
            className="flex items-center justify-between px-4 py-3
                       rounded-xl bg-white border border-gray-100"
          >
            <div>
              <p className="text-sm font-medium text-gray-700">
                {FACTOR_LABELS[key]}
              </p>
              {rule && (
                <p className="text-xs text-gray-400">{rule}</p>
              )}
            </div>
            <span className={`
              text-xs font-semibold px-2.5 py-1 rounded-full
              ${ok
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-600'}
            `}>
              {value}
            </span>
          </div>
        )
      })}
    </div>
  )
}