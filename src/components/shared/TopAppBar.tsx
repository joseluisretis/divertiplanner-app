import Logo from "../../assets/logo.png";

export default function TopAppBar() {
  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-violet-100 shadow-[0_4px_20px_rgba(139,92,246,0.1)]">
      <div className="flex justify-between items-center w-full px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary-fixed rounded-lg text-primary">
            {/* <span className="material-symbols-outlined">celebration</span> */}
            <img src={Logo} alt="logo" width={40} height={40} />
          </div>
          <h1 className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-pink-500 font-['Plus_Jakarta_Sans']">
            DivertiPlanner
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex gap-6 text-slate-400 font-label-md">
            <span className="text-violet-700">
              Gestión
            </span>
            <span className="hover:text-violet-500 transition-colors cursor-pointer">
              Talento
            </span>
            <span className="hover:text-violet-500 transition-colors cursor-pointer">
              Clientes
            </span>
          </div>
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-container hover:scale-105 transition-transform cursor-pointer">
            <img
              alt="User avatar"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwsHiAh4km0vMwAtvGknwqqonmMK0JBrlFoEKrj279h159X3QszUAGl9jBS72qYJL-VMIWZfcHhUH9a1j_ZU3c_355mMlUJuqJREBDiUrdXurJNVfZUGjJsUZDoZTp9gYZnZONPwAMog7Kjo9blllBMH3vaRTwVvohG3z__DGgJV9tMLzHP5XCZFkPKd-bcgF8jz38mvajAZae9LShFjMIiu0qpYcb7kmSe7fs6_XvB0QHC_3hgmQ5NfMAYSflT40E0VR96DCRuLeg"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
