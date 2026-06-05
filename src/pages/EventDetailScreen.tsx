import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TopAppBar from "../components/shared/TopAppBar";
import { eventService } from "../services";
import type { EventDetail } from "../models/event.model";

const statusColors: Record<string, string> = {
  BORRADOR: "bg-slate-200 text-slate-700",
  PENDIENTE: "bg-amber-100 text-amber-800",
  "EN PROCESO": "bg-cyan-100 text-cyan-800",
  TERMINADO: "bg-green-100 text-green-800",
};

function formatCurrency(value: number | null): string {
  if (value == null) return "—";
  return `S/ ${value.toLocaleString("es-PE", { minimumFractionDigits: 2 })}`;
}

function initials(name: string): string {
  return name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

export default function EventDetailScreen() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<EventDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    eventService.getEventById(id).then((res) => {
      if (res.ok && res.data) {
        setEvent(res.data);
      } else {
        setError("No se pudo cargar el evento.");
      }
      setIsLoading(false);
    });
  }, [id]);

  if (isLoading) {
    return (
      <div className="bg-background text-on-background font-body-md min-h-screen">
        <TopAppBar />
        <main className="pt-24 px-container-padding max-w-5xl mx-auto flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center gap-4 text-on-surface-variant">
            <span className="material-symbols-outlined text-5xl animate-spin">progress_activity</span>
            <p className="font-body-lg">Cargando evento...</p>
          </div>
        </main>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="bg-background text-on-background font-body-md min-h-screen">
        <TopAppBar />
        <main className="pt-24 px-container-padding max-w-5xl mx-auto flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center gap-4 text-error">
            <span className="material-symbols-outlined text-5xl">error</span>
            <p className="font-body-lg">{error ?? "Evento no encontrado."}</p>
            <button onClick={() => navigate(-1)} className="mt-2 px-6 py-3 bg-surface-container text-primary rounded-full font-label-md border border-primary/20">
              Regresar
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen pb-12">
      <TopAppBar />

      <main className="pt-24 px-container-padding max-w-5xl mx-auto space-y-stack-lg">

        {/* Title section */}
        <section className="p-container-padding rounded-lg border border-violet-100 shadow-sm bg-white/80 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-stack-md flex-wrap">
            {event.eventType && (
              <span className="inline-block bg-secondary-container text-on-secondary-container text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                {event.eventType}
              </span>
            )}
            <span className={`${statusColors[event.status] ?? "bg-slate-200 text-slate-700"} px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest`}>
              {event.status}
            </span>
          </div>
          <h1 className="text-primary mb-2 text-4xl font-bold">{event.title}</h1>
          {event.notes && (
            <p className="text-on-surface-variant text-sm">{event.notes}</p>
          )}
        </section>

        {/* Quick info grid */}
        <section className="grid md:grid-cols-3 gap-gutter">
          <div className="bg-surface-container-lowest p-gutter rounded-lg shadow-sm border border-primary-fixed-dim flex flex-col items-center text-center">
            <span className="material-symbols-outlined text-secondary mb-2">category</span>
            <p className="text-on-surface-variant uppercase text-xs mb-1">Tipo</p>
            <p className="font-h3 text-secondary text-base">{event.eventType ?? "—"}</p>
          </div>
          <div className="grid grid-cols-2 gap-gutter md:col-span-2">
            <div className="bg-surface-container-lowest p-gutter rounded-lg shadow-sm border border-primary-fixed-dim flex flex-col items-center text-center">
              <span className="material-symbols-outlined text-primary mb-2">event</span>
              <p className="text-on-surface-variant uppercase text-xs mb-1">Fecha</p>
              <p className="font-h3 text-primary text-base">{event.eventDate ?? "—"}</p>
            </div>
            <div className="bg-surface-container-lowest p-gutter rounded-lg shadow-sm border border-primary-fixed-dim flex flex-col items-center text-center">
              <span className="material-symbols-outlined text-primary mb-2">schedule</span>
              <p className="text-on-surface-variant uppercase text-xs mb-1">Hora / Duración</p>
              <p className="font-h3 text-primary text-base">
                {event.startTime ?? "—"}{event.durationHours != null ? ` · ${event.durationHours}h` : ""}
              </p>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          <div className="md:col-span-2 space-y-gutter">

            {/* Client */}
            <div className="bg-white p-container-padding rounded-lg border border-violet-100 shadow-sm">
              <h3 className="font-h3 text-primary mb-stack-md flex items-center gap-2">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
                Datos del Cliente
              </h3>
              {event.client ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-gutter">
                  <div className="p-3 bg-surface-container-low rounded-md">
                    <p className="text-on-surface-variant uppercase text-xs mb-1">Nombre</p>
                    <p className="font-label-md text-on-surface">{event.client.name}</p>
                  </div>
                  <div className="p-3 bg-surface-container-low rounded-md">
                    <p className="text-on-surface-variant uppercase text-xs mb-1">Teléfono</p>
                    <p className="font-label-md text-on-surface">{event.client.phone ?? "—"}</p>
                  </div>
                  <div className="p-3 bg-surface-container-low rounded-md overflow-hidden">
                    <p className="text-on-surface-variant uppercase text-xs mb-1">Email</p>
                    <p className="font-label-md text-on-surface truncate">{event.client.email ?? "—"}</p>
                  </div>
                </div>
              ) : (
                <p className="text-on-surface-variant text-sm">Sin cliente asignado.</p>
              )}
            </div>

            {/* Costs */}
            <div className="bg-white p-container-padding rounded-lg border border-violet-100 shadow-sm">
              <h3 className="font-h3 text-primary mb-stack-md flex items-center gap-2">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>
                Información de Costos
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-gutter">
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-md">
                  <p className="text-on-surface-variant uppercase text-xs mb-1">Costo Total</p>
                  <p className="font-h2 text-primary text-2xl">{formatCurrency(event.totalCost)}</p>
                </div>
                <div className="p-4 bg-surface-container-low rounded-md">
                  <p className="text-on-surface-variant uppercase text-xs mb-1">Movilidad</p>
                  <p className="font-h3 text-on-surface text-xl">{formatCurrency(event.mobilityCost)}</p>
                </div>
                <div className="p-4 bg-secondary/5 border border-secondary/20 rounded-md">
                  <p className="text-on-surface-variant uppercase text-xs mb-1">Adelanto</p>
                  <p className="font-h3 text-secondary text-xl">{formatCurrency(event.advancePayment)}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-gutter">

            {/* Staff */}
            <div className="bg-white p-container-padding rounded-lg border border-violet-100 shadow-sm">
              <h3 className="font-h3 text-primary mb-stack-md flex items-center gap-2">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>badge</span>
                Equipo Asignado
              </h3>
              {event.staff.length === 0 ? (
                <p className="text-on-surface-variant text-sm">Sin personal asignado.</p>
              ) : (
                <div className="space-y-3">
                  {event.staff.map((s, i) => (
                    <div key={s.employeeId} className="flex items-center gap-3 p-3 rounded-md bg-surface-container-low">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0 ${i % 2 === 0 ? "bg-primary" : "bg-secondary"}`}>
                        {initials(s.name)}
                      </div>
                      <div>
                        <p className="font-label-md text-on-surface">{s.name}</p>
                        <span className={`text-[10px] font-bold uppercase ${i % 2 === 0 ? "text-primary" : "text-secondary"}`}>{s.role}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Location */}
            <div className="bg-white rounded-lg border border-violet-100 shadow-sm overflow-hidden">
              <div className="p-container-padding">
                <h3 className="font-h3 text-primary flex items-center gap-2">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
                  Ubicación
                </h3>
              </div>
              <div className="h-48 w-full bg-surface-container-highest flex items-center justify-center relative">
                <span className="material-symbols-outlined text-primary text-6xl opacity-20">map</span>
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm p-3 rounded-md shadow-md border border-violet-50">
                  <p className="font-label-md text-on-surface">{event.location ?? "Sin dirección"}</p>
                  {event.mapsUrl && (
                    <a href={event.mapsUrl} target="_blank" rel="noreferrer" className="text-xs text-primary hover:underline">
                      Ver en Google Maps
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <button
                onClick={() => navigate(`/event/${event.id}/edit`)}
                className="w-full bg-linear-to-r from-violet-600 to-pink-500 text-white font-label-md py-4 rounded-full shadow-lg bouncy-hover active:scale-95 flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined">edit</span>
                Editar Evento
              </button>
              <button
                onClick={() => navigate(-1)}
                className="w-full bg-surface-container text-primary font-label-md py-4 rounded-full border border-primary/20 bouncy-hover active:scale-95 flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined">arrow_back</span>
                Regresar
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
