import QuestionCard from './QuestionCard'
import ProgressBar from './ProgressBar'

export default function QuizContainer({
  currentQuestion,
  currentIndex,
  totalQuestions,
  answers,
  canProceed,
  isLastQuestion,
  onAnswer,
  onNext,
  onPrev,
}) {
  return (
    <div className="max-w-xl mx-auto px-4 py-8 space-y-6">
      <ProgressBar current={currentIndex + 1} total={totalQuestions} />

      <div className="bg-white rounded-2xl border p-6">
        <QuestionCard
          question={currentQuestion}
          currentAnswer={answers[currentQuestion.id]}
          onAnswer={onAnswer}
        />
      </div>

      <div className="flex justify-between">
        <button
          onClick={onPrev}
          disabled={currentIndex === 0}
          className="btn-secondary"
        >
          ← Kembali
        </button>

        <button
          onClick={onNext}
          disabled={!canProceed}
          className="btn-primary"
        >
          {isLastQuestion ? 'Lihat Hasil →' : 'Lanjut →'}
        </button>
      </div>
    </div>
  )
}