export default function Header() {
  return (
    <header className="w-full border-b border-gray-800 bg-gray-900/80 backdrop-blur sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
        <div className="size-3 rounded-full bg-blue-500" />
        <h1 className="text-lg md:text-xl font-semibold text-white">
          Simulador de Pauta · <span className="text-blue-400">Publilatina</span>
        </h1>
        <span className="ml-auto text-xs text-gray-400">MVP · Míralo Ve</span>
      </div>
    </header>
  );
}
