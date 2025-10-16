"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SelectService } from "@/components/ui/select";
import { createSubdomainAction } from "@/app/actions";
import { askOpenai } from "@/app/ai-actions";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

type CreateState = {
  error?: string;
  success?: boolean;
  description?: string;
  subdomain?: string;
  service?: string;
};

function PhoneInput({ defaultValue }: { defaultValue?: string }) {
  const [phone, setPhone] = useState(defaultValue || "");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // solo números
    setPhone(value);
    if (value && !/^\d{10}$/.test(value)) {
      if (value.length > 10) {
        setPhone(value.slice(0, 10)); // limitar a 10 dígitos
      } else {
        setError("Debe tener exactamente 10 dígitos numéricos");
      }
    } else {
      setError("");
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="subdomain">Número de teléfono</Label>
      <div className="flex items-center">
        <div className="relative flex-1">
          <Input
            id="subdomain"
            name="subdomain"
            placeholder="Ej. 3312345678"
            value={phone}
            onChange={handleChange}
            className="w-full rounded focus:z-10"
            required
          />
        </div>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}

function DescriptionInput({
  defaultValue,
  onServiceDetected,
}: {
  defaultValue?: string;
  onServiceDetected: (service: string) => void;
}) {
  const [text, setText] = useState(defaultValue || "");
  const [error, _setError] = useState("");

  const [aiState, aiAction, aiPending] = useActionState<any, FormData>(
    askOpenai,
    {}
  );

  useEffect(() => {
    if (aiState?.service) {
      onServiceDetected(aiState.service);
    }
    if (aiState?.error) {
      // surface validation error from server action
      _setError(aiState.error);
    } else if (aiState?.success) {
      _setError("");
    }
  }, [aiState, onServiceDetected]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setText(value);
  };

  return (
    <div className="space-y-4">
      <Label htmlFor="description">Tarea a realizar</Label>
      <div className="flex items-center">
        <div className="relative flex-1">
          <Input
            id="description"
            name="description"
            placeholder="Necesito una persona que me ayude con..."
            value={text}
            onChange={handleChange}
            className="w-full rounded focus:z-10"
            required
          />
        </div>
        <div className="ml-2">
          <Button
            type="submit"
            variant="secondary"
            formAction={aiAction}
            formNoValidate
            disabled={aiPending}
          >
            {aiPending ? "..." : <AutoAwesomeIcon />}
          </Button>
        </div>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}

function ServicePicker({
  service,
  setService,
  defaultValue,
}: {
  service: string;
  setService: (service: string) => void;
  defaultValue?: string;
}) {
  useEffect(() => {
    if (defaultValue && !service) {
      setService(defaultValue);
    }
  }, [defaultValue, service, setService]);
  return (
    <div className="space-y-2">
      <Label htmlFor="service">Servicio</Label>
      <SelectService
        name="service"
        id="service"
        required
        value={service || ""}
        onChange={(e, child) =>
          setService((e.target as HTMLInputElement).value)
        }
      >
        {/* <option value="">Selecciona un servicio</option>
        <option value="jardineria">Jardinería</option>
        <option value="limpieza">Limpieza</option>
        <option value="fontaneria">Fontanería</option> */}
      </SelectService>
    </div>
  );
}

export function SubdomainForm() {
  const [service, setService] = useState("");

  const fixedCreateSubdomainAction = async (
    prevState: CreateState,
    formData: FormData
  ): Promise<CreateState> => {
    return createSubdomainAction(prevState, formData).then(
      (result) =>
        result ?? {
          subdomain: "",
          description: "",
          service: "",
          success: false,
          error: "",
        }
    );
  };

  const [state, action, isPending] = useActionState<CreateState, FormData>(
    fixedCreateSubdomainAction,
    {}
  );

  return (
    <form action={action} className="space-y-4">
      <PhoneInput defaultValue={state?.subdomain} />
      <DescriptionInput
        defaultValue={state?.description}
        onServiceDetected={setService}
      />

      <ServicePicker
        service={service}
        setService={setService}
        defaultValue={state?.service}
      />

      {state?.error && (
        <div className="text-sm text-red-500">{state.error}</div>
      )}

      <Button type="submit" className="w-full" disabled={isPending || !service}>
        {isPending ? "Enviando..." : "Contactar"}
      </Button>
    </form>
  );
}
