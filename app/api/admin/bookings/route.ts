import { supabaseAdmin } from "@/lib/supabase-admin";
import { NextRequest } from "next/server";

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json(data);
}

export async function PATCH(req: NextRequest) {
  const { id, status } = await req.json();
  const { error } = await supabaseAdmin
    .from("bookings")
    .update({ status })
    .eq("id", id);

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ ok: true });
}
