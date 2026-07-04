"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Loader2, LogIn } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.replace("/admin");
      } else {
        setChecking(false);
      }
    });
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError("Pogrešan email ili lozinka.");
      setLoading(false);
      return;
    }
    router.replace("/admin");
  };

  if (!mounted || checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <Loader2 className="h-6 w-6 animate-spin text-gray-300" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <img src="/mtg-logo.png" alt="MTG" className="mx-auto h-14 w-auto" />
          <h1 className="mt-5 text-xl font-bold text-gray-900">Admin Panel</h1>
          <p className="mt-1 text-sm text-gray-600">
            Prijavite se da vidite rezervacije
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
        >
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-widest text-gray-600">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              className="rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-[#0A1A3E] focus:ring-2 focus:ring-[#0A1A3E]/10 transition"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-widest text-gray-600">
              Lozinka
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-[#0A1A3E] focus:ring-2 focus:ring-[#0A1A3E]/10 transition"
            />
          </div>

          {error && <p className="text-xs text-rose-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#0A1A3E] py-3 text-sm font-semibold text-white transition hover:bg-[#0D1F4E] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Prijavljivanje...
              </>
            ) : (
              <>
                <LogIn className="h-4 w-4" /> Prijavi se
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
