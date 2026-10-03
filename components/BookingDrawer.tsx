"use client";

import { useEffect, useState, type ReactNode } from "react";
import { services, stylists, timeSlots } from "@/lib/data";
import { Check, ChevronLeft, ChevronRight, X } from "./icons";

type Form = {
  service: string;
  stylist: string;
  appointment_date: string;
  appointment_time: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
};

const emptyForm: Form = {
  service: "",
  stylist: "any",
  appointment_date: "",
  appointment_time: "",
  name: "",
  email: "",
  phone: "",
  notes: "",
};

const steps = ["Service", "Date & Time", "Artisan", "Your Details"];

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <label className="font-body text-[10px] uppercase tracking-luxe text-foreground/50">
        {label}
      </label>
      <div className="mt-1">{children}</div>
    </div>
  );
}

type BookingDrawerProps = {
  open: boolean;
  onClose: () => void;
  presetService: string | null;
  /** Increments on every open so the drawer can reset itself. */
  openCount: number;
};

export default function BookingDrawer({
  open,
  onClose,
  presetService,
  openCount,
}: BookingDrawerProps) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Form>(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [seenOpen, setSeenOpen] = useState(openCount);

  // Reset to the right step each time the drawer is (re)opened.
  if (seenOpen !== openCount) {
    setSeenOpen(openCount);
    setStep(presetService ? 1 : 0);
    setDone(false);
    if (presetService) setForm((f) => ({ ...f, service: presetService }));
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!error) return;
    const timer = setTimeout(() => setError(null), 5000);
    return () => clearTimeout(timer);
  }, [error]);

  const selectedService = services.find((s) => s.id === form.service);
  const set = (key: keyof Form, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const canContinue =
    step === 0
      ? !!form.service
      : step === 1
        ? !!form.appointment_date && !!form.appointment_time
        : step === 2
          ? !!form.stylist
          : step === 3 && !!form.name && !!form.email && !!form.phone;

  const submit = async () => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, status: "pending" }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Please try again in a moment.");
      }
      setDone(true);
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Please try again in a moment.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const closeAndReset = () => {
    setForm(emptyForm);
    setStep(0);
    setDone(false);
    onClose();
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-[70] bg-foreground/30 backdrop-blur-sm transition-opacity duration-500 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />
      <aside
        inert={!open}
        className={`fixed right-0 top-0 z-[80] flex h-full w-full flex-col bg-background shadow-2xl transition-transform duration-500 ease-out sm:w-[420px] lg:w-[460px] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-border px-8 py-6">
          <div>
            <span className="font-body text-[10px] uppercase tracking-ultra text-accent">
              Reservation Suite
            </span>
            <h3 className="mt-1 font-heading text-2xl font-light text-foreground">
              {done ? "Reserved" : "Reserve a Transformation"}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-foreground/60 transition-colors hover:text-foreground"
          >
            <X size={20} />
          </button>
        </div>

        {done ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-accent/40">
              <Check size={26} className="text-accent" />
            </div>
            <h4 className="mt-8 font-heading text-3xl font-light text-foreground">
              Your ritual is reserved
            </h4>
            <p className="mt-4 font-body text-sm font-light leading-relaxed text-muted-foreground">
              {form.appointment_date} at {form.appointment_time}
              {selectedService ? ` · ${selectedService.name}` : ""}. A
              confirmation will reach you shortly, {form.name.split(" ")[0]}.
            </p>
            <button
              onClick={closeAndReset}
              className="mt-10 border border-foreground/30 px-8 py-3 font-body text-[11px] uppercase tracking-luxe text-foreground transition-colors hover:bg-foreground hover:text-background"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2 px-8 py-5">
              {steps.map((label, i) => (
                <div key={label} className="flex flex-1 items-center gap-2">
                  <div
                    className={`h-1 flex-1 rounded-full transition-colors duration-500 ${
                      i <= step ? "bg-accent" : "bg-border"
                    }`}
                  />
                </div>
              ))}
            </div>
            <div className="px-8 pb-3">
              <span className="font-body text-[10px] uppercase tracking-luxe text-foreground/50">
                Step {step + 1} of {steps.length} — {steps[step]}
              </span>
            </div>

            <div className="flex-1 overflow-y-auto px-8 pb-8">
              {step === 0 && (
                <div className="grid grid-cols-1 gap-2">
                  {services.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => set("service", s.id)}
                      className={`flex items-center justify-between border px-5 py-4 text-left transition-all duration-300 ${
                        form.service === s.id
                          ? "border-accent bg-accent/5"
                          : "border-border hover:border-foreground/30"
                      }`}
                    >
                      <div>
                        <p className="font-heading text-xl font-light text-foreground">
                          {s.name}
                        </p>
                        <p className="font-body text-[11px] uppercase tracking-luxe text-muted-foreground">
                          {s.price} AED · {s.duration}
                        </p>
                      </div>
                      {form.service === s.id && (
                        <Check size={16} className="text-accent" />
                      )}
                    </button>
                  ))}
                </div>
              )}

              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <label className="font-body text-[10px] uppercase tracking-luxe text-foreground/50">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={form.appointment_date}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => set("appointment_date", e.target.value)}
                      className="mt-2 w-full border-b border-border bg-transparent py-3 font-body text-foreground outline-none transition-colors focus:border-accent"
                    />
                  </div>
                  <div>
                    <label className="font-body text-[10px] uppercase tracking-luxe text-foreground/50">
                      Preferred Time
                    </label>
                    <div className="mt-3 grid grid-cols-3 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => set("appointment_time", time)}
                          className={`border py-3 font-body text-sm transition-all duration-300 ${
                            form.appointment_time === time
                              ? "border-accent bg-accent/5 text-foreground"
                              : "border-border text-foreground/70 hover:border-foreground/30"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="grid grid-cols-1 gap-2">
                  {stylists.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => set("stylist", s.id)}
                      className={`flex items-center justify-between border px-5 py-4 text-left transition-all duration-300 ${
                        form.stylist === s.id
                          ? "border-accent bg-accent/5"
                          : "border-border hover:border-foreground/30"
                      }`}
                    >
                      <div>
                        <p className="font-heading text-xl font-light text-foreground">
                          {s.name}
                        </p>
                        <p className="font-body text-[11px] uppercase tracking-luxe text-muted-foreground">
                          {s.role}
                        </p>
                      </div>
                      {form.stylist === s.id && (
                        <Check size={16} className="text-accent" />
                      )}
                    </button>
                  ))}
                </div>
              )}

              {step === 3 && (
                <div className="space-y-5">
                  <Field label="Full Name">
                    <input
                      value={form.name}
                      onChange={(e) => set("name", e.target.value)}
                      className="field-input"
                      placeholder="Your name"
                    />
                  </Field>
                  <Field label="Email">
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => set("email", e.target.value)}
                      className="field-input"
                      placeholder="you@email.com"
                    />
                  </Field>
                  <Field label="Phone">
                    <input
                      value={form.phone}
                      onChange={(e) => set("phone", e.target.value)}
                      className="field-input"
                      placeholder="+971 ..."
                    />
                  </Field>
                  <Field label="Notes (optional)">
                    <textarea
                      value={form.notes}
                      onChange={(e) => set("notes", e.target.value)}
                      rows={3}
                      className="field-input resize-none"
                      placeholder="Anything we should know"
                    />
                  </Field>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-border px-8 py-6">
              <button
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                className="flex items-center gap-1 font-body text-[11px] uppercase tracking-luxe text-foreground/60 transition-colors hover:text-foreground disabled:opacity-30"
              >
                <ChevronLeft size={14} /> Back
              </button>
              {step < 3 ? (
                <button
                  onClick={() => setStep((s) => s + 1)}
                  disabled={!canContinue}
                  className="flex items-center gap-1 bg-foreground px-7 py-3 font-body text-[11px] uppercase tracking-luxe text-background transition-opacity disabled:opacity-30"
                >
                  Continue <ChevronRight size={14} />
                </button>
              ) : (
                <button
                  onClick={submit}
                  disabled={!canContinue || submitting}
                  className="bg-accent px-7 py-3 font-body text-[11px] uppercase tracking-luxe text-background transition-opacity disabled:opacity-50"
                >
                  {submitting ? "Reserving..." : "Confirm Reservation"}
                </button>
              )}
            </div>
          </>
        )}
      </aside>

      {error && (
        <div
          role="alert"
          className="fixed bottom-4 right-4 z-[100] w-[calc(100%-2rem)] rounded-md border border-destructive bg-destructive p-6 pr-8 text-destructive-foreground shadow-lg md:max-w-[420px]"
        >
          <p className="font-body text-sm font-semibold">Could not reserve</p>
          <p className="mt-1 font-body text-sm opacity-90">{error}</p>
        </div>
      )}
    </>
  );
}
