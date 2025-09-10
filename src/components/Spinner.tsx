export default function Spinner() {
  return (
    <div className="absolute inset-0 bg-black/35 backdrop-blur-sm flex items-center justify-center rounded">
      <div className="animate-spin h-10 w-10 border-4 border-white/40 border-t-white rounded-full" />
    </div>
  );
}
