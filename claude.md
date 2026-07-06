# Language

- SIEMPRE responde en español. Nunca uses inglés en tus respuestas al usuario.

# Project Rules

> **Monorepo.** Este repo usa **npm workspaces** sobre **Node 26** y organiza el
> código en `apps/`:
> - `apps/frontend` — Vite + React (SPA client-side).
> - `apps/backend` — tRPC API sobre Express (+ REST de ejemplo).
> - `apps/shared` — código compartido entre BE y FE (workspace `@app/shared`).
>
> Las reglas están divididas en tres secciones. **Lee la que corresponde a lo que
> estás tocando:**
> - **[GENERAL](#general)** — aplica a todo el monorepo.
> - **[FRONTEND ONLY](#frontend-only)** — aplica solo a `apps/frontend`.
> - **[BACKEND ONLY](#backend-only)** — aplica solo a `apps/backend`.

---

# GENERAL

Reglas transversales a todo el monorepo.

## Git Policy

- NEVER commit, push, or interact with git in any way
- The user is solely responsible for all git operations
- Do not run git add, git commit, git push, git stash, or any other git command

## Monorepo Layout

```
monorepo/
├── apps/
│   ├── frontend/       # Vite + React SPA
│   ├── backend/        # tRPC API sobre Express (+ REST de ejemplo)
│   └── shared/         # @app/shared — tipos, utils, schemas compartidos
├── generators/         # Plantillas plop (scaffolding FE y BE)
├── scripts/            # Scripts de infra (git hooks, versionado por commit)
└── package.json        # Root — workspaces + scripts orquestadores
```

- **Package manager: npm** (npm workspaces). No usar yarn/pnpm.
- **Runtime: Node 26** (`engines` en cada `package.json`).
- Scripts orquestadores viven en el `package.json` raíz (`front`, `back`,
  `generate-*`) y delegan al workspace con `npm run <script> --workspace=<app>`.
- Para agregar una dependencia a un workspace:
  `npm install <pkg> --workspace=apps/<app>` (o `-D` para devDependency).
- **PROHIBIDO instalar dependencias sin el flag `-E` (`--save-exact`).** Siempre
  versiones exactas, nunca rangos con caret (`^`) ni tilde (`~`). Ejemplo correcto:
  `npm install -E <pkg>` / `npm install -D -E <pkg>`. Si un `package.json` termina
  con `^` o `~` en alguna versión, es un error: pínnealo a la versión exacta.
  ⚠️ Poner la versión en el nombre (`npm i pkg@1.2.3`) **NO basta**: npm igual
  escribe `^1.2.3` en el `package.json`. El flag `-E` es obligatorio SIEMPRE,
  incluso con versión explícita. Antes de correr cualquier `npm install`,
  verifica que `-E` esté presente en el comando.

## Shared Code (`@app/shared`)

- Código usado por **más de un** workspace (BE y FE) vive en `apps/shared`:
  tipos de dominio, constantes y utils puros.
- Regla de dependencias: si un util de `shared` necesita una librería, esa
  librería se declara en el `package.json` de **quien consume** el util. npm
  hoistea a `node_modules` raíz; no se duplica físicamente.
- Tipos exclusivos del BE van en `apps/backend/src/models/`. Solo se mueven a
  shared si el FE también los necesita.

## Scaffolding — Prefer Generators

- Para crear páginas, componentes, stores o hooks, **usa los generadores plop**
  (`npm run generate-page`, `generate-comp`, `generate-store`, `generate-hook`)
  en vez de crear los archivos a mano. Garantizan estructura, naming y boilerplate
  consistentes (y registran rutas automáticamente en el caso de `generate-page`).
- Crea archivos a mano solo cuando ningún generador cubra el caso.
- Si un generador produce algo desactualizado respecto a estas reglas, **arregla
  la plantilla** (`generators/`), no solo el archivo generado.

> **Hook de convenciones.** Existe un hook `PreToolUse` (ver
> [`.claude/settings.json`](.claude/settings.json) →
> [`.claude/hooks/conventions-reminder.mjs`](.claude/hooks/conventions-reminder.mjs))
> que, al escribir/editar archivos en `apps/frontend/src` o `apps/backend/src`,
> reinyecta un recordatorio de releer la sección relevante de este archivo. **claude.md
> es la fuente única de verdad**: agrega o modifica convenciones AQUÍ; el hook solo
> apunta a este archivo, no duplica reglas. La regla es firme por defecto; solo se
> salta si el usuario lo autoriza explícitamente para ese archivo (sin extenderse al
> resto de la conversación).

## Verification (before calling something done)

- Tras cambios no triviales, **verifica que compila** antes de darlo por terminado:
  - **Frontend:** `npm run front-build` (que hace `tsc && vite build`) — o al menos
    `tsc --noEmit` + levantar el dev server.
  - **Backend:** `npm run back-typecheck` (`tsc --noEmit`) + `npm run back-test`.
- Confirmar que **no hay errores ni warnings** nuevos.
- No reportar un cambio como completo sin esta verificación.

## Prefer Modern Syntax

- Al tocar configs, estilos o TS, usa siempre la **API moderna vigente** de cada
  herramienta y evita sintaxis deprecada aunque "todavía funcione". Ejemplos ya
  adoptados: `@use`/`@forward` en Sass (nunca `@import`), `moduleResolution: "bundler"`
  en TS, resolución nativa de paths en Vite (sin `vite-tsconfig-paths`).

## No Quick-Fix Hacks

- **Nunca implementes soluciones rápidas que trasladen complejidad al developer.**
  Si un problema es de tooling/config, resuélvelo en tooling/config — no ensucies
  el código fuente para "salir del paso".
- Ejemplos de lo que NO es aceptable:
  - Agregar extensiones `.js` a imports en archivos TypeScript para satisfacer ESM.
  - Workarounds manuales repetitivos que el build tool debería manejar.
  - Cambios que "funcionan" pero que rompen la ergonomía o el estándar del proyecto.
- Ante un problema de build/runtime, **arregla la configuración o cambia la
  herramienta** — nunca parches en el código fuente.

## TypeScript Conventions

- Use `type` imports where possible
- Export constants with `as const` for literal types
- Prefer union types over enums (`'A' | 'B' | 'C' | 'D'`)
- Extract constants arrays for runtime use: `const MODELS = ['gpt-4o', 'gpt-4o-mini'] as const`

## General Code Style

- Use named exports, never default exports (excepción: páginas/módulos lazy-loaded
  que requieran `export default` para `React.lazy` / dynamic import)
- No comments explaining WHAT — only WHY when non-obvious
- When a pattern (component, hook, util) repeats across unrelated places, extract
  it to the right shared location. Do not tolerate copy-paste across siblings.

## File Organization (imports)

- Imports order: Dependencies → UI Dependencies → Custom Hooks → Components → Config/Utils → Styles
- Mark import sections with comments: `// ---Dependencies`, `// ---Custom Hooks`, `// ---Components`, `// ---Config`

---

# FRONTEND ONLY

Aplica exclusivamente a `apps/frontend`.

## Stack

- Vite + React 19 (full client-side SPA, no SSR)
- Ant Design (ConfigProvider for dark theming)
- **tRPC 11 + TanStack React Query 5** — type-safe data layer (client in `providers/TrpcProv`)
- **superjson** transformer (must match the backend)
- Zustand (with devtools + persist middleware) for client state
- SCSS Modules for styling
- react-router-dom for routing
- react-forge-grid (Frow, Fcol) for layouts
- TypeScript strict

### tRPC client

Uses the **new TanStack React Query integration** (`@trpc/tanstack-react-query`), NOT the
classic `createTRPCReact`. Setup in `providers/TrpcProv/`:

- `trpc.ts` → `createTRPCContext<AppRouter>()` exports `{ TRPCProvider, useTRPC }`. The
  `AppRouter` type is imported **type-only** from `backend/src/trpc/app.router` (alias
  `backend/*`), so it's erased from the bundle.
- `TrpcProv.tsx` → `QueryClient` + tRPC client with `splitLink`: subscriptions →
  `httpSubscriptionLink` (SSE), everything else → `httpBatchLink`. superjson on both.
- `trpc-vanilla-client.ts` → a plain `createTRPCClient` (no React Query) for
  promise-style calls (`await vanillaTRPC.items.list.query()`). Use for non-React code
  (utils/services/stores) or manual state handling; prefer the hooks in components.

Usage in components — always via `useTRPC()` + the `*Options` helpers:

```ts
const trpc = useTRPC();
const items  = useQuery(trpc.items.list.queryOptions());
const create = useMutation(trpc.items.create.mutationOptions());
useSubscription(trpc.notifications.onNotification.subscriptionOptions(undefined, {
  onData: ({ data }) => { /* data is fully typed; Date stays a Date */ },
}));
```

> Pendiente de integrar: **Formik + Zod** (`zod-formik-adapter`) para formularios.

### API calls — hooks en `src/api-calls/`

**Nunca llames a tRPC directamente desde un componente.** Toda llamada al backend
(query, mutation o subscription) se encapsula en un **custom hook** bajo
`src/api-calls/`, agrupado en una carpeta **por router** del backend. Un archivo
por call. El componente solo consume el hook — no conoce tRPC, cache ni invalidación.

```
src/api-calls/
├── items/                    # router `items`
│   ├── useItemsList.ts       # query    items.list
│   └── useCreateItem.ts      # mutation  items.create
└── notifications/            # router `notifications`
    ├── useOnNotification.ts  # subscription (SSE)
    └── usePingNotification.ts# mutation
```

**Naming: verbo + entidad**, que describa la acción, no el mecanismo tRPC.
`useItemsList`, `useCreateItem`, `useOnNotification` — NO `useQueryItems` ni
`useCreateItemMutate`. La carpeta ya dice a qué router pertenece.

**Los hooks son opinados** — centralizan la política del template para que el
componente quede limpio:

- **Retorno con nombres de dominio.** Aplana el objeto de React Query y renómbralo:
  `{ items, isLoading, error }`, `{ createItem, isCreating }`. No devuelvas el
  objeto crudo de RQ ni `mutate`/`isPending` sin renombrar.
- **Mutations: `onError` → `swalApiError`** (manejo de error consistente en toda
  la app) y, cuando aplique, **`onSuccess` invalida las queries afectadas** con
  `queryClient.invalidateQueries(trpc.<router>.<proc>.queryFilter())`. Acepta un
  `options?: { onSuccess?: () => void }` para efectos extra del componente
  (cerrar modal, navegar, etc.).
- **Queries: NO usan `onError`.** TanStack Query v5 lo eliminó de `useQuery`; el
  error se **retorna** (`error: query.error?.message ?? null`) y lo pinta quien
  consume. Swal solo en mutations.
- **Tipos de dominio.** El tipo de la entidad (`Item`) se infiere del router
  (`inferRouterOutputs<AppRouter>['items']['list'][number]`) y vive en su hook de
  `api-calls`; los componentes lo importan de ahí (única fuente de verdad, sin
  duplicar).

```ts
// api-calls/items/useCreateItem.ts — patrón mutation opinada
export function useCreateItem(options?: { onSuccess?: () => void }) {
  const trpc = useTRPC()
  const queryClient = useQueryClient()
  const mutation = useMutation(
    trpc.items.create.mutationOptions({
      onError: (error) => swalApiError(error.message),
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.items.list.queryFilter())
        options?.onSuccess?.()
      },
    }),
  )
  return { createItem: mutation.mutate, isCreating: mutation.isPending }
}
```

> **Cliente vanilla:** para código fuera de React (utils/services/stores) usa
> `vanillaTRPC` directamente (promesas), no un hook de `api-calls`. Los hooks son
> solo para componentes.

## Project Structure

```
apps/frontend/src/
├── api-calls/          # Hooks que envuelven llamadas al BE, una carpeta por router
│   ├── items/          # useItemsList, useCreateItem
│   └── notifications/  # useOnNotification, usePingNotification
├── pages/              # Route pages (one folder per page, flat by default)
│   ├── Home/           # Landing/home page
│   │   └── HomeCont/   # Page container component
│   └── Page404/        # 404 page
├── layout/             # App shell components (Layout, loaders)
├── common/             # Generic reusable UI building blocks (design-system level)
├── providers/          # Logical wrappers (AntdProv, ScrollToTop, GlobalProviders)
├── store/              # Zustand stores (one file per domain)
├── utils/
│   ├── functions/      # Pure utility functions
│   └── hooks/          # Generic reusable hooks
├── styles/             # Global SCSS (variables, utils, theme, animations)
├── appConfig/          # App-level config (constants)
├── assets/             # Static assets (SVGs, images)
├── Router/             # Route modules (Routes.tsx + AppRoutes.tsx)
├── App.tsx             # Root component
└── main.tsx            # Entry point
```

- **Pages son planas por defecto** (`src/pages/Home`, no `src/pages/Landing/Home`).
  Agrupar por sección (`Admin/`, `User/`, `Auth/`) solo si la app crece mucho.

## Component Conventions

### Structure

Every component follows this internal structure:

```tsx
// -----------------------CONSTS, HOOKS, STATES
// -----------------------MAIN METHODS
// -----------------------HELPERS
// -----------------------RENDER
```

### Naming and Files

- Component name in PascalCase matches its folder and file name
- Each component lives in its own folder: `ComponentName/ComponentName.tsx`
- SCSS module file: `ComponentName/ComponentName.module.scss`
- Auxiliary files (utils, constants, hooks) go in the same folder as the component that uses them

### Component Placement (Where does it live?)

Decide placement by asking: **who uses this component?**

| Who uses it | Where it lives | Examples |
|-------------|---------------|----------|
| Any component, context-agnostic (design-system level) | `src/common/` | `CopyButton`, `Spinner`, `DynamicIcon`, form controls |
| All pages (app shell / global visual structure) | `src/layout/` | `Layout`, `FullScreenLoading` |
| All pages (logical wrapper, non-visual) | `src/providers/` | `AntdProv`, `GlobalProviders`, `ScrollToTop` |
| A single parent component | Co-located inside the parent's folder | `HeadLabel/` inside `CollapseReusable/` |

### Co-location Rules

Components specific to a parent live inside its folder, mirroring the component tree:

```
ParentComponent/
├── ParentComponent.tsx
├── ParentComponent.module.scss
├── ChildA/
│   ├── ChildA.tsx
│   ├── ChildA.module.scss
│   ├── GrandchildX/
│   │   └── GrandchildX.tsx
│   └── GrandchildY/
│       └── GrandchildY.tsx
└── ChildB/
    └── ChildB.tsx
```

- Hooks, utils, constants that are specific to a component live in that component's folder
- If `common/` grows, group by type: `common/buttons/`, `common/forms/`, etc.

### Style Import Variable

Use `style` (singular), not `styles`:

```tsx
import style from './MyComponent.module.scss';
```

### className Usage

- The root element uses the SCSS module reference: `className={style.ComponentName}`
- All child elements use plain string classNames: `className="child-class"`
- Never reference `style.xxx` for anything other than the root element
- This works because SCSS modules have class collision names disabled in this project
- If the component has NO SCSS file, the root also uses a plain string: `className="ComponentName"`

### Explicit return types

- Explicit return types on components (`: ReactElement`)

## Styling Rules

### SCSS Module Boilerplate

Every SCSS module file MUST load variables, animations and utils via `@use`, even
if not immediately used. Usa `as *` para consumir variables/mixins sin namespace:

```scss
@use '/src/styles/variables' as *;
@use '/src/styles/animations' as *;
@use '/src/styles/utils' as *;

.ComponentName {
  // styles here
}
```

> **Sass moderno.** El proyecto usa la API moderna de Dart Sass: usa `@use` /
> `@forward`, **nunca `@import`** (deprecado). Para funciones de color usa el
> módulo `sass:color` (`@use 'sass:color'; color.mix(...)`), no las funciones
> globales `mix()` / `lighten()` / `darken()`.

### Minimize classNames in JSX

- The root element gets the component name className — that's mandatory
- For child elements, prefer targeting HTML tag specificity inside the parent scope rather than adding classNames
- Good targets: `h1`, `h2`, `header`, `footer`, `ul`, `li`, `button`, `blockquote`, `table`, `th`, `td`, `p`, `strong`, `small`
- Avoid targeting overly generic tags: `span`, `div` — these need a className
- Only add a className when the tag is too generic or when there are multiple sibling elements of the same tag that need different styles

```scss
// GOOD: targeting specific tags within component scope
.DaySummary {
  header { ... }
  ul { ... }
  li { ... }
  blockquote { ... }
}

// GOOD: className only when needed for specificity
.DaySummary {
  .badge { ... }
  .empty { ... }
}
```

### Nesting Rules

- El raíz `.ComponentName` es **depth 0**. Anida como máximo **2 niveles de
  profundidad** desde él (un hijo y su nieto es lo más profundo permitido).
- Contar es mecánico: cada `{` anidado suma un nivel. Un tag anidado directo bajo
  el raíz (`.ComponentName { .title { svg { } } }` → `svg` está en depth 2) es
  válido; un cuarto `{` (depth 3) NO lo es.
- Para más profundidad, **aplana encadenando selectores en el mismo nivel**.

```scss
// GOOD — depth 2: .ComponentName > .title > svg
.ComponentName {
  .title {
    svg { font-size: 34px; }
    span { font-weight: 500; }
  }
}

// BAD — depth 3: .title > &-success > svg
.ComponentName {
  .title {
    &-success {
      svg { color: $colorSuccess; }
    }
  }
}

// GOOD — el tercer nivel se aplana encadenando en el mismo nivel
.ComponentName {
  .title-success svg { color: $colorSuccess; }
}
```

### No :global Required

SCSS modules have class collision names disabled — no need for `:global` to target library classes (like Ant Design). Just write them directly:

```scss
.MyComponent {
  .ant-picker-calendar { ... }
}
```

### No Inline Styles (almost)

- Never use inline `style={{}}` for layout or design
- Acceptable inline style: dynamic values that come from JS (like `backgroundColor` from a variable/map)
- If you already have a className, all its styles go in the SCSS file

### Style Responsibility

- Each component is responsible for styling its OWN elements only
- Never style a child component's internal elements from a parent's SCSS
- You CAN control a child component's positioning/margin from the parent (e.g., margin, grid placement)

### Responsive

- Responsive design via the `onlyIn()` mixin (mob, desk, xs, sm, md, lg, xl, xxl)

## Zustand Store Conventions

- One store per domain in `src/store/`
- Always use `devtools` middleware with a descriptive name
- Define `State` interface, `initialState`, and the store interface extending State
- Always include a `reset` method
- Use the `update` pattern: `update: (data) => set((state) => ({ ...state, ...data }))`
- For stores that need persistence, use `persist` middleware wrapping the actions before `devtools`
- Derived/computed values can be functions on the store

## Form Conventions (Formik)

> Aplica cuando se integre el stack de formularios (Formik + Zod). Pendiente Fase 4.

### Custom Hook Pattern

Every form MUST be implemented through a custom hook that encapsulates all Formik logic. The component only renders — it never owns form state or submit logic.

```tsx
// useMyForm.ts
export function useMyForm() {
  const formik = useFormik({
    initialValues: { ... },
    validationSchema: toFormikValidationSchema(mySchema), // zod-formik-adapter
    onSubmit: async (values) => { ... },
  });

  return { formik };
}

// MyFormComponent.tsx
export function MyFormComponent(): ReactElement {
  const { formik } = useMyForm();
  // render using formik.values, formik.handleChange, etc.
}
```

### Rules

- The hook returns `{ formik }` (and any extra helpers if needed)
- All submit logic, validation, side effects (confirms, mutations, drawer closing) live in the hook
- The component is purely presentational — it destructures from the hook and renders
- Hook file lives in the same folder as the component: `ComponentName/useComponentNameForm.ts`

## useEffect Rules

- **Never use `useEffect` unless absolutely impossible to achieve otherwise**
- For derived state: compute it inline or use Zustand computed functions
- For subscriptions/event listeners: use dedicated hooks (`useEventListener`)
- If you think you need `useEffect`, first consider: Zustand, context, computed values, or restructuring the data flow
- Acceptable uses: third-party library integration that requires imperative setup, browser APIs with no React binding, or initial data fetching on mount

## Memoización

- **NO uses `useCallback` ni `useMemo`.** El React Compiler (activo en el build) los
  hace redundantes: escribe funciones y valores normales. Setup en el README del FE.

---

# BACKEND ONLY

Aplica exclusivamente a `apps/backend`.

## Stack

- **tRPC 11** — capa de datos principal, montada sobre Express en `/trpc`
- **superjson** como transformer (Date/Map/Set/BigInt end-to-end)
- **zod 4** para validación de inputs de procedures
- Express 5 — servidor HTTP + una REST API de ejemplo en `/api/v1` (coexiste)
- Realtime por **SSE** (subscriptions tRPC con async generators; **no WebSocket**)
- TypeScript strict
- **Dev:** `tsx` como runtime + Node `--watch` nativo para hot reload (no nodemon)
- **Producción:** transpilación a JS (`tsc` → `dist/`), se ejecuta Node puro
- `tsc-alias` para resolver path aliases (`@/*`) en el output compilado
- Vitest + supertest para tests
- `debug` package para logging con colores por namespace

## Project Structure

```
apps/backend/src/
├── index.ts                # Entrypoint: starts HTTP server
├── trpc/                   # tRPC (capa de datos principal)
│   ├── trpc.ts             # initTRPC: router, publicProcedure (superjson + errorFormatter)
│   ├── context.ts          # createContext per-request (auth/db/services later)
│   ├── app.router.ts       # Root router + export type AppRouter (consumed by FE)
│   └── routers/
│       ├── items.router.ts        # Example: query + mutation (zod input)
│       └── notifications.router.ts # Example: subscription over SSE (async generator)
├── app/
│   ├── express-app.ts      # Express setup: mounts /trpc and /api/v1
│   └── route-logger.ts     # Prints registered REST routes on boot
├── api/v1/
│   ├── index.ts            # REST route registry (single source of truth)
│   ├── health/             # Example REST endpoint
│   └── items/              # Example REST endpoint (mirror of the tRPC items router)
├── configs/
│   ├── constants.ts        # App-wide constants
│   ├── logger.ts           # debug-based logger (app:prod, app:warn, app:error, app:Debug)
│   ├── typed-envs.ts       # Final typed export of environment variables
│   └── envs/               # Environment system (see below)
│       ├── default.ts      # Base values (PORT, etc.)
│       ├── dev.ts          # Dev overrides
│       ├── prod.ts         # Prod overrides
│       ├── secrets.ts      # Local secrets (gitignored, never in prod)
│       └── index.ts        # EnvsLoader: merge + validation
├── middlewares/
│   └── general-and-small.ts  # Morgan, Helmet, CORS, JSON parser, 404, error handler
├── models/
│   └── responses.ts        # Global backend-only types
├── database/               # Reserved: DB config, ORM, queries (empty by default)
└── 3rd-party/              # Reserved: SDK integrations, external service wrappers
```

## REST API (example, coexists with tRPC)

> The REST layer under `/api/v1` is kept as an **example** of the REST paradigm and for
> non-tRPC consumers (healthchecks, webhooks). New data endpoints should generally be
> **tRPC procedures** (see above), not REST routes.

### Folder-per-endpoint

Each endpoint (or group of related sub-routes) lives in its own folder under
`api/v1/`. The folder represents an entity, feature, or logical grouping.

```
api/
├── index.ts           # Route registry — single source of truth
├── items/
│   └── controller.ts  # Simple endpoint: all in one file
└── orders/
    ├── controller.ts  # Entry point + light logic
    ├── logic.ts       # Heavy business logic, queries, transformations
    ├── constants.ts   # Scoped constants
    └── validations.ts # Input validation
```

### Route Registry

All endpoints are registered in the `routes` array of `api/index.ts`. No routes
are mounted outside this registry. The route-logger reads from this same array
to print all endpoints on boot.

```ts
const routes = [
  { path: "/items", router: itemsRouter, file: "src/api/items/controller.ts" },
];
```

### Controller Structure

- `controller.ts` is always the entry point of an endpoint folder.
- It defines the router, attaches HTTP verb handlers, and contains light logic.
- If logic grows heavy (complex transformations, multiple queries, orchestration),
  extract it to a `logic.ts` file so the controller stays readable and
  self-explanatory.
- Possible files in an endpoint folder: `controller.ts` (required), `logic.ts`,
  `validations.ts`, `constants.ts`, `helpers.ts`, sub-route folders.

### No API Versioning

This template does not use `/api/v1/` style versioning. Routes mount directly
under `/api/`. Versioning can be added per-project if needed.

## tRPC (primary data layer)

tRPC is the main API. It lives in `src/trpc/` and is mounted on Express at `/trpc`
via `createExpressMiddleware`. The REST API under `/api/v1` is kept only as an example
of the REST paradigm (see below).

- **One instance per backend** in `trpc.ts`: `initTRPC.context<Context>().create({...})`
  with `transformer: superjson` and an `errorFormatter` that surfaces `zodError` in
  `error.data`. Export `router` and `publicProcedure` from here — never call `initTRPC`
  again elsewhere.
- **Context** (`context.ts`) is typed as `Awaited<ReturnType<typeof createContext>>`.
  This is where per-request stuff (authed user, db client, services) gets injected. A
  `protectedProcedure` (auth middleware) would be added here when needed.
- **Adding a procedure:** create/edit a `*.router.ts` in `trpc/routers/` using
  `publicProcedure.input(zodSchema).query|mutation|subscription(...)`, then register it
  in `app.router.ts`. The `AppRouter` type updates automatically.
- **`AppRouter` type** (`app.router.ts`) is the contract: the frontend imports it
  **type-only** (alias `backend/*`) for end-to-end type safety. No codegen, no client
  generation. Keep `export type AppRouter = typeof appRouter` in sync.
- **Inputs** are validated with **zod**. Always `.input(z.object({...}))` — don't read
  raw args untyped.
- **superjson** is the transformer on both ends: return real `Date`/`Map`/`Set`/`BigInt`
  from procedures; they arrive typed on the FE. The client transformer must match.

### Realtime — subscriptions over SSE

Realtime uses **tRPC subscriptions served over SSE** (plain HTTP). **No WebSocket.**

- Subscriptions are **async generators**: `subscription(async function* (opts) { ... yield ... })`.
- Use Node's `on(emitter, event, { signal: opts.signal })` so the generator ends when
  the client disconnects.
- Wrap yields in `tracked(id, data)` so the browser can resume with `lastEventId` after
  a reconnect.
- The emitter is **in-memory** (single process). For multi-instance, put a Redis (or
  similar) pub/sub behind it.
- **SSE vs WebSocket:** SSE is the default (simple realtime, auto-reconnect, no extra
  infra). For low-latency/bidirectional needs, migrate to WebSocket — tRPC ships the
  infra (`wsLink` + `applyWSSHandler`) and **procedure/hook code stays identical** after
  wiring. For **raw** (non-tRPC) WebSockets, see the sibling Express template.

## Environment System

The env system uses a class-based merge pattern (no Zod, no `.env` files):

1. `default.ts` — base values shared across all environments (PORT, etc.)
2. `dev.ts` — development overrides (DB URLs, frontend URL, etc.)
3. `prod.ts` — production overrides (reads from `process.env` or `secrets`)
4. `secrets.ts` — local-only secrets for development (gitignored). In production,
   inject secrets via `process.env`.
5. `index.ts` — `EnvsLoader` merges default + runtime env, **validates that no
   value is undefined or empty string**, and throws on boot if something is missing.
6. `typed-envs.ts` — final export: `TYPED_ENVS` (cast to `NonUndefined<>` for
   full type safety without optional checks downstream).

Always import from `@/configs/typed-envs` — never read `process.env` directly
in application code.

## Logger

Uses the `debug` package with colored namespaces:

```ts
import { logger } from '@/configs/logger';

logger.prod('Visible in prod and dev');
logger.debug('Visible only in dev');
logger.warn('Warning');
logger.error('Error');
```

Activated via `DEBUG=app:*` (all) or selectively (`DEBUG=app:prod`). The colored
output per namespace improves DX in development. This is the permanent logging
solution.

## Middlewares

Global middlewares live in `middlewares/`. The base set for every project:
- `morgan` — HTTP request logging (dev only — pending config)
- `helmet` — security headers
- `cors` — CORS
- `express.json()` — body parser
- 404 handler + error handler

## Testing

- **Vitest + supertest** for endpoint integration tests.
- Tests are a tool for refactoring and verifying complex endpoints — not a rigid
  TDD requirement. Write tests where they add value, not as a blanket rule.
- Test files live inside `src/` co-located with what they test (pending migration
  from current `test/` location).
- Coverage available via `npm run back-coverage` (v8 provider).

## Database

The template ships **without ORM or DB** by design. Database choice varies heavily
by project (MongoDB, PostgreSQL, SQLite, Supabase, Firebase, etc.).

- `src/database/` is reserved for DB config, models, queries, and migrations.
- Each project fills this folder with its chosen stack.

## 3rd Party Integrations

- SDKs and external service wrappers live in `src/3rd-party/`.
- If a 3rd-party integration is foundational to the entire app (e.g., GraphQL
  engine, template engine, tRPC), it may deserve its own top-level folder in
  `src/` instead.

## Path Alias

- `@/*` → `src/*` is available in tsconfig for convenience.
- Use it only to shorten deeply nested imports. Relative imports are fine for
  nearby files.

## Build

- **Dev** runs TS directly via `tsx` — no build step needed.
- **Production** transpiles to `dist/` with full type validation:
  `tsc -p tsconfig.build.json && tsc-alias -p tsconfig.build.json`
- `tsc-alias` resolves path aliases (`@/*`, `shared/*`) to relative paths in
  the compiled output.
- `tsconfig.json` — dev/typecheck config (`noEmit: true`, includes shared).
- `tsconfig.build.json` — production build config (`outDir: "dist"`).

## Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Hot reload via native Node `--watch` + tsx |
| `npm run build` | Full transpilation to `dist/` (tsc + tsc-alias) |
| `npm run start` | Run compiled production build from `dist/` |
| `npm run prod` | Build + start in one command |
| `npm run typecheck` | Type-check only (`tsc --noEmit`, no output) |
| `npm run test` | Run tests with Vitest |
| `npm run coverage` | Tests + coverage report (v8) |
| `npm run clean` | Remove `dist/` |
