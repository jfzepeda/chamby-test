"use client";

import { redis } from "@/lib/redis";
import { redirect } from "next/navigation";

export async function createSubdomainAction(
  prevState: any,
  formData: FormData
) {
  const subdomain = formData.get("subdomain") as string;
  const icon = formData.get("icon") as string;

  if (!subdomain || !icon) {
    return {
      subdomain,
      icon,
      success: false,
      error: "Subdomain and icon are required",
    };
  }

  const sanitizedPhone = subdomain.replace(/[^0-9]/g, "");

  if (sanitizedPhone !== subdomain) {
    return {
      subdomain,
      icon,
      success: false,
      error: "Ingresa un número de teléfono válido (solo números)",
    };
  }

  const texto_para_whatsapp = `Hola,%20me%20gustaría%20contratar%20el%20servicio%20de%20${icon}.`;
  const url = `https://wa.me/5213411479199?text=${texto_para_whatsapp}`;
  // redirect(url);
  // abrir una nueva pestaña con la url
  window.open(url, "_blank");
}

export async function deleteSubdomainAction(
  prevState: any,
  formData: FormData
) {
  const subdomain = formData.get("subdomain");
  await redis.del(`subdomain:${subdomain}`);
  return { success: "Domain deleted successfully" };
}

// AI-related actions moved to app/ai-actions.ts (server)
