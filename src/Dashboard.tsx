import { useAuthStore } from "./store/authStore";

export default function Dashboard() {
  const { user, logout } = useAuthStore();

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-container-padding">
      <div className="bg-surface-container-lowest border border-primary/10 rounded-lg p-container-padding max-w-md w-full text-center space-y-stack-lg">
        <h1 className="font-h1 text-h1 text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
          PartyPulse
        </h1>
        <p className="font-body-lg text-on-surface">
          Bienvenido, <strong className="text-primary">{user?.name}</strong>
        </p>
        <button
          className="w-full h-[56px] bg-linear-to-r from-primary to-secondary text-on-primary font-h3 rounded-full bouncy-hover shadow-lg shadow-primary/20 transition-all"
          onClick={logout}
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
