import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopAppBar from "./components/shared/TopAppBar";
import ClientDataForm from "./components/register/ClientDataForm";
import EventDataForm from "./components/register/EventDataForm";
import StaffDataForm from "./components/register/StaffDataForm";
import CostDataForm from "./components/register/CostDataForm";
import RegisterSidebar from "./components/register/RegisterSidebar";
import { eventService } from "./services";
import type { CreateEventDto } from "./models/event.model";

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
  const [form, setForm] = useState<FormState>(initialForm);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const updateForm = (fields: Partial<FormState>) => {
    setForm((prev) => ({ ...prev, ...fields }));
  };

  const handleConfirm = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const dto: CreateEventDto = {
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
      };

      const res = await eventService.createEvent(dto);
      if (res.ok) {
        alert("¡Registro Exitoso!");
        navigate("/dashboard");
      } else {
        setError("No se pudo registrar el evento. Intenta nuevamente.");
      }
    } catch (err) {
      console.error(err);
      setError("Error al registrar el evento");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-surface text-on-background font-body-md min-h-screen">
      <TopAppBar />
      <main className="pt-24 pb-32 px-container-padding max-w-5xl mx-auto relative z-10">
        <section className="mb-stack-lg">
          <h1 className="font-h1 text-h1 text-on-background mb-unit">Nueva Reservación</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">Completa los detalles para crear una experiencia inolvidable.</p>
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
            <StaffDataForm />
            <CostDataForm
              totalCost={form.totalCost}
              transportCost={form.transportCost}
              advancePayment={form.advancePayment}
              onChange={(f) => updateForm(f as Partial<FormState>)}
            />
          </div>
          <RegisterSidebar onConfirm={handleConfirm} isLoading={isLoading} />
        </div>
      </main>

      {/* Visual Accents */}
      <div className="fixed bottom-10 right-10 pointer-events-none opacity-20 hidden lg:block z-0">
        <span className="material-symbols-outlined text-[120px] text-primary">celebration</span>
      </div>
      <div className="fixed top-40 left-[-40px] pointer-events-none opacity-10 hidden xl:block z-0">
        <span className="material-symbols-outlined text-[200px] text-secondary">auto_awesome</span>
      </div>
    </div>
  );
}
