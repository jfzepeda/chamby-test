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

  // const texto = `Hola, me gustaría contratar el servicio de ${service}.`;
  // const texto_para_whatsapp = encodeURIComponent(texto);
  const texto_simple = `contratarServicioDe${service}`;

  // eliminar espacio y caracteres especiales para telegram
  const texto_para_telegram = texto_simple
    .replace(/ /g, "")
    .replace(/,/g, "")
    .replace(/á/g, "a")
    .replace(/é/g, "e")
    .replace(/í/g, "i")
    .replace(/ó/g, "o")
    .replace(/ú/g, "u")
    .replace(/ñ/g, "n");

  const url = `https://t.me/The_Chamby_Bot?start=${texto_para_telegram}`;
  // const url = `https://wa.me/5213411479199?text=${texto_para_whatsapp}`;
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
