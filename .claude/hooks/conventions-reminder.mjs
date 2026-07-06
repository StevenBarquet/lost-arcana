#!/usr/bin/env node
/**
 * Hook PreToolUse (Write|Edit) — recordatorio de convenciones.
 *
 * Cuando se va a escribir/editar un archivo dentro de apps/frontend/src o
 * apps/backend/src, inyecta un recordatorio NO bloqueante que apunta a claude.md
 * como FUENTE ÚNICA DE VERDAD de las convenciones. No duplica reglas aquí: solo
 * pide releer la sección relevante y respetarla, para que las convenciones se
 * comporten como "prompt de sistema" presente en el momento de escribir código.
 *
 * Determinista: se dispara siempre que el path coincida. La regla es firme por
 * defecto; solo puede saltarse si el usuario lo autoriza explícitamente para ese
 * archivo, y ese override NO aplica al resto de la conversación.
 *
 * Sin dependencias (no usa jq): lee el JSON del hook por stdin con Node.
 */

let raw = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', (chunk) => (raw += chunk));
process.stdin.on('end', () => {
  let filePath = '';
  try {
    const input = JSON.parse(raw || '{}');
    filePath = input?.tool_input?.file_path ?? '';
  } catch {
    // JSON inválido → no estorbar, salir en silencio.
    process.exit(0);
  }

  // Normaliza separadores para comparar rutas de forma portable.
  const normalized = filePath.replace(/\\/g, '/');

  const isFrontend = normalized.includes('apps/frontend/src');
  const isBackend = normalized.includes('apps/backend/src');
  if (!isFrontend && !isBackend) process.exit(0);

  const area = isFrontend ? 'FRONTEND' : 'BACKEND';
  const section = isFrontend ? 'FRONTEND ONLY' : 'BACKEND ONLY';

  const specifics = isFrontend
    ? [
        'className en el elemento raíz (string con el nombre del componente si NO hay SCSS)',
        'secciones de import comentadas (// ---Dependencies, // ---Components, ...)',
        'return types explícitos y la estructura de componente (CONSTS/HOOKS, MAIN, AUX, RENDER)',
        'PREFERIR los generadores plop (npm run generate-comp / generate-page / generate-store) en vez de crear componentes o pages a mano',
      ]
    : [
        'folder-per-endpoint para REST y los patrones de tRPC (routers en trpc/routers/, registro en app.router.ts)',
        'validación de inputs con zod, envs vía TYPED_ENVS (nunca process.env directo)',
        'convenciones de estructura y estilo de la sección correspondiente',
      ];

  const context = [
    `Vas a escribir código de ${area} (${normalized}).`,
    `Antes de generar el archivo, relee la sección "${section}" de claude.md y respétala. claude.md es la FUENTE ÚNICA DE VERDAD de las convenciones (no dupliques reglas de memoria; usa lo que diga el archivo, que puede haber cambiado).`,
    `Puntos que suelen olvidarse: ${specifics.map((s) => `\n  • ${s}`).join('')}`,
    `La regla es FIRME por defecto. Solo puedes saltarte una convención si el usuario te lo autorizó EXPLÍCITAMENTE para este archivo; ese override NO se extiende al resto de la conversación (este recordatorio vuelve a aplicar en el siguiente Write/Edit).`,
  ].join('\n\n');

  process.stdout.write(
    JSON.stringify({
      hookSpecificOutput: {
        hookEventName: 'PreToolUse',
        additionalContext: context,
      },
    }),
  );
  process.exit(0);
});
