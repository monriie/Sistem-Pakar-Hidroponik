import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router'
import { QUESTIONS } from '@/data/questions'
import { runExpertSystem } from '@/engine/expertSystem'

const INITIAL_ANSWERS = {
  alat:      [],
  nutrisi:   null,
  ph:        null,
  cahaya:    null,
  pestisida: null,
}

/**
 * Custom hook yang mengelola seluruh state kuis dan menjalankan expert system.
 *
 * @returns {{
 *   currentIndex:  number,
 *   currentQuestion: import('../data/questions').Question,
 *   answers:       typeof INITIAL_ANSWERS,
 *   isLastQuestion: boolean,
 *   handleAnswer:  (value: string) => void,
 *   handleNext:    () => void,
 *   handleBack:    () => void,
 *   canProceed:    boolean,
 *   result:        import('../engine/expertSystem').EvaluationResult | null,
 *   resetQuiz:     () => void,
 * }}
 */
const useExpertSystem = () => {
  const navigate = useNavigate()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState(INITIAL_ANSWERS)
  const [result, setResult] = useState(null)

  const currentQuestion  = QUESTIONS[currentIndex]
  const isLastQuestion   = currentIndex === QUESTIONS.length - 1

  /** Cek apakah pertanyaan saat ini sudah dijawab */
  const canProceed = (() => {
    const { id, type } = currentQuestion
    if (type === 'multi') return (answers[id] ?? []).length > 0
    return answers[id] !== null
  })()

  /**
   * Handle pilihan jawaban.
   * Multi → toggle item di array; Single → simpan langsung.
   */
  const handleAnswer = useCallback((questionId, value) => {
  setAnswers((prev) => ({
    ...prev,
    [questionId]: value,
  }))
}, [])

  const handleNext = useCallback(() => {
    if (!canProceed) return

    if (isLastQuestion) {
      const evaluated = runExpertSystem(answers, QUESTIONS)
      setResult(evaluated)
      // navigate('/result', { state: { result: evaluated, answers } })
      return
    }

    setCurrentIndex((prev) => prev + 1)
  }, [canProceed, isLastQuestion, answers, navigate])

  const handleBack = useCallback(() => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1)
    else navigate('/')
  }, [currentIndex, navigate])

  const resetQuiz = useCallback(() => {
    setCurrentIndex(0)
    setAnswers(INITIAL_ANSWERS)
    setResult(null)
    navigate('/quiz')
  }, [navigate])

  return {
    currentIndex,
    currentQuestion,
    answers,
    isLastQuestion,
    handleAnswer,
    handleNext,
    handleBack,
    canProceed,
    result,
    resetQuiz,
  }
}

export default useExpertSystem