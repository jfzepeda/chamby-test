"use client";
import { Select, MenuItem, SelectProps } from "@mui/material";

import * as React from "react";
import { cn } from "@/lib/utils";

function SelectService({ className, ...props }: SelectProps) {
  return (
    <Select
      data-slot="select"
      className={cn(
        "w-full appearance-none text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200",
        className
      )}
      sx={{
        backgroundImage:
          'url(\'data:image/svg+xml;utf8,<svg fill="none" stroke="%23666" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>\')',
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 0.75rem center",
        backgroundSize: "1em",
        color: "#374151",
        cursor: "pointer",
        borderRadius: "0.3rem",
      }}
      {...props}
    >
      <MenuItem value="" disabled>
        Selecciona un servicio
      </MenuItem>
      <MenuItem value="Limpieza">Limpieza</MenuItem>
      <MenuItem value="Jardinería">Jardinería</MenuItem>
      <MenuItem value="Fontanería">Fontanería</MenuItem>
      <MenuItem value="Electricidad">Electricidad</MenuItem>
      <MenuItem value="Pintura">Pintura</MenuItem>
      <MenuItem value="Mudanzas">Mudanzas</MenuItem>
      <MenuItem value="Reparaciones menores">Reparaciones menores</MenuItem>
      <MenuItem value="Cuidado de mascotas">Cuidado de mascotas</MenuItem>
      <MenuItem value="Cuidado de niños">Cuidado de niños</MenuItem>
      <MenuItem value="Servicios de tecnología">
        Servicios de tecnología
      </MenuItem>
      <MenuItem value="Otros">Otros</MenuItem>
    </Select>
  );
}

export { SelectService };
