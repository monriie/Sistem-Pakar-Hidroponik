import OptionItem from './OptionItem.jsx'

export default function QuestionCard({ question, currentAnswer, onAnswer }) {
  const isMulti = question.type === 'multi_select'

  function handleOptionClick(optionValue, optionIndex) {
    if (isMulti) {
      // Toggle nilai dalam array (pakai index karena value bisa duplikat di nutrisi/ph)
      const prev = Array.isArray(currentAnswer) ? currentAnswer : []
      const next = prev.includes(optionValue)
        ? prev.filter((v) => v !== optionValue)
        : [...prev, optionValue]
      onAnswer(question.id, next)
    } else {
      // Single select: simpan value langsung
      onAnswer(question.id, optionValue)
    }
  }

  function isSelected(optionValue, optionIndex) {
    if (isMulti) {
      return Array.isArray(currentAnswer) && currentAnswer.includes(optionValue)
    }
    return currentAnswer === optionValue
  }

  return (
    <div className="space-y-4">
      <div>
        <p className="text-lg font-semibold text-gray-800 leading-snug">
          {question.text}
        </p>
        {question.hint && (
          <p className="text-sm text-gray-400 mt-1">{question.hint}</p>
        )}
      </div>

      <div className="space-y-2">
        {question.options.map((option, idx) => (
          <OptionItem
            key={idx}
            option={option}
            type={question.type}
            selected={isSelected(option.value, idx)}
            onClick={() => handleOptionClick(option.value, idx)}
          />
        ))}
      </div>
    </div>
  )
}