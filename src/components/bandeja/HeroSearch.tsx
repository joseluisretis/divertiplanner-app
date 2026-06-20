interface HeroSearchProps {
  onOpenFilter: () => void;
}

export default function HeroSearch({ onOpenFilter }: HeroSearchProps) {
  return (
    <>
      <section className="py-stack-lg">
        <h2 className="text-[32px] font-headline-xl text-on-surface mb-2 leading-tight font-bold">
          Gestión de Diversión
        </h2>
        <p className="text-body-md font-body-md text-on-surface-variant">
          ¡Organiza las mejores celebraciones del mes!
        </p>
      </section>

      <section className="flex gap-stack-md mb-stack-lg items-center">
        <div className="relative flex-1 group">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">
            search
          </span>
          <input
            className="w-full h-[52px] pl-12 pr-4 bg-surface-container-highest/50 border-0 focus:ring-2 focus:ring-primary rounded-xl text-label-md font-label-md placeholder:text-outline transition-all"
            placeholder="Buscar eventos, clientes o talentos"
            type="text"
          />
        </div>
        <button
          onClick={onOpenFilter}
          className="w-[52px] h-[52px] bg-primary-container text-on-primary rounded-xl flex items-center justify-center transition-transform active:scale-95 duration-200 shadow-lg shadow-secondary-container/20"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          <span className="material-symbols-outlined">tune</span>
        </button>
      </section>
    </>
  );
}
