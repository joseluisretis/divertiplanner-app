import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { useAuthStore } from "../../stores/authStore";

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
    <header className="fixed top-0 w-full z-40 bg-surface border-b border-outline-variant/30">
      <div className="flex justify-between items-center w-full px-container-margin py-4">
        <div className="flex items-center gap-3">
          <div className="p-1 rounded-lg bg-primary-fixed-dim/20">
            <span className="material-symbols-outlined text-primary text-headline-lg-mobile" style={{ fontVariationSettings: "'FILL' 1" }}>
              celebration
            </span>
          </div>
          <h1 className="text-headline-lg-mobile font-headline-lg-mobile font-bold text-primary">
            DivertiPlanner
          </h1>
        </div>

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="w-[52px] h-[52px] rounded-full flex items-center justify-center bg-primary-container text-on-primary shadow-lg shadow-secondary-container/20 transition-all active:scale-90 hover:bg-primary cursor-pointer"
            aria-label="Menú de usuario"
          >
            <span className="material-symbols-outlined text-[32px]">account_circle</span>
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-surface-container-lowest rounded-lg shadow-lg border border-outline-variant/30 py-1 z-50">
              {user && (
                <div className="px-4 py-3 border-b border-outline-variant/20">
                  <p className="font-label-md text-on-surface truncate">{user.name}</p>
                  <p className="text-xs text-on-surface-variant truncate">{user.email}</p>
                </div>
              )}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-body-md text-error hover:bg-error/10 transition-colors"
              >
                <span className="material-symbols-outlined text-base">logout</span>
                Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
