"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import {
  LogOut,
  RefreshCw,
  Car,
  MapPin,
  Calendar,
  Phone,
  Mail,
  Users,
  CheckCircle2,
  XCircle,
  Clock,
  Search,
  ArrowUpRight,
  Plane,
} from "lucide-react";

type Booking = {
  id: string;
  type: string;
  name: string;
  email: string;
  phone: string;
  from_location: string | null;
  to_location: string | null;
  tour_name: string | null;
  date: string | null;
  time: string | null;
  passengers: number | null;
  flight: string | null;
  note: string | null;
  vehicle: string | null;
  baby_seat: boolean | null;
  round_trip: boolean | null;
  price: number | null;
  status: string;
  created_at: string;
};

const STATUS = {
  new: {
    label: "Nova",
    bg: "bg-sky-50",
    text: "text-sky-600",
    border: "border-sky-200",
    dot: "bg-sky-500",
  },
  confirmed: {
    label: "Potvrđena",
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    border: "border-emerald-200",
    dot: "bg-emerald-500",
  },
  cancelled: {
    label: "Otkazana",
    bg: "bg-rose-50",
    text: "text-rose-600",
    border: "border-rose-200",
    dot: "bg-rose-500",
  },
};

function StatusBadge({ status }: { status: string }) {
  const s = STATUS[status as keyof typeof STATUS] ?? STATUS.new;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${s.bg} ${s.text} ${s.border}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
}

