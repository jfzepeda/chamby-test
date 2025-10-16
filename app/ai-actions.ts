"use server";

import { clasificarServicio } from "@/lib/openai";

export async function getServiceEnum(_prevState: any, textDescription: string) {
  const service = await clasificarServicio(textDescription);
  return service;
}

export async function askOpenai(prevState: any, formData: FormData) {
  const description = (formData.get("description") as string) || "";

  if (!description.trim()) {
    return {
      ...prevState,
      success: false,
      error: "La descripción es requerida",
    };
  }

  const service = await getServiceEnum(prevState, description);

  return {
    ...prevState,
    description,
    service,
    success: true,
  };
}

