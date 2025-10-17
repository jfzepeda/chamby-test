"use client";

import { redis } from "@/lib/redis";
import { redirect } from "next/navigation";

export async function createSubdomainAction(
  prevState: any,
  formData: FormData
) {
  const phone = formData.get("phone") as string;
  const service = formData.get("service") as string;

  if (!phone || !service) {
    return {
      phone,
      service,
      success: false,
      error: "Subdomain and service are required",
    };
  }

  const sanitizedPhone = phone.replace(/[^0-9]/g, "");

  if (sanitizedPhone !== phone) {
    return {
      phone,
      service,
      success: false,
      error: "Ingresa un número de teléfono válido (solo números)",
    };
  }

  const texto_para_whatsapp = `Hola,%20me%20gustaría%20contratar%20el%20servicio%20de%20${service}.`;
  // const url = `https://wa.me/5213411479199?text=${texto_para_whatsapp}`;
  const url = `https://t.me/The_Chamby_Bot?start=${texto_para_whatsapp}`;
  // redirect(url);
  // abrir una nueva pestaña con la url
  window.open(url, "_blank");
}

export async function deleteSubdomainAction(
  prevState: any,
  formData: FormData
) {
  const phone = formData.get("phone");
  await redis.del(`phone:${phone}`);
  return { success: "Domain deleted successfully" };
}

// AI-related actions moved to app/ai-actions.ts (server)
