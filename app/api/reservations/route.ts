import { NextResponse } from "next/server";
import { services, stylists, timeSlots } from "@/lib/data";

type Reservation = {
  service: string;
  stylist: string;
  appointment_date: string;
  appointment_time: string;
  name: string;
  email: string;
  phone: string;
  notes?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const datePattern = /^\d{4}-\d{2}-\d{2}$/;

function validate(body: Partial<Reservation>): string | null {
  if (!services.some((s) => s.id === body.service)) return "Please choose a service.";
  if (!stylists.some((s) => s.id === body.stylist)) return "Please choose an artisan.";
  if (!body.appointment_date || !datePattern.test(body.appointment_date))
    return "Please choose a valid date.";
  if (!body.appointment_time || !timeSlots.includes(body.appointment_time))
    return "Please choose a valid time.";
  if (!body.name?.trim()) return "Please enter your name.";
  if (!body.email || !emailPattern.test(body.email)) return "Please enter a valid email.";
  if (!body.phone?.trim()) return "Please enter your phone number.";
  return null;
}

export async function POST(request: Request) {
  let body: Partial<Reservation>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const problem = validate(body);
  if (problem) return NextResponse.json({ error: problem }, { status: 400 });

  // TODO: persist the reservation (database / email / WhatsApp) once the
  // client chooses a destination. For now it is validated and logged only.
  console.info("[reservation]", { ...body, status: "pending" });

  return NextResponse.json({ ok: true }, { status: 201 });
}
