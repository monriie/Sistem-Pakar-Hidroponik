export default function LoadingScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <img src="./loading.png" alt="Loading" className="w-70 h-auto mb-2" />

      <div className="flex gap-3">
        <span className="w-5 h-5 bg-[hsl(var(--primary))] rounded-full animate-bounce" />
        <span className="w-5 h-5 bg-[hsl(var(--primary))] rounded-full animate-bounce delay-100" />
        <span className="w-5 h-5 bg-[hsl(var(--primary))] rounded-full animate-bounce delay-200" />
      </div>
    </div>
  )
}