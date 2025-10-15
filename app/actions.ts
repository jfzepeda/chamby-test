"use server";

import { redis } from "@/lib/redis";
import { isValidIcon } from "@/lib/subdomains";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { rootDomain, protocol } from "@/lib/utils";

export async function createSubdomainAction(
  prevState: any,
  formData: FormData
) {
  const telefono = formData.get("subdomain") as string;
  const servicio = formData.get("icon") as string;

  if (!telefono || !servicio) {
    return { success: false, error: "Subdomain and icon are required" };
  }

  const sanitizedPhone = telefono.toLowerCase().replace(/[^a-z0-9-]/g, "");

  if (sanitizedPhone !== telefono) {
    return {
      telefono,
      servicio,
      success: false,
      error: "Ingresa un número de teléfono válido (solo números)",
    };
  }

  const texto_para_whatsapp = `Hola,%20me%20gustaría%20contratar%20el%20servicio%20de%20${servicio}.`;
  redirect(`https://wa.me/5213411479199?text=${texto_para_whatsapp}`);
}

export async function deleteSubdomainAction(
  prevState: any,
  formData: FormData
) {
  const subdomain = formData.get("subdomain");
  await redis.del(`subdomain:${subdomain}`);
  revalidatePath("/admin");
  return { success: "Domain deleted successfully" };
}
