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
  handleAnswer,
  handleNext,
  handleBack,
}) {
  return (
    <div className="max-w-2xl mx-auto px-2 py-8 space-y-6">

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
          onAnswer={handleAnswer}
        />
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          onClick={handleBack}
          disabled={currentIndex === 0}
          className="text-base text-gray-500 hover:text-gray-800 disabled:text-gray-500"
        >
          ← Kembali
        </Button>

        <Button
          onClick={handleNext}
          disabled={!canProceed}
          className="text-base text-gray-500 hover:text-[hsl(var(--foreground))] disabled:text-gray-500"
        >
          {isLastQuestion ? 'Lihat Hasil →' : 'Lanjut →'}
        </Button>
      </div>
    </div>
  )
}