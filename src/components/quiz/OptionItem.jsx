import { motion } from 'framer-motion'

export default function OptionItem({
  option,
  selected,
  onClick,
  type = 'single',
}) {
  const isMulti = type === 'multi'

  const baseStyle =
    'w-full text-left px-4 py-3 rounded-xl border-2 transition-all duration-150'

  const activeStyle =
    'border-[hsl(var(--primary))] bg-[hsl(var(--soft))] text-[hsl(var(--foreground))]'

  const inactiveStyle =
    'border-gray-200 bg-white hover:border-[hsl(var(--primary))] hover:bg-gray-300/20 text-gray-700'

  const indicatorShape = isMulti ? 'rounded-sm' : 'rounded-full'

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.01 }}
      onClick={onClick}
      className={`${baseStyle} ${selected ? activeStyle : inactiveStyle}`}
    >
      <div className="flex items-start gap-3">

        {/* Indicator */}
        <div
          className={`
            mt-0.5 shrink-0 w-4 h-4 border-2 flex items-center justify-center
            ${indicatorShape}
            ${selected? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary))]': 'border-[hsl(var(--border))]'}
          `}
        >
          {selected && (
            <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 12 12">
              <path
                d="M10 3L5 8.5 2 5.5"
                stroke="white"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>

        {/* Label */}
        <div>
          <p className="text-sm font-medium">{option.label}</p>
          {option.sublabel && (
            <p className="text-xs text-gray-400">{option.sublabel}</p>
          )}
        </div>
      </div>
    </motion.button>
  )
}