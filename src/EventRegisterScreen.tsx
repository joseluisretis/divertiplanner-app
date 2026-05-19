import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TopAppBar from "./components/shared/TopAppBar";
import ClientDataForm from "./components/register/ClientDataForm";
import EventDataForm from "./components/register/EventDataForm";
import StaffDataForm from "./components/register/StaffDataForm";
import CostDataForm from "./components/register/CostDataForm";
import RegisterSidebar from "./components/register/RegisterSidebar";
import { eventService } from "./services";
import type { CreateEventDto, UpdateEventDto } from "./models/event.model";
import type { StaffEntry } from "./models/employee.model";

type FormState = {
  customerName: string;
  phone: string;
  email: string;
  eventType: string;
  eventName: string;
  eventDetails: string;
  dateStr: string;
  startTime: string;
  duration: string;
  address: string;
  locationUrl: string;
  totalCost: string;
  transportCost: string;
  advancePayment: string;
};

const initialForm: FormState = {
  customerName: "",
  phone: "",
  email: "",
  eventType: "",
  eventName: "",
  eventDetails: "",
  dateStr: "",
  startTime: "",
  duration: "",
  address: "",
  locationUrl: "",
  totalCost: "",
  transportCost: "",
  advancePayment: "",
};

export default function EventRegisterScreen() {
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);

  const [form, setForm] = useState<FormState>(initialForm);
  const [staff, setStaff] = useState<StaffEntry[]>([]);
  const [clientId, setClientId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(isEditMode);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    setIsFetching(true);
    eventService.getEventById(id).then((res) => {
      if (res.ok && res.data) {
        const e = res.data;
        setClientId(e.client?.id ?? null);
        setForm({
          customerName: e.client?.name ?? "",
          phone: e.client?.phone ?? "",
          email: e.client?.email ?? "",
          eventType: e.eventType ?? "",
          eventName: e.title,
          eventDetails: e.notes ?? "",
          dateStr: e.eventDate ?? "",
          startTime: e.startTime ?? "",
          duration: e.durationHours?.toString() ?? "",
          address: e.location ?? "",
          locationUrl: e.mapsUrl ?? "",
          totalCost: e.totalCost?.toString() ?? "",
          transportCost: e.mobilityCost?.toString() ?? "",
          advancePayment: e.advancePayment?.toString() ?? "",
        });
        setStaff(e.staff.map((s) => ({ employeeId: s.employeeId, name: s.name, eventRole: s.role })));
      } else {
        setError("No se pudo cargar el evento para editar.");
      }
      setIsFetching(false);
    });
  }, [id]);

  const handleAddStaff = (entry: StaffEntry) => {
    setStaff((prev) => [...prev, entry]);
  };

  const handleRemoveStaff = (employeeId: string) => {
    setStaff((prev) => prev.filter((s) => s.employeeId !== employeeId));
  };

  const updateForm = (fields: Partial<FormState>) => {
    setForm((prev) => ({ ...prev, ...fields }));
  };

  const buildBaseDto = () => ({
    customerName: form.customerName || undefined,
    phone: form.phone || undefined,
    email: form.email || undefined,
    eventType: form.eventType || undefined,
    eventName: form.eventName || undefined,
    eventDetails: form.eventDetails || undefined,
    dateStr: form.dateStr || undefined,
    startTime: form.startTime || undefined,
    duration: form.duration ? Number(form.duration) : undefined,
    address: form.address || undefined,
    locationUrl: form.locationUrl || undefined,
    totalCost: form.totalCost ? Number(form.totalCost) : undefined,
    transportCost: form.transportCost ? Number(form.transportCost) : undefined,
    advancePayment: form.advancePayment ? Number(form.advancePayment) : undefined,
    staff: staff.map((s) => ({ employeeId: s.employeeId })),
  });

  const handleConfirm = async () => {
    setIsLoading(true);
    setError(null);
    try {
      let res: { ok: boolean };

      if (isEditMode && id && clientId) {
        const dto: UpdateEventDto = { ...buildBaseDto(), clientId };
        res = await eventService.updateEvent(id, dto);
      } else {
        const dto: CreateEventDto = buildBaseDto();
        res = await eventService.createEvent(dto);
      }

      if (res.ok) {
        alert(isEditMode ? "¡Evento actualizado!" : "¡Registro Exitoso!");
        navigate(isEditMode ? `/event/${id}` : "/dashboard");
      } else {
        setError(isEditMode ? "No se pudo actualizar el evento." : "No se pudo registrar el evento. Intenta nuevamente.");
      }
    } catch (err) {
      console.error(err);
      setError("Error al guardar el evento");
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="bg-surface text-on-background font-body-md min-h-screen">
        <TopAppBar />
        <main className="pt-24 flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center gap-4 text-on-surface-variant">
            <span className="material-symbols-outlined text-5xl animate-spin">progress_activity</span>
            <p className="font-body-lg">Cargando evento...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-surface text-on-background font-body-md min-h-screen">
      <TopAppBar />
      <main className="pt-24 pb-32 px-container-padding max-w-5xl mx-auto relative z-10">
        <section className="mb-stack-lg">
          <h1 className="font-h1 text-h1 text-on-background mb-unit">
            {isEditMode ? "Editar Reservación" : "Nueva Reservación"}
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            {isEditMode ? "Modifica los detalles del evento y guarda los cambios." : "Completa los detalles para crear una experiencia inolvidable."}
          </p>
        </section>

        {error && (
          <div className="mb-stack-md p-4 bg-error-container text-on-error-container rounded-lg">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter items-start">
          <div className="lg:col-span-2 flex flex-col gap-gutter">
            <ClientDataForm
              customerName={form.customerName}
              phone={form.phone}
              email={form.email}
              onChange={(f) => updateForm(f as Partial<FormState>)}
            />
            <EventDataForm
              eventType={form.eventType}
              eventName={form.eventName}
              eventDetails={form.eventDetails}
              dateStr={form.dateStr}
              startTime={form.startTime}
              duration={form.duration}
              address={form.address}
              locationUrl={form.locationUrl}
              onChange={(f) => updateForm(f as Partial<FormState>)}
            />
            <StaffDataForm
              staff={staff}
              onAdd={handleAddStaff}
              onRemove={handleRemoveStaff}
            />
            <CostDataForm
              totalCost={form.totalCost}
              transportCost={form.transportCost}
              advancePayment={form.advancePayment}
              onChange={(f) => updateForm(f as Partial<FormState>)}
            />
          </div>
          <RegisterSidebar
            onConfirm={handleConfirm}
            isLoading={isLoading}
            confirmLabel={isEditMode ? "Guardar cambios" : undefined}
          />
        </div>
      </main>

      <div className="fixed bottom-10 right-10 pointer-events-none opacity-20 hidden lg:block z-0">
        <span className="material-symbols-outlined text-[120px] text-primary">celebration</span>
      </div>
      <div className="fixed top-40 left-[-40px] pointer-events-none opacity-10 hidden xl:block z-0">
        <span className="material-symbols-outlined text-[200px] text-secondary">auto_awesome</span>
      </div>
    </div>
  );
}
