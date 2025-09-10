export default function Header() {
  return (
    <header className="w-full border-b border-gray-800 bg-gray-900/80 backdrop-blur sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white text-center">
          Simulador de Pauta
        </h1>
        <p className="text-base md:text-lg text-blue-400 mt-2 text-center">
          Publilatina · Míralo Ve
        </p>
      </div>
    </header>
  );
}
