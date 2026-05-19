import type { FormEvent } from "react";
import { useRef, useState } from "react";

import logo from "./assets/logo.png";
import { useAuthStore } from "./store/authStore";

export default function LoginScreen() {
  const { login, isLoading, error, clearError } = useAuthStore();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    clearError();
    const email = emailRef.current?.value ?? "";
    const password = passwordRef.current?.value ?? "";
    await login(email, password);
  };

  return (
    <div className="bg-surface font-body-md text-on-surface selection:bg-primary-fixed min-h-screen">
      <main className="min-h-screen flex flex-col items-center justify-center p-container-padding relative overflow-hidden h-screen">
        {/* Background Decorative Elements */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="w-full max-w-[480px] z-10 flex flex-col items-center">
          {/* Logo Section */}
          <div className="mb-stack-lg flex flex-col items-center gap-stack-sm">
            <img
              alt="Logo"
              className="object-contain w-[200px] h-[200px]"
              src={logo}
            />
            <h1 className="font-h1 text-h1 text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              DivertiPlanner
            </h1>
          </div>

          {/* Login Card */}
          <div className="w-full bg-surface-container-lowest border border-primary/10 rounded-lg p-container-padding bouncy-shadow md:p-[48px]">
            <header className="text-center mb-stack-lg">
              {/* <h2 className="font-h2 text-h2 text-on-background mb-stack-sm">
                ¡Hola de nuevo!
              </h2> */}
              <p className="font-body-lg text-on-surface-variant">
                Bienvenid@ a la app para organizar fiestas inolvidables.
              </p>
            </header>

            <form className="space-y-stack-md" onSubmit={handleLogin}>
              <div className="space-y-unit">
                <label
                  className="font-label-md text-label-md text-on-surface-variant block ml-unit"
                  htmlFor="email"
                >
                  Usuario
                </label>
                <input
                  ref={emailRef}
                  className="w-full h-[56px] px-gutter bg-surface-container-low border-none rounded-DEFAULT focus:ring-2 focus:ring-primary-container text-body-md transition-all placeholder:text-outline-variant"
                  id="email"
                  name="email"
                  placeholder="Nombre de usuario"
                />
              </div>

              <div className="space-y-unit">
                <div className="flex justify-between items-center ml-unit">
                  <label
                    className="font-label-md text-label-md text-on-surface-variant"
                    htmlFor="password"
                  >
                    Contraseña
                  </label>
                  <a
                    className="font-label-sm text-label-sm text-primary hover:text-secondary transition-colors"
                    href="#"
                  >
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
                <div className="relative">
                  <input
                    ref={passwordRef}
                    className="w-full h-[56px] px-gutter bg-surface-container-low border-none rounded-DEFAULT focus:ring-2 focus:ring-primary-container text-body-md transition-all placeholder:text-outline-variant"
                    id="password"
                    name="password"
                    placeholder="Contraseña"
                    type={showPassword ? "text" : "password"}
                  />
                  <button
                    className="absolute right-gutter top-1/2 -translate-y-1/2 text-outline"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <span className="material-symbols-outlined">
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
              </div>

              {error && (
                <p className="font-body-md text-error text-center">{error}</p>
              )}

              <button
                className="w-full h-[64px] bg-linear-to-r from-primary to-secondary text-on-primary font-h3 text-h3 rounded-full bouncy-hover bouncy-active shadow-lg shadow-primary/20 transition-all mt-stack-lg disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={isLoading}
                type="submit"
              >
                {isLoading ? "Accediendo..." : "Acceder a la fiesta"}
              </button>
            </form>
          </div>
        </div>

        {/* Decorative Floating Image for Ambiance */}
        <div className="hidden lg:block absolute right-[5%] bottom-[10%] w-[300px] h-[400px] rounded-xl overflow-hidden bouncy-shadow -rotate-3 border-4 border-white">
          <img
            alt="imagen-1"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9Rqu3UQqs-4AELN9MNfUIJKHcLDf3zkW_ZJZ2_6o1cKd97alL0ChutQ5GaJTLQy9VO3Cr37IbI8G7NfpQDyWmIxO0AjH6S3X69EqjnzVVtr9RwElgba52tJLIlFHQWglom52jZRa3Gml9VvEFpAysWKFRYrlIGl3FH8wZIDfOKiqkd-s01Xg4syhW4bs4Qhp1LXYvz2Fu7p1fQ-MxzQ7tI6U2t-5n09pSSfluvZ78K5IndLSxNkgCA5YC7lVL85Z8S3ANCYAKXk2L"
          />
        </div>
        <div className="hidden lg:block absolute left-[5%] top-[15%] w-[250px] h-[300px] rounded-xl overflow-hidden bouncy-shadow rotate-6 border-4 border-white">
          <img
            alt="imagen-2"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4_eSktOsTYKOlKEm3qBfiqphfnJxHS-AfDuMUp9EmpLbFihMPMPU2W7AURw-Z1HM7uu32IuiTTiLHbB_6Q_xLFsb2ykXsArv7sXaB76-fiM8V92Bw42DTWooKTWt1Dn6QEVJta3pYgXVTycgDf2nmknPrwKQ0UouWGz6qiLiMI8sx9SC5AGw9RXdba38W_w9H2zbXL0A8B7eJOyuO1bFaq9NkZAGCFJ2uGKB3flFjWUZGicyCWLKami1Z2BBx50-EjsTwvCfcuIpD"
          />
        </div>
      </main>
    </div>
  );
}
