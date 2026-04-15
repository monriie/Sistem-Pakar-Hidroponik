import QuestionCard from './QuestionCard.jsx'
import ProgressBar from './ProgressBar.jsx'

export default function QuizContainer({
  currentQuestion,
  currentIndex,
  totalQuestions,
  answers,
  isAnswered,
  isLastQuestion,
  onAnswer,
  onNext,
  onPrev,
}) {
  return (
    <div className="max-w-xl mx-auto px-4 py-8 space-y-6">
      <ProgressBar current={currentIndex + 1} total={totalQuestions} />

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <QuestionCard
          question={currentQuestion}
          currentAnswer={answers[currentQuestion.id]}
          onAnswer={onAnswer}
        />
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={onPrev}
          disabled={currentIndex === 0}
          className="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-500
                     hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed
                     transition-colors"
        >
          ← Kembali
        </button>

        <button
          onClick={onNext}
          disabled={!isAnswered}
          className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white
                     bg-green-500 hover:bg-green-600 active:bg-green-700
                     disabled:opacity-40 disabled:cursor-not-allowed
                     transition-colors"
        >
          {isLastQuestion ? 'Lihat Hasil →' : 'Lanjut →'}
        </button>
      </div>
    </div>
  )
}