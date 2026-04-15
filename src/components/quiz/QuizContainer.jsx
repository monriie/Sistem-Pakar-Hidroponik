import QuestionCard from './QuestionCard'
import ProgressBar from './ProgressBar'
import { Button } from '../ui/button'

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

      {/* PROFILE BULAT */}
      <div className="flex justify-center">
        <div className="w-14 h-14 rounded-full bg-[hsl(var(--primary))] flex items-center justify-center text-white text-xl shadow-sm">
          <img src="./profile.png" alt="Profile" className="w-full h-full object-cover rounded-full" />
        </div>
      </div>

      {/* Progress */}
      <ProgressBar current={currentIndex + 1} total={totalQuestions} />

      {/* Card */}
      <div className="bg-white rounded-2xl border border-[hsl(var(--border))] p-6">
        <QuestionCard
          question={currentQuestion}
          currentAnswer={answers[currentQuestion.id]}
          onAnswer={onAnswer}
        />
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          onClick={onPrev}
          disabled={currentIndex === 0}
          className="btn-secondary"
        >
          ← Kembali
        </Button>

        <Button
          onClick={onNext}
          disabled={!canProceed}
          className="btn-primary"
        >
          {isLastQuestion ? 'Lihat Hasil →' : 'Lanjut →'}
        </Button>
      </div>
    </div>
  )
}