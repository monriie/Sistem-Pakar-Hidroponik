import QuizContainer from '@/components/quiz/QuizContainer'
import useExpertSystem from '@/hooks/useExpertSystem'
import { QUESTIONS } from '@/data/questions'

export default function QuizPage() {
  const {
    currentIndex,
    currentQuestion,
    answers,
    isLastQuestion,
    handleAnswer,
    handleNext,
    handleBack,
    canProceed,
  } = useExpertSystem()

  if (!currentQuestion) return null

  return (
    <div className="min-h-screen bg-gray-50">
      <QuizContainer
        currentQuestion={currentQuestion}
        currentIndex={currentIndex}
        totalQuestions={QUESTIONS.length}
        answers={answers}
        canProceed={canProceed}
        isLastQuestion={isLastQuestion}
        onAnswer={handleAnswer}
        onNext={handleNext}
        onPrev={handleBack}
      />
    </div>
  )
}