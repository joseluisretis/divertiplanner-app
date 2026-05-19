interface HeroSearchProps {
  onOpenFilter: () => void;
}

export default function HeroSearch({ onOpenFilter }: HeroSearchProps) {
  return (
    <>
      <div className="mb-stack-lg">
        <h2 className="font-black text-on-surface mb-2 text-[32px] tracking-tight whitespace-nowrap">
          Gestión de Diversión
        </h2>
        <p className="font-body-lg text-on-surface-variant">
          ¡Organiza las mejores celebraciones del mes!
        </p>
      </div>

      <div className="flex flex-col gap-stack-md mb-stack-lg">
        <div className="flex gap-stack-sm items-center w-full">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">
              search
            </span>
            <input
              className="w-full pl-12 pr-4 py-4 bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary-container font-body-md shadow-sm"
              placeholder="Buscar eventos, clientes o talento..."
              type="text"
            />
          </div>
          <button
            onClick={onOpenFilter}
            className="p-4 bg-linear-to-r from-primary to-secondary text-on-primary rounded-full bouncy-hover bouncy-press shadow-lg shadow-primary/20 flex items-center justify-center shrink-0"
          >
            <span className="material-symbols-outlined">tune</span>
          </button>
        </div>
        {/* <div className="flex gap-stack-sm overflow-x-auto w-full pb-2 scrollbar-hide">
          <button className="px-6 py-3 rounded-full bg-primary text-on-primary font-label-md whitespace-nowrap bouncy-press">
            Todos
          </button>
          <button className="px-6 py-3 rounded-full bg-surface-container-highest text-on-surface-variant font-label-md whitespace-nowrap bouncy-hover bouncy-press">
            Cumpleaños
          </button>
          <button className="px-6 py-3 rounded-full bg-surface-container-highest text-on-surface-variant font-label-md whitespace-nowrap bouncy-hover bouncy-press">
            Shows
          </button>
          <button className="px-6 py-3 rounded-full bg-surface-container-highest text-on-surface-variant font-label-md whitespace-nowrap bouncy-hover bouncy-press">
            Magia
          </button>
        </div> */}
      </div>
    </>
  );
}
