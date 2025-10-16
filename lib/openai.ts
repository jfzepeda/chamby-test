const openai_api_key = process.env.OPENAI_API_KEY;

const servicios = [
  "Limpieza",
  "Jardinería",
  "Fontanería",
  "Electricidad",
  "Pintura",
  "Mudanzas",
  "Reparaciones menores",
  "Cuidado de mascotas",
  "Cuidado de niños",
  "Servicios de tecnología",
  "Otros",
];

export async function clasificarServicio(descripcion: string) {
  if (!openai_api_key) {
    throw new Error("La clave de API de OpenAI no está configurada.");
  }
  const respuesta = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${openai_api_key}`,
    },
    body: JSON.stringify({
      model: "gpt-4.1-nano",
      input: `
        Eres un clasificador que debe devolver solo un valor exacto del siguiente ENUM:
        ${JSON.stringify(servicios)}.
        La respuesta debe ser en formato json bajo la clave "category".
        Analiza la siguiente descripción y responde únicamente con uno de los valores:
        "${descripcion}"
      `,
      max_output_tokens: 16,
      text: {
        format: {
          type: "json_object",
        },
      },
    }),
  });

  const data = await respuesta.json();
  const json_res = data.output[0].content[0].text;
  const parsed = JSON.parse(json_res);
  // Respuesta de OpenAI parsed: { category: 'Limpieza' }
  const categoria = parsed.category;
  console.log("Respuesta de OpenAI categoria:", categoria);
  return categoria;
}
