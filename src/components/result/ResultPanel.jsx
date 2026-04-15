import { motion, AnimatePresence } from 'framer-motion'
import ResultCard from './ResultCard'
import FactorList from './FactorList'
import RecommendationList from './RecommendationList'
import Loading from '../ui/Loading'
import { READINESS_LEVELS } from '@/data/result'

export default function ResultPanel({
  answers,
  result,
  resetQuiz,
}) {
  const isComplete = !!result
  const meta = result ? READINESS_LEVELS[result.tingkatKesiapan] : null

  return (
    <div className="px-16 py-8 space-y-4">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-xl">Hasil Evaluasi</h2>

        {isComplete && meta && (
          <span
            className={`
              px-3 py-1 text-xs rounded-full font-medium
              ${meta.bgClass}
              ${meta.colorClass}
            `}
          >
            {meta.label}
          </span>
        )}
      </div>

      {/* CONTENT */}
      <AnimatePresence mode="wait">
        {!isComplete ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Loading />
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="space-y-3"
          >
            <ResultCard tingkatKesiapan={result.tingkatKesiapan} />

            <FactorList trace={result} answers={answers} />

            <RecommendationList trace={result} />

            {/* BUTTON RESET */}
            <button
              onClick={resetQuiz}
              className="w-full py-3 rounded-xl bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary)/0.8)] text-white font-semibold transition-colors duration-150"
            >
              Ulangi Evaluasi
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}