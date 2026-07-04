import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET() {
  await supabaseAdmin.from("bookings").select("id").limit(1);
  return Response.json({ ok: true, timestamp: new Date().toISOString() });
}
