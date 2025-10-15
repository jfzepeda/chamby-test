"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

function Select({
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      data-slot="select"
      className={cn(
        "w-full appearance-none text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg px-4 py-2 shadow-sm hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200",
        className
      )}
      style={{
        backgroundImage:
          'url(\'data:image/svg+xml;utf8,<svg fill="none" stroke="%23666" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>\')',
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 0.75rem center",
        backgroundSize: "1em",
        color: "#374151",
        cursor: "pointer",
      }}
      {...props}
    >
      {children ?? (
        <>
          <option
            value="jardineria"
            className="bg-white text-gray-700 hover:bg-blue-50"
          >
            Jardinería
          </option>
          <option
            value="limpieza"
            className="bg-white text-gray-700 hover:bg-blue-50"
          >
            Limpieza
          </option>
          <option
            value="fontaneria"
            className="bg-white text-gray-700 hover:bg-blue-50"
          >
            Fontanería
          </option>
        </>
      )}
    </select>
  );
}

export { Select };
