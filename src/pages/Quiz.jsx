import QuizContainer from '../components/quiz/QuizContainer.jsx'

export default function QuizPage({
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
    <div className="min-h-screen bg-gray-50">
      <QuizContainer
        currentQuestion={currentQuestion}
        currentIndex={currentIndex}
        totalQuestions={totalQuestions}
        answers={answers}
        isAnswered={isAnswered}
        isLastQuestion={isLastQuestion}
        onAnswer={onAnswer}
        onNext={onNext}
        onPrev={onPrev}
      />
    </div>
  )
}