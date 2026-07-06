# 🖥️ Backend — Express 5 + tRPC

> API **tRPC** (type-safe end-to-end) montada sobre **Express 5** con TypeScript, más
> una API REST de ejemplo que coexiste. Trae envs tipadas, logger por entorno,
> superjson, subscriptions por SSE y tests con Vitest.

<p align="left">
  <img alt="Node" src="https://img.shields.io/badge/Node-26.x-339933?logo=node.js&logoColor=white">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white">
  <img alt="Express" src="https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white">
  <img alt="tRPC" src="https://img.shields.io/badge/tRPC-11-2596BE?logo=trpc&logoColor=white">
  <img alt="Vitest" src="https://img.shields.io/badge/Vitest-4-6E9F18?logo=vitest&logoColor=white">
</p>

> Parte del [monorepo](../../README.md). Se corre desde la raíz con `npm run back`,
> o desde esta carpeta con `npm run dev`.

---

## 📑 Tabla de contenidos

1. [Qué incluye](#-qué-incluye)
2. [Estructura](#-estructura)
3. [Uso rápido](#-uso-rápido)
4. [tRPC](#-trpc)
5. [Realtime: subscriptions por SSE](#-realtime-subscriptions-por-sse)
6. [Cómo agregar un procedure tRPC](#-cómo-agregar-un-procedure-trpc)
7. [API REST (coexiste)](#-api-rest-coexiste)
8. [Variables de entorno (envs tipadas)](#-variables-de-entorno-envs-tipadas)
9. [Logging](#-logging)
10. [Scripts](#-scripts)
11. [Pendientes conocidos](#-pendientes-conocidos)

---

## 🎯 Qué incluye

| Pieza                | Cómo lo resuelve                                                        |
| -------------------- | ---------------------------------------------------------------------- |
| 🔗 tRPC              | API type-safe en `/trpc`; el tipo `AppRouter` lo consume el FE          |
| 🧬 superjson         | Transformer end-to-end: `Date`/`Map`/`Set`/`BigInt` viajan sin perder tipo |
| 📡 Realtime (SSE)    | Subscriptions por SSE con async generators (sin WebSocket)             |
| 🛣️ REST (ejemplo)    | API REST en `/api/v1` que coexiste (registro auto-montable + log al boot) |
| 🔐 Envs tipadas      | Sistema de envs que **valida al arrancar** y expone `TYPED_ENVS`        |
| 🐛 Logging           | Logger basado en `debug`, con namespaces por nivel                     |
| 🛡️ Middlewares       | Morgan, Helmet, CORS y manejadores de error preconfigurados            |
| 🧪 Tests             | Vitest + supertest, con reporte de cobertura                           |

---

## 🗂️ Estructura

```
src/
  index.ts                  # 🚪 Entrypoint: arranca el servidor HTTP
  trpc/
    trpc.ts                 # initTRPC: router, publicProcedure (superjson + errorFormatter)
    context.ts              # createContext por-request (auth/db/servicios a futuro)
    app.router.ts           # Router raíz + export type AppRouter (lo consume el FE)
    routers/
      items.router.ts       # Ejemplo query + mutation (con validación zod)
      notifications.router.ts # Ejemplo subscription por SSE (async generator)
  app/
    express-app.ts          # Setup de Express: monta /trpc y /api/v1
    route-logger.ts         # Imprime las rutas REST registradas al arrancar
  api/v1/
    index.ts                # 🛣️ Registro de rutas REST (única fuente de verdad)
    health/                 # GET /api/v1/health (info del commit)
    items/                  # POST /api/v1/items (ejemplo REST, espejo del router tRPC)
  configs/
    typed-envs.ts           # Export final de las envs ya tipadas (TYPED_ENVS)
    logger.ts               # Logger basado en debug (namespaces con color)
    constants.ts            # Constantes globales
    envs/                   # Sistema de envs (default → dev/prod → secrets)
  middlewares/
    general-and-small.ts    # Morgan, Helmet, CORS, manejadores de error
  models/
    responses.ts            # Tipos de respuesta compartidos
  database/                 # Reservado: config de DB, ORM, queries
  3rd-party/                # Reservado: integraciones con SDKs
  test/                     # Tests (Vitest)
```

---

## ⚡ Uso rápido

```bash
# Desde la raíz del monorepo
npm run back        # dev server con hot reload

# O desde apps/backend
npm run dev
```

Por defecto el servidor asume el puerto **4000** (ajustable vía envs). Expone dos APIs:

- **tRPC** en `http://localhost:4000/trpc` — capa de datos type-safe (principal).
- **REST** en `http://localhost:4000/api/v1` — ejemplo del paradigma REST (coexiste).

---

## 🔗 tRPC

La capa de datos principal es **tRPC v11** con type-safety end-to-end. El núcleo vive
en `src/trpc/`:

```ts
// trpc.ts — una sola instancia por backend
const t = initTRPC.context<Context>().create({
  transformer: superjson,          // Date/Map/Set/BigInt end-to-end
  errorFormatter({ shape, error }) { /* adjunta zodError en error.data */ },
});
export const router = t.router;
export const publicProcedure = t.procedure;
```

Se monta sobre Express con el adapter oficial (`src/app/express-app.ts`):

```ts
app.use('/trpc', createExpressMiddleware({ router: appRouter, createContext }));
```

**El tipo `AppRouter`** (`src/trpc/app.router.ts`) es la pieza clave: lo exporta el
backend y lo importa el frontend como **type-only** (vía alias `backend/*`), dándote
autocompletado y errores de tipo FE↔BE sin generar código ni clientes.

> `superjson` está configurado como transformer: los `Date` (y `Map`/`Set`/`BigInt`)
> llegan al FE como su tipo real, no como string. El transformer del cliente **debe
> coincidir** (ver README del frontend).

---

## 📡 Realtime: subscriptions por SSE

El realtime se hace con **subscriptions tRPC servidas por SSE** (Server-Sent Events),
que es HTTP normal — **no se usa WebSocket**. Las subscriptions son **async generators**:

```ts
// notifications.router.ts
onNotification: publicProcedure.subscription(async function* (opts) {
  for await (const [n] of on(emitter, 'notify', { signal: opts.signal })) {
    yield tracked(n.id, n);   // tracked() → el navegador reanuda con lastEventId
  }
}),
```

El cliente enruta las subscriptions por `httpSubscriptionLink` (SSE) y el resto por
`httpBatchLink`, usando `splitLink` (ver README del frontend). SSE trae **reconexión
automática** del navegador.

> ⚠️ El emitter es **in-memory**: perfecto para un solo proceso. Si escalas a varias
> instancias del backend, pon un pub/sub externo (Redis, etc.) detrás del emitter.

### ¿SSE o WebSocket?

**SSE es ideal para tiempo real sencillo** (notificaciones, feeds, progreso): setup
mínimo, reconexión nativa, sin infraestructura extra. Si necesitas **tiempo real de
baja latencia o bidireccional** (colaboración en vivo, juegos), migra a **WebSocket**:
tRPC también trae la infra (`wsLink` en el cliente + `applyWSSHandler` en el servidor),
y **tras la configuración el uso en BE/FE es idéntico** (las subscriptions siguen siendo
los mismos async generators). Para WebSockets **crudos** (fuera de tRPC), ver el template
hermano: [monorepo-template-2026-react-vite-express](https://github.com/StevenBarquet/monorepo-template-2026-react-vite-express).

---

## ➕ Cómo agregar un procedure tRPC

1. Crea (o edita) un router en `src/trpc/routers/tu-router.router.ts` con
   `publicProcedure.query(...)`, `.mutation(...)` o `.subscription(...)`.
2. Regístralo en el router raíz `src/trpc/app.router.ts`.
3. Listo — queda disponible en `/trpc` y el tipo `AppRouter` se actualiza solo, así que
   el FE lo ve al instante con autocompletado.

> Cuando se adapten los generadores de backend, este paso será un `npm run` (ver
> [Pendientes](#-pendientes-conocidos)).

---

## 🛣️ API REST (coexiste)

Además de tRPC, se conserva una API REST de ejemplo en `/api/v1` (útil para
healthchecks, webhooks o clientes que no hablan tRPC). El registro es auto-montable:

1. Crea `src/api/v1/tu-ruta/controller.ts`.
2. Agrega una entrada al array `routes` en [`src/api/v1/index.ts`](src/api/v1/index.ts).
3. Se monta solo y aparece en el log de rutas al arrancar.

Rutas actuales: `GET /api/v1/health` (info del commit) y `POST /api/v1/items` (espejo
REST del router tRPC `items`, para comparar ambos paradigmas).

---

## 🔐 Variables de entorno (envs tipadas)

En lugar de leer `process.env.LO_QUE_SEA` disperso y sin tipos, el backend centraliza
y **valida** las envs al arrancar.

```
default.ts       ─┐
dev.ts / prod.ts ─┤ (según NODE_ENV)   ┌─ valida que ninguna quede vacía/undefined
                  ├──► EnvsLoader ──────┤
secrets.ts       ─┘                     └─► TYPED_ENVS (tipado, sin `| undefined`)
```

- `configs/envs/default.ts` → valores comunes a todos los entornos.
- `configs/envs/dev.ts` / `prod.ts` → según `NODE_ENV`.
- `configs/envs/secrets.ts` → secretos **locales**, fuera de git (lo genera el
  `postinstall` del monorepo si no existe).
- `configs/envs/index.ts` → el `EnvsLoader` mezcla todo y **lanza error si alguna
  variable queda vacía**, para fallar rápido.

Uso:

```ts
import { TYPED_ENVS } from '@/configs/typed-envs'

console.log(TYPED_ENVS.PORT) // tipado, con autocompletado
```

---

## 🐛 Logging

Logger basado en [`debug`](https://www.npmjs.com/package/debug) en
[`src/configs/logger.ts`](src/configs/logger.ts). Los logs **solo se imprimen si la
variable `DEBUG` lo permite**.

```bash
DEBUG=app:*     npm run dev   # todos los logs
DEBUG=app:error ...           # solo errores
```

> En `npm run dev` ya viene `DEBUG=app:*`; en `npm run prod` se usa `DEBUG=app:prod`.

---

## 📜 Scripts

| Script              | Qué hace                                          |
| ------------------- | ------------------------------------------------- |
| `npm run dev`       | Server con hot reload (Node `--watch` + tsx).     |
| `npm run build`     | Transpila a `dist/` (`tsc` + `tsc-alias`).        |
| `npm start`         | Ejecuta el build compilado.                       |
| `npm run prod`      | `build` + `start` (NODE_ENV=production).          |
| `npm test`          | Tests con Vitest.                                 |
| `npm run coverage`  | Tests + reporte de cobertura.                     |
| `npm run typecheck` | Type check sin emitir.                            |
| `npm run clean`     | Borra `dist/`.                                    |

> Desde la raíz del monorepo hay atajos: `back`, `back-build`, `back-prod`,
> `back-typecheck`, `back-test`, `back-coverage`.

---

## ⚠️ Pendientes conocidos

- [ ] **Generadores plop de BE.** `generators/backend/` viene del stack anterior
      (Apollo/GraphQL) y **no está adaptado** a tRPC. Reescribir para que generen un
      `*.router.ts` + su registro en `app.router.ts`.
- [ ] **Envs residuo de Vivir Tekk.** `envs/prod.ts` y `envs/dev.ts` traen `DB_URL`
      (Postgres/Prisma) y una `FRONTEND_URL` hardcodeada que no aplican a este template
      in-memory. `npm run back-prod` exige `DB_URL` para arrancar. Limpiar (Fase 7).
- [ ] **Procedures protegidos.** No hay auth/middlewares aún; `context` está listo para
      inyectar usuario/sesión cuando se necesite un `protectedProcedure`.
- [ ] **Error handler REST.** Estudiar y definir la estrategia final.
- [ ] **`models/responses.ts`.** Evaluar si el patrón se mantiene o se redefine.

---

## Requisitos

- Node.js `>= 26.0.0`
