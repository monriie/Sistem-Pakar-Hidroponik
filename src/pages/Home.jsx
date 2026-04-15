export default function HomePage({ onStart }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center
                    px-4 py-12 bg-linear-to-b from-green-50 to-white">
      <div className="max-w-md w-full text-center space-y-6">
        {/* <div className="text-5xl">🌱</div> */}
        <h1 className="text-2xl font-bold text-gray-800">
          Evaluasi Kesiapan Budidaya Hidroponik
        </h1>
        <p className="text-gray-500 text-sm leading-relaxed">
          Sistem pakar ini akan membantu kamu mengetahui seberapa siap kamu
          untuk memulai budidaya hidroponik — sebelum proses tanam dimulai.
        </p>
        <p className="text-xs text-gray-400">
          5 pertanyaan · sekitar 2 menit
        </p>
        <button
          onClick={onStart}
          className="w-full py-3 rounded-xl bg-green-500 hover:bg-green-600
                     text-white font-semibold text-sm transition-colors"
        >
          Mulai Evaluasi
        </button>
      </div>
    </div>
  )
}