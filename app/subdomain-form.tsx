"use client";

import type React from "react";

import { useState } from "react";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Smile } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  EmojiPicker,
  EmojiPickerContent,
  EmojiPickerSearch,
  EmojiPickerFooter,
} from "@/components/ui/emoji-picker";
import { createSubdomainAction } from "@/app/actions";
import { rootDomain } from "@/lib/utils";

type CreateState = {
  error?: string;
  success?: boolean;
  subdomain?: string;
  icon?: string;
};

function SubdomainInput({ defaultValue }: { defaultValue?: string }) {
  return (
    <div className="space-y-2">
      <Label htmlFor="subdomain">Número de teléfono</Label>
      <div className="flex items-center">
        <div className="relative flex-1">
          <Input
            id="subdomain"
            name="subdomain"
            placeholder="Ej. 33 1234 5678"
            defaultValue={defaultValue}
            className="w-full rounded-r-none focus:z-10"
            required
          />
        </div>
      </div>
    </div>
  );
}

function ServicePicker({
  icon,
  setIcon,
  defaultValue,
}: {
  icon: string;
  setIcon: (icon: string) => void;
  defaultValue?: string;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor="service">Servicio</Label>
      <Select
        name="service"
        id="service"
        required
        className="w-full"
        onChange={(e) => setIcon(e.target.value)}
      >
        <option value="">Selecciona un servicio</option>
        <option value="jardineria">Jardinería</option>
        <option value="limpieza">Limpieza</option>
        <option value="fontaneria">Fontanería</option>
      </Select>
    </div>
  );
}

export function SubdomainForm() {
  const [icon, setIcon] = useState("");

  const [state, action, isPending] = useActionState<CreateState, FormData>(
    createSubdomainAction,
    {}
  );

  return (
    <form action={action} className="space-y-4">
      <SubdomainInput defaultValue={state?.subdomain} />

      <ServicePicker icon={icon} setIcon={setIcon} defaultValue={state?.icon} />

      {state?.error && (
        <div className="text-sm text-red-500">{state.error}</div>
      )}

      <Button type="submit" className="w-full" disabled={isPending || !icon}>
        {isPending ? "Enviando..." : "Contactar"}
      </Button>
    </form>
  );
}
