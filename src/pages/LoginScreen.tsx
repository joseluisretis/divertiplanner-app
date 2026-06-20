import type { FormEvent } from "react";
import { useRef, useState } from "react";

import { useAuthStore } from "../stores/authStore";

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
    <div className="login-screen-theme bg-background font-body-md text-on-background selection:bg-primary-fixed selection:text-on-primary-fixed min-h-screen relative overflow-hidden">
      <main className="min-h-screen flex flex-col px-container-margin py-8 max-w-md mx-auto relative overflow-hidden">
        {/* Back Button Container */}
        <div className="mb-12"></div>

        {/* Branding Section */}
        <div className="mb-10">
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-primary tracking-tight flex items-center gap-1">
            DivertiPlanner
            <span className="text-secondary-container text-2xl font-black">+</span>
          </h1>
          <p className="font-headline-xl text-headline-xl text-on-surface mt-2 leading-[1.1]">
            ¡Bienvenido de nuevo!
          </p>
        </div>

        {/* Form Section */}
        <form className="flex flex-col space-y-6" onSubmit={handleLogin}>
          {/* User Field */}
          <div className="space-y-2">
            <label
              className="font-label-md text-label-md text-outline px-1 block"
              htmlFor="username"
            >
              Usuario
            </label>
            <div className="relative flex items-center bg-[#F1F5F9] rounded-xl px-4 py-4 focus-within:ring-2 ring-primary transition-all">
              <span className="material-symbols-outlined text-outline mr-3">
                person
              </span>
              <input
                ref={emailRef}
                className="bg-transparent border-none focus:ring-0 w-full p-0 text-on-surface placeholder:text-outline-variant font-body-md"
                id="username"
                placeholder="Tu usuario"
                type="text"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label
              className="font-label-md text-label-md text-outline px-1 block"
              htmlFor="password"
            >
              Contraseña
            </label>
            <div className="relative flex items-center bg-[#F1F5F9] rounded-xl px-4 py-4 focus-within:ring-2 ring-primary transition-all">
              <span className="material-symbols-outlined text-outline mr-3">
                lock
              </span>
              <input
                ref={passwordRef}
                className="bg-transparent border-none focus:ring-0 w-full p-0 text-on-surface placeholder:text-outline-variant font-body-md"
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                disabled={isLoading}
              />
              <button
                className="text-outline-variant hover:text-primary transition-colors cursor-pointer"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                <span className="material-symbols-outlined">
                  {showPassword ? "visibility" : "visibility_off"}
                </span>
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <p className="font-body-md text-error text-center mt-2">{error}</p>
          )}

          {/* Forgot Password Link */}
          <div className="flex justify-end">
            <a
              className="font-label-md text-label-md text-primary-container hover:underline transition-all"
              href="#"
            >
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          {/* Sign In Button */}
          <button
            className="bg-primary-container text-on-primary py-4 rounded-xl font-button text-button custom-shadow active:scale-95 transition-transform duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Cargando..." : "Iniciar Sesión"}
          </button>
        </form>

        {/* Social Login (Disabled Section) */}
        <div className="mt-auto pt-12 pb-6">
          <div className="relative flex items-center justify-center mb-8">
            <div className="flex-grow border-t border-outline-variant"></div>
            <span className="px-4 font-label-md text-label-md text-outline bg-background">
              o ingresa con
            </span>
            <div className="flex-grow border-t border-outline-variant"></div>
          </div>
          <div className="flex justify-center items-center gap-6 relative">
            {/* Facebook (Disabled) */}
            <button
              className="w-14 h-14 bg-white custom-shadow rounded-full flex items-center justify-center grayscale cursor-not-allowed opacity-50"
              type="button"
              disabled
            >
              <svg className="w-6 h-6 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </button>
            {/* Google (Disabled) */}
            <button
              className="w-14 h-14 bg-white custom-shadow rounded-full flex items-center justify-center grayscale cursor-not-allowed opacity-50"
              type="button"
              disabled
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z" fill="#EA4335" />
                <path d="M16.04 18.013c-1.09.693-2.459 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.823L1.24 17.385C3.198 21.302 7.27 24 12 24c3.055 0 5.771-1.027 7.91-2.782l-3.87-3.205Z" fill="#FBBC05" />
                <path d="M19.91 21.218C22.408 19.107 24 15.897 24 12c0-.853-.07-1.533-.21-2.182H12v4.637h6.736a5.79 5.79 0 0 1-2.496 3.764l3.67 3.003l-.001-.004Z" fill="#4285F4" />
                <path d="M1.24 6.65L5.265 9.765A7.01 7.01 0 0 1 12 19.091V24H1.24V6.65Z" fill="#34A853" />
              </svg>
            </button>
            {/* Apple (Disabled) */}
            <button
              className="w-14 h-14 bg-white custom-shadow rounded-full flex items-center justify-center grayscale cursor-not-allowed opacity-50"
              type="button"
              disabled
            >
              <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.54 9.103 1.51 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.601 1.09zm2.467-4.143c.844-1.027 1.416-2.454 1.259-3.87-1.22.052-2.701.818-3.571 1.844-.78.896-1.454 2.338-1.273 3.714 1.35.104 2.734-.662 3.585-1.688z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Atmospheric Gradient (Subtle background highlight) */}
        <div className="fixed -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="fixed -top-40 -right-40 w-80 h-80 bg-secondary-container/5 rounded-full blur-[100px] pointer-events-none"></div>
      </main>
    </div>
  );
}
