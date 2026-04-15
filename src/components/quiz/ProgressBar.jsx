import { motion } from 'framer-motion'

export default function ProgressBar({ current, total }) {
  const percent = Math.round((current / total) * 100)

  return (
    <div>
      <div className="flex justify-between text-xs text-gray-500 mb-1">
        <span className='text-sm'>Pertanyaan {current} dari {total}</span>
        <span className='text-sm'>{percent}%</span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <motion.div
          className="h-full bg-[hsl(var(--primary))]"
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  )
}