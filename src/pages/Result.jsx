import { useLocation } from 'react-router'
import ResultCard from '../components/result/ResultCard'
import Loading from '@/components/ui/Loading'

export default function Result() {
  const { state } = useLocation()
  const loading = !state?.result

  if (!state?.result) return null

  const { result } = state
  if (loading) return <Loading />

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-xl mx-auto px-4 py-8 space-y-5">
        <h1 className="text-lg font-bold">Hasil Evaluasi</h1>

        <ResultCard tingkatKesiapan={result.tingkatKesiapan} />

        <button
          onClick={() => window.location.href = '/quiz'}
          className="w-full py-3 rounded-xl border border-green-500 text-green-600"
        >
          Ulangi Evaluasi
        </button>
      </div>
    </div>
  )
}