import type { Config } from "@netlify/functions";

export default async function handler() {
  await fetch("https://transfer-cg.netlify.app/api/keepalive");
  return new Response("ok");
}

export const config: Config = {
  schedule: "0 0 */5 * *",
};
