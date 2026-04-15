export default function OptionItem({ option, selected, onClick, type }) {
  const isMulti = type === 'multi_select'

  return (
    <button
      onClick={onClick}
      className={`
        w-full text-left px-4 py-3 rounded-xl border-2 transition-all duration-150
        ${selected
          ? 'border-green-500 bg-green-50 text-green-800'
          : 'border-gray-200 bg-white hover:border-green-300 hover:bg-green-50/40 text-gray-700'}
      `}
    >
      <div className="flex items-start gap-3">
        {/* Checkbox / Radio visual */}
        <div className={`
          mt-0.5 shrink-0 w-4 h-4 rounded-${isMulti ? 'sm' : 'full'} border-2 flex items-center justify-center
          ${selected ? 'border-green-500 bg-green-500' : 'border-gray-300'}
        `}>
          {selected && (
            <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 12 12">
              <path d="M10 3L5 8.5 2 5.5" stroke="white" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </svg>
          )}
        </div>

        {/* Label */}
        <div>
          <p className="text-sm font-medium leading-snug">{option.label}</p>
          {option.sublabel && (
            <p className="text-xs text-gray-400 mt-0.5">{option.sublabel}</p>
          )}
        </div>
      </div>
    </button>
  )
}