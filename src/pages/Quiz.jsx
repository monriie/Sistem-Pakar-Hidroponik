import QuizContainer from '@/components/quiz/QuizContainer'
import ResultPanel from '@/components/result/ResultPanel'
import useExpertSystem from '@/hooks/useExpertSystem'
import { QUESTIONS } from '@/data/questions'

export default function QuizPage() {
  const state = useExpertSystem()

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-gray-50">

      {/* LEFT: CHAT */}
      <div className=" bg-white">
        <QuizContainer {...state} totalQuestions={QUESTIONS.length} />
      </div>

      {/* RIGHT: RESULT */}
      <div className="bg-gray-50 shadow-sm">
        <ResultPanel {...state} />
      </div>

    </div>
  )
}