import ResultCard from '../components/result/ResultCard.jsx'
import RecommendationList from '../components/result/RecommendationList.jsx'

export default function ResultPage({ result, onReset }) {
  if (!result) return null

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-xl mx-auto px-4 py-8 space-y-5">
        <h1 className="text-lg font-bold text-gray-800">Hasil Evaluasi</h1>

        <ResultCard tingkatKesiapan={result.tingkat_kesiapan} />

        <RecommendationList trace={result.trace} />

        <button
          onClick={onReset}
          className="w-full py-3 rounded-xl border-2 border-green-500
                     text-green-600 font-semibold text-sm hover:bg-green-50
                     transition-colors"
        >
          Ulangi Evaluasi
        </button>
      </div>
    </div>
  )
}