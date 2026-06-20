import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function FloatingActionBtn() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={menuRef}
      className="fixed bottom-24 right-container-margin flex flex-col items-end gap-3 z-50"
    >
      <div
        className={`flex flex-col items-end gap-3 transition-all duration-300 ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <button 
          onClick={() => navigate('/register')}
          className="flex items-center gap-3 bg-white text-on-surface px-4 py-2 rounded-full shadow-lg border border-primary-fixed-dim hover:bg-surface-container-high transition-colors bouncy-press">
          <span className="font-label-md">Registro por Formulario</span>
          <div className="w-10 h-10 bg-primary-fixed text-primary rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined">description</span>
          </div>
        </button>
        <button className="flex items-center gap-3 bg-white text-on-surface px-4 py-2 rounded-full shadow-lg border border-primary-fixed-dim hover:bg-surface-container-high transition-colors bouncy-press">
          <span className="font-label-md">Registro por IA</span>
          <div className="w-10 h-10 bg-secondary-container text-on-secondary-container rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined">auto_awesome</span>
          </div>
        </button>
      </div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-container-margin w-16 h-16 bg-primary-container text-on-primary rounded-full flex items-center justify-center shadow-xl shadow-secondary/30 z-50 transition-transform active:scale-90 duration-200"
      >
        <span
          className={`material-symbols-outlined text-[32px] transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
        >
          add
        </span>
      </button>
    </div>
  );
}
