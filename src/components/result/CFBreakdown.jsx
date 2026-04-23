import { motion } from 'framer-motion'

// ─────────────────────────────────────────────
// Interpretasi Durkin (0–1 subset)
// ─────────────────────────────────────────────
const getCFPhrase = (cf) => {
  if (cf >= 1.0) return 'Definitely'
  if (cf >= 0.8) return 'Almost Certainly'
  if (cf >= 0.6) return 'Probably Yes'
  if (cf >= 0.4) return 'Probably'
  if (cf >= 0.2) return 'Maybe'
  return 'Defenitely Not'
}

function Divider() {
  return <hr className="border-gray-100 my-2" />
}

function Line({ label, value }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-gray-600">{label}</span>
      <span className="font-mono font-medium text-gray-800">
        {value.toFixed(2)}
      </span>
    </div>
  )
}

function FormulaRow({ rule, formula, result }) {
  return (
    <div className="rounded-xl bg-gray-50 border border-gray-200 px-4 py-3 space-y-1">
      <div className="flex justify-between">
        <span className="text-xs font-semibold text-[hsl(var(--primary))]">
          {rule}
        </span>

        <span className="text-xs font-mono font-medium">
          = {result.toFixed(2)}
        </span>
      </div>

      <p className="text-[11px] font-mono text-gray-500 break-all leading-relaxed">
        {formula}
      </p>
    </div>
  )
}

export default function CFBreakdown({ result }) {
  if (!result) return null

  const {
    rs2,
    rs3,
    ruleApplied,
    formula,
    cfFinal,

    cfAlat,
    cfNutrisi,
    cfPh,
    cfCahaya,
    cfPestisida,
  } = result

  const accepted = cfFinal >= 0.5

  return (
    <motion.div
      initial={{opacity:0,y:8}}
      animate={{opacity:1,y:0}}
      transition={{duration:0.3}}
      className="
        bg-white
        rounded-2xl
        border border-[hsl(var(--border))]
        p-5
        space-y-4
      "
    >
      {/* ================= RULE CALC ================= */}

      <div className="space-y-3">
        <h3 className="font-semibold text-sm text-gray-800">
          Perhitungan CF Rule
        </h3>

        <FormulaRow
          rule={`${rs2.ruleApplied} (Fundamental)`}
          formula={rs2.formula}
          result={rs2.cf}
        />

        <FormulaRow
          rule={`${rs3.ruleApplied} (Parameter)`}
          formula={rs3.formula}
          result={rs3.cf}
        />

        <FormulaRow
            rule={`${ruleApplied} (Final)`}
            formula={formula}
            result={cfFinal}
        />
      </div>

      <Divider />

      {/* ================= FINAL SUMMARY ================= */}

      <div className="space-y-2 pt-3">
        <div className="flex justify-between items-start">
          <div>
            <p className="font-semibold text-sm">
              CF Final = {cfFinal.toFixed(2)}
            </p>

            <p className="text-xs italic text-gray-500">
              ({getCFPhrase(cfFinal)})
            </p>
          </div>

          <div className="text-right">
            <p
              className={`text-xs font-semibold ${
                accepted
                  ? 'text-emerald-600'
                  : 'text-rose-500'
              }`}
            >
              {accepted ? 'Diterima' : 'Tidak diterima'}
            </p>
          </div>
        </div>

        {/* bar final */}
        <div className="relative">
          <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
            <motion.div
              className={`
                h-full rounded-full
                ${
                  cfFinal >=0.8
                    ? 'bg-emerald-500'
                    : cfFinal >=0.6
                    ? 'bg-teal-500'
                    : cfFinal >=0.4
                    ? 'bg-amber-500'
                    : 'bg-gray-400'
                }
              `}
              initial={{width:0}}
              animate={{
                width:`${cfFinal*100}%`
              }}
              transition={{
                duration:0.8,
                ease:'easeOut'
              }}
            />
          </div>

          {/* marker threshold */}
          <div
            className="
              absolute top-0 h-3
              w-px bg-gray-500 opacity-40
            "
            style={{left:'50%'}}
          />
        </div>

        <div className="flex justify-between text-[10px] text-gray-400">
          <span>0.0</span>
          <span className="font-medium text-gray-500">
            0.5 threshold
          </span>
          <span>1.0</span>
        </div>
      </div>

    </motion.div>
  )
}
