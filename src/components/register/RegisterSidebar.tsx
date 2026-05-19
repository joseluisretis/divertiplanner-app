interface RegisterSidebarProps {
  onConfirm: () => void;
  isLoading: boolean;
  confirmLabel?: string;
}

export default function RegisterSidebar({ onConfirm, isLoading, confirmLabel }: RegisterSidebarProps) {
  return (
    <div className="lg:sticky lg:top-24 flex flex-col gap-gutter">
      <div className="bg-surface-container-high p-container-padding rounded-lg border border-primary-container/20 ambient-shadow-secondary">
        <div className="flex flex-col gap-stack-sm">
          <button 
            onClick={onConfirm}
            disabled={isLoading}
            className={`w-full bg-gradient-to-r from-primary to-secondary text-white font-label-md py-4 rounded-full shadow-lg hover:shadow-primary/40 bouncy-hover bouncy-active transition-all flex items-center justify-center gap-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            <span className="material-symbols-outlined">{isLoading ? 'hourglass_empty' : 'check_circle'}</span>
            {isLoading ? 'Guardando...' : (confirmLabel ?? 'Confirmar Registro')}
          </button>
          <button className="w-full bg-white text-on-surface font-label-md py-4 rounded-full border-2 border-surface-container-highest hover:bg-surface-container bouncy-hover bouncy-active transition-all">
            Guardar Borrador
          </button>
        </div>
      </div>
    </div>
  );
}
