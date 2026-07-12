import { supabaseAdmin } from "@/lib/supabase-admin";
import { NextRequest } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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

  const { data: booking, error } = await supabaseAdmin
    .from("bookings")
    .update({ status })
    .eq("id", id)
    .select()
    .single();

  if (error) return Response.json({ error: error.message }, { status: 500 });

  if ((status === "confirmed" || status === "cancelled") && booking?.email) {
    try {
      await sendStatusEmail(booking, status);
    } catch (err) {
      console.error("Email send error:", err);
    }
  }

  return Response.json({ ok: true });
}

async function sendStatusEmail(booking: any, status: string) {
  const isConfirmed = status === "confirmed";
  const isTransfer = booking.type === "transfer";

  const subject = isConfirmed
    ? `✅ Rezervacija potvrđena — Montenegro Transfer Group`
    : `❌ Rezervacija odbijena — Montenegro Transfer Group`;

  const routeOrTour = isTransfer
    ? `${booking.from_location} → ${booking.to_location}`
    : booking.tour_name;

  const typeLabel = isTransfer ? "Transfer" : "Tura";
  const dateLabel = booking.date
    ? `${booking.date}${booking.time ? ` u ${booking.time}` : ""}`
    : "N/A";

  const extras = [
    booking.vehicle ? `<strong>Vozilo:</strong> ${booking.vehicle}` : null,
    booking.passengers
      ? `<strong>Putnici:</strong> ${booking.passengers}`
      : null,
    booking.baby_seat ? `<strong>Dječije sjedište:</strong> Da` : null,
    booking.round_trip ? `<strong>Tip:</strong> Povratna vožnja` : null,
    booking.price ? `<strong>Cijena:</strong> ${booking.price} €` : null,
    booking.flight ? `<strong>Broj leta:</strong> ${booking.flight}` : null,
    booking.note ? `<strong>Napomena:</strong> ${booking.note}` : null,
  ]
    .filter(Boolean)
    .join("<br/>");

  const confirmedHtml = `
    <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:16px 20px;margin-bottom:24px;">
      <p style="color:#15803d;font-weight:700;font-size:18px;margin:0 0 4px;">✅ Vaša rezervacija je potvrđena!</p>
      <p style="color:#166534;margin:0;font-size:14px;">Naš vozač će biti na dogovorenom mjestu u navedeno vrijeme.</p>
    </div>
  `;

  const cancelledHtml = `
    <div style="background:#fef2f2;border:1px solid #fecaca;border-radius:12px;padding:16px 20px;margin-bottom:24px;">
      <p style="color:#dc2626;font-weight:700;font-size:18px;margin:0 0 4px;">❌ Rezervacija nije potvrđena</p>
      <p style="color:#991b1b;margin:0;font-size:14px;">Nažalost, nismo u mogućnosti da ispunimo Vašu rezervaciju. Kontaktirajte nas za više informacija.</p>
    </div>
  `;

  const html = `
<!DOCTYPE html>
<html lang="sr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:40px 20px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">
        <tr><td style="background:#0A1A3E;border-radius:16px 16px 0 0;padding:32px 32px 24px;text-align:center;">
          <p style="color:#00C2E8;font-size:13px;font-weight:700;letter-spacing:3px;text-transform:uppercase;margin:0 0 8px;">Montenegro Transfer Group</p>
          <h1 style="color:white;font-size:24px;font-weight:800;margin:0;">${
            isConfirmed ? "Rezervacija potvrđena" : "Rezervacija odbijena"
          }</h1>
        </td></tr>
        <tr><td style="background:white;padding:32px;border-left:1px solid #e2e8f0;border-right:1px solid #e2e8f0;">
          <p style="color:#374151;font-size:16px;margin:0 0 24px;">Pozdrav, <strong>${
            booking.name
          }</strong>!</p>
          ${isConfirmed ? confirmedHtml : cancelledHtml}
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:20px;margin-bottom:24px;">
            <tr><td>
              <p style="color:#6b7280;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin:0 0 12px;">Detalji rezervacije</p>
              <table width="100%" cellpadding="4" cellspacing="0" style="color:#374151;font-size:14px;">
                <tr><td style="color:#6b7280;width:40%;">Tip</td><td><strong>${typeLabel}</strong></td></tr>
                <tr><td style="color:#6b7280;">${
                  isTransfer ? "Ruta" : "Tura"
                }</td><td><strong>${routeOrTour}</strong></td></tr>
                <tr><td style="color:#6b7280;">Datum</td><td><strong>${dateLabel}</strong></td></tr>
              </table>
              ${
                extras
                  ? `<hr style="border:none;border-top:1px solid #e2e8f0;margin:12px 0;"/><p style="color:#374151;font-size:14px;margin:0;line-height:1.8;">${extras}</p>`
                  : ""
              }
            </td></tr>
          </table>
          ${
            isConfirmed
              ? `
          <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:12px;padding:16px 20px;margin-bottom:24px;">
            <p style="color:#1d4ed8;font-size:14px;font-weight:600;margin:0 0 4px;">Kontaktirajte nas</p>
            <p style="color:#1e40af;font-size:13px;margin:0;">📞 +382 68 861 538 &nbsp;|&nbsp; 💬 WhatsApp / Viber</p>
          </div>
          `
              : `
          <div style="background:#fafafa;border:1px solid #e2e8f0;border-radius:12px;padding:16px 20px;margin-bottom:24px;">
            <p style="color:#374151;font-size:14px;font-weight:600;margin:0 0 4px;">Trebate pomoć?</p>
            <p style="color:#6b7280;font-size:13px;margin:0;">Kontaktirajte nas: 📞 +382 68 861 538 &nbsp;|&nbsp; 💬 WhatsApp / Viber</p>
          </div>
          `
          }
        </td></tr>
        <tr><td style="background:#0A1A3E;border-radius:0 0 16px 16px;padding:20px 32px;text-align:center;">
          <p style="color:rgba(255,255,255,0.4);font-size:12px;margin:0;">© ${new Date().getFullYear()} Montenegro Transfer Group · Crna Gora</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>
  `;

  // NOTE: onboarding@resend.dev can only send to sajtzadan.me@gmail.com (your Resend account email)
  // Once you verify a domain, change 'to' back to: booking.email
  await resend.emails.send({
    from: "Montenegro Transfer Group <onboarding@resend.dev>",
    to: "sajtzadan.me@gmail.com",
    subject: `[${booking.name} - ${booking.email}] ${subject}`,
    html,
  });
}
