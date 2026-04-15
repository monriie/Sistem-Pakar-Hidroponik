import { useLocation } from 'react-router'
import ResultCard from '../components/result/ResultCard'
import Loading from '@/components/ui/Loading'
import RecommendationList from '@/components/result/RecommendationList'
import FactorList from '@/components/result/FactorList'

export default function Result() {
  const { state } = useLocation()
  const loading = !state?.result

  if (!state?.result) return null

  const { result, answers } = state
  if (loading) return <Loading />

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-xl mx-auto px-4 py-8 space-y-5">
        <h1 className="text-lg font-bold">Hasil Evaluasi</h1>
        <ResultCard tingkatKesiapan={result.tingkatKesiapan} />
        <FactorList trace={result} answers={answers}/>
        <RecommendationList trace={result} />
        <button
          onClick={() => window.location.href = '/quiz'}
          className="w-full py-3 rounded-xl bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary)/0.8)] text-white font-semibold transition-colors duration-150"
        >
          Ulangi Evaluasi
        </button>
      </div>
    </div>
  )
}