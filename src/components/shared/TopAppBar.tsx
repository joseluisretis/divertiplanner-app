import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { useAuthStore } from "../../store/authStore";

export default function TopAppBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleLogout() {
    setMenuOpen(false);
    await logout();
    navigate("/login");
  }

  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-violet-100 shadow-[0_4px_20px_rgba(139,92,246,0.1)]">
      <div className="flex justify-between items-center w-full px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary-fixed rounded-lg text-primary">
            <img src={Logo} alt="logo" width={40} height={40} />
          </div>
          <h1 className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-pink-500 font-['Plus_Jakarta_Sans']">
            DivertiPlanner
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex gap-6 text-slate-400 font-label-md">
            <span className="text-violet-700">Gestión</span>
            <span className="hover:text-violet-500 transition-colors cursor-pointer">Talento</span>
            <span className="hover:text-violet-500 transition-colors cursor-pointer">Clientes</span>
          </div>

          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-primary-fixed border-2 border-primary-container hover:scale-105 transition-transform cursor-pointer text-primary"
              aria-label="Menú de usuario"
            >
              <span className="material-symbols-outlined text-xl">person</span>
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-md shadow-lg border border-violet-100 py-1 z-50">
                {user && (
                  <div className="px-4 py-2 border-b border-violet-50">
                    <p className="text-sm font-semibold text-on-surface truncate">{user.name}</p>
                    <p className="text-xs text-slate-400 truncate">{user.email}</p>
                  </div>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <span className="material-symbols-outlined text-base">logout</span>
                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
