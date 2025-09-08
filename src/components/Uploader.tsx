import { useRef } from "react";

type UploaderProps = { onImageSelected: (img: HTMLImageElement) => void };

export default function Uploader({ onImageSelected }: UploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const img = new Image();
    img.onload = () => onImageSelected(img);
    img.src = URL.createObjectURL(file);
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleFileChange}
      />
      <button
        onClick={() => inputRef.current?.click()}
        className="w-full bg-blue-600 hover:bg-blue-500 text-white rounded-lg px-3 py-2 transition"
      >
        Seleccionar archivo
      </button>
    </>
  );
}
