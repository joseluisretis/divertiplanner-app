import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopAppBar from "./components/shared/TopAppBar";
import ClientDataForm from "./components/register/ClientDataForm";
import EventDataForm from "./components/register/EventDataForm";
import StaffDataForm from "./components/register/StaffDataForm";
import CostDataForm from "./components/register/CostDataForm";
import RegisterSidebar from "./components/register/RegisterSidebar";
import { eventService } from "./services";

export default function EventRegisterScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      // Sending an empty DTO to trigger the mock
      const res = await eventService.createEvent({});
      if (res.ok) {
        alert("¡Registro Exitoso!");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error);
      alert("Error al registrar el evento");
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter items-start">
          <div className="lg:col-span-2 flex flex-col gap-gutter">
            <ClientDataForm />
            <EventDataForm />
            <StaffDataForm />
            <CostDataForm />
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
