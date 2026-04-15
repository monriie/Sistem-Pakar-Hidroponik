import { useState, useCallback } from 'react'
import { QUESTIONS } from '../data/questions.js'
import { evaluate } from '../engine/forwardChaining.js'

const TOTAL = QUESTIONS.length

export function useExpertSystem() {
  const [currentIndex, setCurrentIndex]  = useState(0)
  const [answers, setAnswers]            = useState({})   // { [question.id]: value }
  const [result, setResult]              = useState(null)
  const [error, setError]                = useState(null)

  const currentQuestion = QUESTIONS[currentIndex]
  const isLastQuestion  = currentIndex === TOTAL - 1
  const progress        = Math.round(((currentIndex) / TOTAL) * 100)

  // Simpan jawaban untuk soal sekarang
  const setAnswer = useCallback((questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
  }, [])

  // Lanjut ke soal berikutnya atau langsung evaluasi jika soal terakhir
  const next = useCallback(() => {
    if (isLastQuestion) {
      try {
        const output = evaluate(answers)
        setResult(output)
      } catch (e) {
        setError(e.message)
      }
    } else {
      setCurrentIndex((i) => i + 1)
    }
  }, [isLastQuestion, answers])

  // Kembali ke soal sebelumnya
  const prev = useCallback(() => {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1)
  }, [currentIndex])

  // Reset semua state ke awal
  const reset = useCallback(() => {
    setCurrentIndex(0)
    setAnswers({})
    setResult(null)
    setError(null)
  }, [])

  // Cek apakah soal sekarang sudah dijawab (untuk enable/disable tombol Next)
  const currentAnswer = answers[currentQuestion?.id]
  const isAnswered = currentQuestion?.type === 'multi_select'
    ? Array.isArray(currentAnswer) && currentAnswer.length > 0
    : currentAnswer !== undefined

  return {
    // state
    currentQuestion,
    currentIndex,
    answers,
    result,
    error,
    progress,
    isLastQuestion,
    isAnswered,
    totalQuestions: TOTAL,
    // actions
    setAnswer,
    next,
    prev,
    reset,
  }
}