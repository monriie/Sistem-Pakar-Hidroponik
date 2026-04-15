import { motion, AnimatePresence } from 'framer-motion'
import OptionItem from './OptionItem'

export default function QuestionCard({
  question,
  currentAnswer,
  onAnswer,
}) {
  const isMulti = question.type === 'multi'

  const handleClick = (optionId) => {
    if (isMulti) {
      const prev = Array.isArray(currentAnswer) ? currentAnswer : []

      const next = prev.includes(optionId)
        ? prev.filter((v) => v !== optionId)
        : [...prev, optionId]

      onAnswer(question.id, next)
    } else {
      onAnswer(question.id, optionId)
    }
  }

  const isSelected = (optionId) => {
    if (isMulti) return currentAnswer?.includes(optionId)
    return currentAnswer === optionId
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={question.id}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -30 }}
        transition={{ duration: 0.25 }}
        className="space-y-4"
      >
        <div>
          <p className="text-lg font-semibold">
            {question.question}
          </p>
          {question.hint && (
            <p className="text-sm text-gray-400">
              {question.hint}
            </p>
          )}
        </div>

        <div className="space-y-2">
          {question.options.map((opt) => (
            <OptionItem
              key={opt.id}
              option={opt}
              type={question.type}
              selected={isSelected(opt.id)}
              onClick={() => handleClick(opt.id)}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}