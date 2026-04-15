import { useState } from 'react'
import { useExpertSystem } from '@/hooks/useExpertSystem.js'
import HomePage   from '@/pages/Home.jsx'
import QuizPage   from '@/pages/Quiz.jsx'
import ResultPage from '@/pages/Result.jsx'

export default function App() {
  const [page, setPage] = useState('home')  // 'home' | 'quiz' | 'result'

  const {
    currentQuestion, currentIndex, totalQuestions,
    answers, result, isAnswered, isLastQuestion,
    setAnswer, next, prev, reset,
  } = useExpertSystem()

  function handleStart() { setPage('quiz') }

  function handleNext() {
    if (isLastQuestion) {
      next()          // trigger evaluate() di dalam hook
      setPage('result')
    } else {
      next()
    }
  }

  function handleReset() {
    reset()
    setPage('home')
  }

  if (page === 'home')   return <HomePage onStart={handleStart} />
  if (page === 'result') return <ResultPage result={result} onReset={handleReset} />

  return (
    <QuizPage
      currentQuestion={currentQuestion}
      currentIndex={currentIndex}
      totalQuestions={totalQuestions}
      answers={answers}
      isAnswered={isAnswered}
      isLastQuestion={isLastQuestion}
      onAnswer={setAnswer}
      onNext={handleNext}
      onPrev={prev}
    />
  )
}