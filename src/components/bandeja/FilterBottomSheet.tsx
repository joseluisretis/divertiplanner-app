interface FilterBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FilterBottomSheet({ isOpen, onClose }: FilterBottomSheetProps) {
  return (
    <div 
      className={`fixed inset-0 z-[60] flex items-end justify-center transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
    >
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
        onClick={onClose}
      ></div>
      <div 
        className={`relative w-full max-w-lg bg-surface rounded-t-[2rem] p-container-padding shadow-2xl transition-transform duration-300 ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <div className="w-12 h-1.5 bg-outline-variant rounded-full mx-auto mb-6"></div>
        <h3 className="font-h3 text-h3 mb-6">Filtros Avanzados</h3>
        <div className="space-y-6">
          <div>
            <label className="font-label-md block mb-2">Fecha</label>
            <input className="w-full p-4 bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary-container" type="date" />
          </div>
          <div>
            <label className="font-label-md block mb-2">Tipo de evento</label>
            <select className="w-full p-4 bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary-container">
              <option>Todos</option>
              <option>Cumpleaños</option>
              <option>Shows</option>
              <option>Magia</option>
            </select>
          </div>
          <div>
            <label className="font-label-md block mb-2">Estado</label>
            <div className="flex flex-wrap gap-2">
              <button className="px-4 py-2 rounded-full border border-outline-variant hover:bg-primary-container hover:text-white transition-colors">Borrador</button>
              <button className="px-4 py-2 rounded-full border border-outline-variant hover:bg-primary-container hover:text-white transition-colors">Pendiente</button>
              <button className="px-4 py-2 rounded-full border border-outline-variant hover:bg-primary-container hover:text-white transition-colors">En Proceso</button>
              <button className="px-4 py-2 rounded-full border border-outline-variant hover:bg-primary-container hover:text-white transition-colors">Terminado</button>
            </div>
          </div>
          <div>
            <label className="font-label-md block mb-2">Empleado</label>
            <input className="w-full p-4 bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary-container" placeholder="Nombre del empleado..." type="text" />
          </div>
          <div className="pt-4 flex gap-4">
            <button 
              className="flex-1 py-4 border border-primary text-primary rounded-full font-label-md bouncy-press" 
              onClick={onClose}
            >
              Limpiar
            </button>
            <button 
              className="flex-1 py-4 bg-primary text-on-primary rounded-full font-label-md bouncy-press shadow-lg shadow-primary/20" 
              onClick={onClose}
            >
              Aplicar Filtros
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