export default function AdminDashboard() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<
    "all" | "new" | "confirmed" | "cancelled"
  >("all");
  const [typeFilter, setTypeFilter] = useState<"all" | "transfer" | "tour">(
    "all"
  );
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    checkAuth();
    fetchBookings();
  }, []);

  const checkAuth = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) router.replace("/admin/login");
  };

  const fetchBookings = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/bookings");
    const data = await res.json();
    setBookings(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    await fetch("/api/admin/bookings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    );
  };

  const logout = async () => {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  };

  const filtered = bookings.filter((b) => {
    if (statusFilter !== "all" && b.status !== statusFilter) return false;
    if (typeFilter !== "all" && b.type !== typeFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        b.name.toLowerCase().includes(q) ||
        b.email.toLowerCase().includes(q) ||
        b.phone.toLowerCase().includes(q) ||
        (b.from_location ?? "").toLowerCase().includes(q) ||
        (b.to_location ?? "").toLowerCase().includes(q) ||
        (b.tour_name ?? "").toLowerCase().includes(q)
      );
    }
    return true;
  });

  const counts = {
    all: bookings.length,
    new: bookings.filter((b) => b.status === "new").length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    cancelled: bookings.filter((b) => b.status === "cancelled").length,
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-5">
          <div className="flex items-center gap-3">
            <img src="/mtg-logo.png" alt="MTG" className="h-8 w-auto" />
            <div className="hidden h-4 w-px bg-gray-200 sm:block" />
            <span className="hidden text-xs font-semibold uppercase tracking-widest text-gray-600 sm:block">
              Dashboard
            </span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={fetchBookings}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-600 transition hover:bg-gray-100 hover:text-gray-600"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
            <button
              onClick={logout}
              className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-gray-600 transition hover:bg-rose-50 hover:text-rose-500"
            >
              <LogOut className="h-3.5 w-3.5" /> Odjava
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-8">
        {/* Stat cards */}
        <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {(["all", "new", "confirmed", "cancelled"] as const).map((s) => {
            const active = statusFilter === s;
            const st = s === "all" ? null : STATUS[s];
            return (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`relative overflow-hidden rounded-2xl border p-5 text-left transition-all duration-200 ${
                  active
                    ? "border-[#0A1A3E] bg-[#0A1A3E] text-white shadow-lg"
                    : "border-gray-200 bg-white text-gray-900 hover:border-gray-300 hover:shadow-sm"
                }`}
              >
                <div
                  className={`mb-1 text-3xl font-bold tracking-tight ${
                    active ? "text-white" : "text-gray-900"
                  }`}
                >
                  {counts[s]}
                </div>
                <div
                  className={`flex items-center gap-1.5 text-xs font-medium ${
                    active ? "text-white/60" : "text-gray-600"
                  }`}
                >
                  {st && (
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        active ? "bg-white/50" : st.dot
                      }`}
                    />
                  )}
                  {s === "all" ? "Ukupno" : st?.label}
                </div>
              </button>
            );
          })}
        </div>

        {/* Filters + search */}
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <div className="flex overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            {(["all", "transfer", "tour"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`px-4 py-2 text-xs font-semibold transition ${
                  typeFilter === t
                    ? "bg-[#0A1A3E] text-white"
                    : "text-gray-600 hover:text-gray-600"
                }`}
              >
                {t === "all" ? "Sve" : t === "transfer" ? "Transferi" : "Ture"}
              </button>
            ))}
          </div>

          <div className="flex flex-1 items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 shadow-sm">
            <Search className="h-3.5 w-3.5 shrink-0 text-gray-500" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Pretraži po imenu, emailu, ruti..."
              className="w-full bg-transparent text-xs text-gray-700 outline-none placeholder:text-gray-500"
            />
          </div>
        </div>

        {/* Bookings list */}
        {loading ? (
          <div className="flex items-center justify-center py-32">
            <RefreshCw className="h-6 w-6 animate-spin text-gray-500" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white py-20 text-center text-sm text-gray-500 shadow-sm">
            Nema rezervacija
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {filtered.map((b) => {
              const isOpen = expanded === b.id;
              const date = new Date(b.created_at);
              const formattedDate = date.toLocaleDateString("sr-Latn-ME", {
                day: "numeric",
                month: "short",
                year: "numeric",
              });
              const formattedTime = date.toLocaleTimeString("sr-Latn-ME", {
                hour: "2-digit",
                minute: "2-digit",
              });

              return (
                <div
                  key={b.id}
                  className={`overflow-hidden rounded-2xl border transition-all duration-200 ${
                    isOpen
                      ? "border-gray-300 bg-white shadow-md"
                      : "border-gray-200 bg-white shadow-sm hover:border-gray-300 hover:shadow-md"
                  }`}
                >
                  {/* Row header */}
                  <button
                    type="button"
                    onClick={() => setExpanded(isOpen ? null : b.id)}
                    className="flex w-full items-center gap-4 px-5 py-4 text-left"
                  >
                    {/* Type icon */}
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                        b.type === "tour" ? "bg-violet-100" : "bg-sky-100"
                      }`}
                    >
                      {b.type === "tour" ? (
                        <MapPin className="h-4 w-4 text-violet-500" />
                      ) : (
                        <Car className="h-4 w-4 text-sky-500" />
                      )}
                    </div>

                    {/* Name + route */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="truncate text-sm font-semibold text-gray-900">
                          {b.name}
                        </span>
                        <StatusBadge status={b.status} />
                      </div>
                      <div className="mt-0.5 truncate text-xs text-gray-600">
                        {b.type === "tour"
                          ? `Tura · ${b.tour_name}`
                          : `${b.from_location} → ${b.to_location}${
                              b.round_trip ? " · Povratna" : ""
                            }`}
                      </div>
                    </div>

                    {/* Date */}
                    <div className="hidden shrink-0 text-right sm:block">
                      <div className="text-xs font-medium text-gray-500">
                        {formattedDate}
                      </div>
                      <div className="text-xs text-gray-500">
                        {formattedTime}
                      </div>
                    </div>

                    <ArrowUpRight
                      className={`h-4 w-4 shrink-0 text-gray-500 transition-transform duration-200 ${
                        isOpen ? "rotate-90 text-[#0A1A3E]" : ""
                      }`}
                    />
                  </button>

                  {/* Expanded detail */}
                  {isOpen && (
                    <div className="border-t border-gray-100 bg-gray-50 px-5 pb-5 pt-4">
                      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {b.type === "tour" ? (
                          <Detail
                            icon={<MapPin className="h-3.5 w-3.5" />}
                            label="Tura"
                          >
                            Podgorica → {b.tour_name}
                          </Detail>
                        ) : (
                          <Detail
                            icon={<MapPin className="h-3.5 w-3.5" />}
                            label="Ruta"
                          >
                            {b.from_location} → {b.to_location}
                            {b.round_trip && (
                              <span className="ml-1 text-sky-500">
                                · Povratna
                              </span>
                            )}
                          </Detail>
                        )}

                        {b.vehicle && (
                          <Detail
                            icon={<Car className="h-3.5 w-3.5" />}
                            label="Vozilo"
                          >
                            {b.vehicle}
                          </Detail>
                        )}

                        {b.date && (
                          <Detail
                            icon={<Calendar className="h-3.5 w-3.5" />}
                            label="Datum"
                          >
                            {b.date}
                            {b.time ? ` u ${b.time}` : ""}
                          </Detail>
                        )}

                        {b.passengers && (
                          <Detail
                            icon={<Users className="h-3.5 w-3.5" />}
                            label="Putnici"
                          >
                            {b.passengers}
                          </Detail>
                        )}

                        <Detail
                          icon={<Phone className="h-3.5 w-3.5" />}
                          label="Telefon"
                        >
                          <a
                            href={`tel:${b.phone}`}
                            className="font-medium text-[#0A1A3E] hover:underline"
                          >
                            {b.phone}
                          </a>
                        </Detail>

                        <Detail
                          icon={<Mail className="h-3.5 w-3.5" />}
                          label="Email"
                        >
                          <a
                            href={`mailto:${b.email}`}
                            className="font-medium text-[#0A1A3E] hover:underline"
                          >
                            {b.email}
                          </a>
                        </Detail>

                        {b.baby_seat && (
                          <Detail
                            icon={<span className="text-xs">🍼</span>}
                            label="Dječije sjedište"
                          >
                            Da
                          </Detail>
                        )}

                        {b.flight && (
                          <Detail
                            icon={<Plane className="h-3.5 w-3.5" />}
                            label="Broj leta"
                          >
                            {b.flight}
                          </Detail>
                        )}

                        {b.price && (
                          <Detail
                            icon={
                              <span className="text-[0.65rem] font-bold">
                                €
                              </span>
                            }
                            label="Cijena"
                          >
                            <span className="font-bold text-[#0A1A3E]">
                              {b.price} €
                            </span>
                          </Detail>
                        )}
                      </div>

                      {b.note && (
                        <div className="mt-4 rounded-xl border border-gray-200 bg-white px-4 py-3 text-xs text-gray-500">
                          <span className="font-semibold text-gray-500">
                            Napomena —{" "}
                          </span>
                          {b.note}
                        </div>
                      )}

                      {/* Status actions */}
                      <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-gray-200 pt-4">
                        <span className="text-xs text-gray-500">
                          Promijeni status:
                        </span>
                        <button
                          onClick={() => updateStatus(b.id, "new")}
                          className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
                            b.status === "new"
                              ? "border-sky-300 bg-sky-50 text-sky-600"
                              : "border-gray-200 text-gray-600 hover:border-sky-200 hover:text-sky-500"
                          }`}
                        >
                          <Clock className="h-3 w-3" /> Nova
                        </button>
                        <button
                          onClick={() => updateStatus(b.id, "confirmed")}
                          className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
                            b.status === "confirmed"
                              ? "border-emerald-300 bg-emerald-50 text-emerald-600"
                              : "border-gray-200 text-gray-600 hover:border-emerald-200 hover:text-emerald-500"
                          }`}
                        >
                          <CheckCircle2 className="h-3 w-3" /> Potvrdi
                        </button>
                        <button
                          onClick={() => updateStatus(b.id, "cancelled")}
                          className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
                            b.status === "cancelled"
                              ? "border-rose-300 bg-rose-50 text-rose-600"
                              : "border-gray-200 text-gray-600 hover:border-rose-200 hover:text-rose-500"
                          }`}
                        >
                          <XCircle className="h-3 w-3" /> Otkaži
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

function Detail({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="mt-0.5 text-gray-500">{icon}</span>
      <div>
        <div className="text-[10px] font-semibold uppercase tracking-widest text-gray-500">
          {label}
        </div>
        <div className="mt-0.5 text-sm text-gray-700">{children}</div>
      </div>
    </div>
  );
}
