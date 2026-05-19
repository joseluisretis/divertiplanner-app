import React from 'react';
import { useNavigate } from 'react-router-dom';
import TopAppBar from './components/shared/TopAppBar';

const EventDetailScreen: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-background text-on-background font-body-md min-h-screen pb-12">
      {/* Header Navigation */}
      <TopAppBar />

      <main className="pt-24 px-container-padding max-w-5xl mx-auto space-y-stack-lg">
        <section className="p-container-padding rounded-lg border border-violet-100 shadow-sm bg-white/80 backdrop-blur-sm">
          <span className="inline-block bg-secondary-container text-on-secondary-container text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest mb-stack-md">Evento Premium</span>
          <h1 className="text-primary mb-2 text-4xl">Gran Show de Magia</h1>
          <p className="text-on-surface-variant text-sm">Un espectáculo inolvidable lleno de ilusión y sorpresas para toda la familia.</p>
        </section>

        {/* Hero Section & Event Basics */}
        {/* Quick Info Grid */}
        <section className="grid md:grid-cols-3 gap-gutter flex flex-col">
          <div className="bg-surface-container-lowest p-gutter rounded-lg shadow-sm border border-primary-fixed-dim flex flex-col items-center text-center w-full">
            <span className="material-symbols-outlined text-secondary mb-2">category</span>
            <p className="text-on-surface-variant text-label-sm uppercase text-sm">Tipo</p>
            <p className="font-h3 text-secondary text-base">Cumpleaños</p>
          </div>
          <div className="grid grid-cols-2 gap-gutter w-full">
            <div className="bg-surface-container-lowest p-gutter rounded-lg shadow-sm border border-primary-fixed-dim flex flex-col items-center text-center">
              <span className="material-symbols-outlined text-primary mb-2">event</span>
              <p className="text-on-surface-variant text-label-sm uppercase text-sm">Fecha</p>
              <p className="font-h3 text-primary text-base">25 Oct, 2023</p>
            </div>
            <div className="bg-surface-container-lowest p-gutter rounded-lg shadow-sm border border-primary-fixed-dim flex flex-col items-center text-center">
              <span className="material-symbols-outlined text-primary mb-2">schedule</span>
              <p className="text-on-surface-variant text-label-sm uppercase text-sm">Hora / Duración</p>
              <p className="font-h3 text-primary text-base">16:00 - 3h</p>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          <div className="md:col-span-2 space-y-gutter">
            <div className="bg-white p-container-padding rounded-lg border border-violet-100 shadow-sm">
              <h3 className="font-h3 text-primary mb-stack-md flex items-center gap-2">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>Datos del Cliente
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-gutter">
                <div className="p-3 bg-surface-container-low rounded-md">
                  <p className="text-label-sm text-on-surface-variant uppercase text-sm">Nombre</p>
                  <p className="font-label-md text-on-surface">María García</p>
                </div>
                <div className="p-3 bg-surface-container-low rounded-md">
                  <p className="text-label-sm text-on-surface-variant uppercase text-sm">Teléfono</p>
                  <p className="font-label-md text-on-surface">+34 612 345 678</p>
                </div>
                <div className="p-3 bg-surface-container-low rounded-md overflow-hidden">
                  <p className="text-label-sm text-on-surface-variant uppercase text-sm">Email</p>
                  <p className="font-label-md text-on-surface truncate">maria.g@example.com</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-container-padding rounded-lg border border-violet-100 shadow-sm">
              <h3 className="font-h3 text-primary mb-stack-md flex items-center gap-2">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>Información de Costos
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-gutter">
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-md">
                  <p className="text-label-sm text-on-surface-variant uppercase text-sm">Costo Total</p>
                  <p className="font-h2 text-primary text-2xl">S/ 1,250.00</p>
                </div>
                <div className="p-4 bg-surface-container-low rounded-md">
                  <p className="text-label-sm text-on-surface-variant uppercase text-sm">Movilidad</p>
                  <p className="font-h3 text-on-surface text-xl">S/ 50.00</p>
                </div>
                <div className="p-4 bg-secondary/5 border border-secondary/20 rounded-md">
                  <p className="text-label-sm text-on-surface-variant uppercase text-sm">Adelanto</p>
                  <p className="font-h3 text-secondary text-xl">S/ 300.00</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-gutter">
            <div className="bg-white p-container-padding rounded-lg border border-violet-100 shadow-sm">
              <h3 className="font-h3 text-primary mb-stack-md flex items-center gap-2">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>badge</span>Equipo Asignado
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-md bg-surface-container-low">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold">CM</div>
                  <div>
                    <p className="font-label-md text-on-surface">Carlos Mágico</p>
                    <span className="text-[10px] text-primary font-bold uppercase">Mago Principal</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-md bg-surface-container-low">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-white font-bold">LS</div>
                  <div>
                    <p className="font-label-md text-on-surface">Lucía Sonrisas</p>
                    <span className="text-[10px] text-secondary font-bold uppercase">Animadora</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-violet-100 shadow-sm overflow-hidden">
              <div className="p-container-padding">
                <h3 className="font-h3 text-primary flex items-center gap-2">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>Ubicación
                </h3>
              </div>
              <div className="h-48 w-full bg-surface-container-highest flex items-center justify-center relative">
                <span className="material-symbols-outlined text-primary text-6xl opacity-20">map</span>
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm p-3 rounded-md shadow-md border border-violet-50">
                  <p className="font-label-md text-on-surface">Calle de la Alegría, 42</p>
                  <p className="text-label-sm text-on-surface-variant text-sm">San Isidro, Lima</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button className="w-full bg-gradient-to-r from-violet-600 to-pink-500 text-white font-label-md py-4 rounded-full shadow-lg bouncy-hover active:scale-95 flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">edit</span>Editar Evento
              </button>
              <button 
                onClick={() => navigate(-1)}
                className="w-full bg-surface-container text-primary font-label-md py-4 rounded-full border border-primary/20 bouncy-hover active:scale-95 flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined">arrow_back</span>Regresar
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EventDetailScreen;
