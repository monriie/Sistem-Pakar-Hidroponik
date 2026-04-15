import { useNavigate } from 'react-router'

export default function Home() {
  const navigate = useNavigate()

  const handleStart = () => {
    navigate('/quiz')
  }

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-linear-to-b from-green-50 to-white">
      <div className="max-w-md w-full text-center space-y-6">
        <img src="./profile.png" alt="Profile" className="w-64 h-auto mx-auto" />
        <h1 className="text-2xl font-bold text-gray-800">
          Evaluasi Kesiapan Budidaya Hidroponik
        </h1>

        <p className="text-gray-500 text-sm">
          Sistem pakar untuk bantu kamu mulai hidroponik
        </p>

        <button
          onClick={handleStart}
          className="w-full py-3 rounded-xl bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary)/0.8)] text-white font-semibold"
        >
          Mulai Evaluasi
        </button>
      </div>
    </section>
  )
}