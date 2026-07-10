import { supabaseAdmin } from "@/lib/supabase-admin";
import { NextRequest } from "next/server";

const WEB3FORMS_KEY = "ee0b1e4f-1101-4d4f-baba-7aa09f5905dc";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Save to Supabase
    const { data, error } = await supabaseAdmin
      .from("bookings")
      .insert(body)
      .select();

    if (error) {
      console.error("Supabase insert error:", error);
      return Response.json({ error: error.message }, { status: 500 });
    }

    // Send Web3Forms email — non-blocking, won't fail the booking
    try {
      const isTransfer = body.type === "transfer";

      const message = isTransfer
        ? `TRANSFER REQUEST\n\nRoute: ${body.from_location} → ${
            body.to_location
          }\nVehicle: ${body.vehicle}\nType: ${
            body.round_trip ? "Return" : "One way"
          }\nDate/Time: ${body.date} at ${body.time}\nPassengers: ${
            body.passengers
          }\nBaby seat: ${body.baby_seat ? "Yes" : "No"}\nPrice: ${
            body.price ? body.price + " €" : "On request"
          }${body.flight ? "\nFlight: " + body.flight : ""}${
            body.note ? "\nNote: " + body.note : ""
          }\n\nCONTACT\nName: ${body.name}\nEmail: ${body.email}\nPhone: ${
            body.phone
          }`
        : `TOUR BOOKING\n\nTour: ${body.tour_name}\nVehicle: ${
            body.vehicle
          }\nDate: ${body.date}\nPeople: ${body.passengers}\nBaby seat: ${
            body.baby_seat ? "Yes" : "No"
          }\nPrice: ${
            body.price ? body.price + " €" : "On request"
          }\n\nCONTACT\nName: ${body.name}\nEmail: ${body.email}\nPhone: ${
            body.phone
          }`;

      const subject = isTransfer
        ? `New transfer: ${body.from_location} → ${body.to_location} — ${body.name}`
        : `New tour booking: ${body.tour_name} — ${body.name}`;

      const formData = new FormData();
      formData.append("access_key", WEB3FORMS_KEY);
      formData.append("subject", subject);
      formData.append("name", body.name);
      formData.append("email", body.email);
      formData.append("message", message);

      const w3res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const text = await w3res.text();
      console.log("Web3Forms raw response:", text);
    } catch (emailErr) {
      console.error("Web3Forms error (non-fatal):", emailErr);
    }

    return Response.json({ ok: true, data });
  } catch (err) {
    console.error("API error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
