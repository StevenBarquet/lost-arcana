# 🎨 Frontend — Vite + React 19

> SPA sobre **Vite 8 + React 19 + TypeScript**, con Ant Design, Zustand,
> cliente **tRPC + TanStack React Query**, SCSS Modules y react-router. Estructura y
> convenciones listas, con generadores plop para no escribir boilerplate.

<p align="left">
  <img alt="Vite" src="https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white">
  <img alt="React" src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white">
  <img alt="Ant Design" src="https://img.shields.io/badge/Ant%20Design-6-0170FE?logo=antdesign&logoColor=white">
  <img alt="tRPC" src="https://img.shields.io/badge/tRPC-11-2596BE?logo=trpc&logoColor=white">
  <img alt="Zustand" src="https://img.shields.io/badge/Zustand-5-000000">
</p>

> Parte del [monorepo](../../README.md). Se corre desde la raíz con `npm run front`,
> o desde esta carpeta con `npm run dev`.

---

## 📑 Tabla de contenidos

1. [Qué incluye](#-qué-incluye)
2. [Estructura](#-estructura)
3. [Uso rápido](#-uso-rápido)
4. [tRPC (cliente)](#-trpc-cliente)
5. [React Compiler](#-react-compiler)
6. [Convenciones](#-convenciones)
7. [Generadores (plop)](#-generadores-plop)
8. [Paths absolutos y estilos](#-paths-absolutos-y-estilos)
9. [Scripts](#-scripts)
10. [Pendientes conocidos](#-pendientes-conocidos)

---

## 🎯 Qué incluye

| Pieza             | Detalle                                                             |
| ----------------- | ------------------------------------------------------------------- |
| ⚡ Build           | **Vite 8** + `@vitejs/plugin-react` + PostCSS (autoprefixer, cssnano, preset-env) |
| 🧠 Optimización   | **React Compiler 1.0** — auto-memoización en build (adiós `useCallback`/`useMemo`) |
| 🎨 UI             | **Ant Design 6** (ConfigProvider en modo dark vía `AntdProv`)       |
| 🌓 Tema light     | `AntdProv/AntdProvLight.tsx` — variante ligera lista por si se necesita montar una sección con Ant Design en modo light (no se usa por defecto) |
| 🔗 Datos          | **tRPC 11 + TanStack React Query 5** type-safe (cliente en `providers/TrpcProv`) |
| 🗃️ Estado         | **Zustand 5** (con `devtools` + `persist`)                          |
| 🧭 Ruteo          | **react-router** con rutas centralizadas en `Router/AppRoutes.tsx`  |
| 💅 Estilos        | **SCSS moderno** (`@use`/`color.mix`/`map.get`) + SCSS Modules      |
| 🧩 Design system  | Componentes comunes genéricos (modales, listas, tooltips, etc.)     |

---

## 🗂️ Estructura

```
src/
  main.tsx                # 🚪 Entrypoint: monta <App /> + estilos globales
  App.tsx                 # Compone GlobalProviders + Router
  appConfig/              # Config de la app (helmet, metadata, etc.)
  providers/
    GlobalProviders.tsx   # Agrupa router + tRPC/react-query + theming
    TrpcProv/             # Cliente tRPC + QueryClient (trpc.ts + TrpcProv.tsx)
    AntdProv/             # ConfigProvider de Ant Design (tema dark)
    ScrollToTop/          # Scroll al top en cada navegación
  Router/
    Router.tsx            # Router raíz
    AppRoutes.tsx         # 🧭 Registro de rutas (lo actualiza el generador `page`)
  pages/                  # Páginas (planas, sin agrupar por defecto)
    Home/  Page404/
  common/                 # 🧩 Design system: componentes reutilizables
  layout/                 # Piezas de layout (loaders, pantallas de carga)
  store/                  # Stores de Zustand (appInfo, preferences)
  styles/                 # SCSS global: variables, mixins, tema, utils
  utils/
    constants/            # Constantes (incluye frontend-envs)
    functions/            # Helpers (responsive, alerts, store, etc.)
    hooks/                # Hooks genéricos (useBoolean, useCopyToClipboard, ...)
  assets/                 # Estáticos
```

---

## ⚡ Uso rápido

```bash
# Desde la raíz del monorepo
npm run front        # dev server de Vite

# O desde apps/frontend
npm run dev
```

> Requiere el backend corriendo (`npm run back`). La URL se toma de
> `VITE_BACKEND_URL` (ver `.env.development`), a la que se le añade `/trpc`.

---

## 🔗 tRPC (cliente)

El FE consume el backend con **tRPC 11 + la integración nueva de TanStack React Query**
(`@trpc/tanstack-react-query`), no el `createTRPCReact` clásico. Todo vive en
`providers/TrpcProv/`:

- **`trpc.ts`** — crea el contexto tipado importando el tipo `AppRouter` del backend
  como **type-only** (alias `backend/*`; se borra en el build, no pesa en el bundle):
  ```ts
  import type { AppRouter } from 'backend/src/trpc/app.router';
  export const { TRPCProvider, useTRPC } = createTRPCContext<AppRouter>();
  ```
- **`TrpcProv.tsx`** — monta `QueryClient` + cliente tRPC con `splitLink`: las
  **subscriptions** van por `httpSubscriptionLink` (SSE) y el resto por `httpBatchLink`.
  `superjson` como transformer (debe coincidir con el backend).
- **`trpc-vanilla-client.ts`** — cliente tRPC **sin** React Query, para consumir como
  promesas (`await vanillaTRPC.items.list.query()`), estilo axios. Útil fuera de React
  (utils, servicios, stores) o cuando prefieres manejar carga/errores a mano.

### Uso en componentes

```ts
const trpc = useTRPC();

// Query
const items = useQuery(trpc.items.list.queryOptions());

// Mutation
const create = useMutation(trpc.items.create.mutationOptions());
create.mutate({ name: 'nuevo' });

// Subscription (SSE) — realtime
useSubscription(
  trpc.notifications.onNotification.subscriptionOptions(undefined, {
    onData: ({ data }) => console.log(data.message),
  }),
);
```

Gracias a `superjson`, los `Date` llegan como `Date` (`item.createdAt.toLocaleDateString()`
funciona sin parsear).

### Dos ejemplos end-to-end (mismo CRUD, distinto mecanismo)

En `pages/Home/HomeCont/` hay dos secciones que consumen los **mismos routers** y
**reutilizan** la misma UI (`ItemsList`, `CreateItemForm`), para comparar patrones:

- **`HelloWorld/`** — patrón con **hooks + React Query** (cache, refetch y estados
  automáticos), más la subscription SSE.
- **`VanillaExample/`** — patrón con el **cliente vanilla** (promesas): fetch inicial en
  `useEffect`, y refetch manual cuando la mutación de crear resuelve sin error.

### Cliente vanilla (promesas)

```ts
import { vanillaTRPC } from 'src/providers/TrpcProv/trpc-vanilla-client';

const items = await vanillaTRPC.items.list.query();
const nuevo = await vanillaTRPC.items.create.mutate({ name: 'nuevo' });
```

> **Realtime**: se usa **SSE** (HTTP, reconexión automática) por simplicidad. Si algún
> día necesitas baja latencia / bidireccional, se migra a **WebSocket** por el lado del
> cliente cambiando el link a `wsLink` (el uso en componentes no cambia). Ver el README
> del backend para el detalle.

---

## 🧠 React Compiler

El **React Compiler 1.0** corre en cada build y memoiza componentes y hooks
automáticamente, estabilizando funciones y objetos. **Consecuencia práctica: no
escribas `useCallback` ni `useMemo`** — son redundantes (regla en `claude.md`).

Para optimizar, el compiler exige que el código siga las **Rules of React** (pureza,
no mutar props/state). Eso lo vigila `eslint-plugin-react-hooks` v7 (reglas
`react-hooks/*`, ya activas en `eslint.config.mjs` de la raíz): son errores de build,
no sugerencias.

### Setup (no tocar salvo upgrade)

`@vitejs/plugin-react` v6 transpila con **oxc** (Vite 8 / Rolldown), NO con Babel. El
compiler hoy solo existe como plugin de Babel, así que corre en una pasada aparte:

```ts
// vite.config.mts
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';

plugins: [
  react(), // oxc: transpila TSX→JS (rápido)
  babel({ presets: [reactCompilerPreset()] }), // solo la pasada del compiler
];
```

Peer deps que esto requiere (dev): `@rolldown/plugin-babel`, `@babel/core`,
`babel-plugin-react-compiler`, `@types/babel__core`.

> **Verificar que compila**: tras `npm run build`, el bundle debe contener llamadas a
> `_c(` (el cache de memoización que inyecta el compiler). Si no aparecen, no está
> corriendo.

---

## 📐 Convenciones

- **Componentes** en su propia carpeta (`Componente/Componente.tsx` + estilos).
  El design system genérico vive en `src/common/`.
- **Páginas** planas en `src/pages/` (ver [agrupación](#agrupación-de-páginas)).
- **Stores** de Zustand en `src/store/`, uno por dominio.
- **Providers globales** se agregan dentro de `providers/GlobalProviders.tsx`.
- **Rutas** centralizadas en `Router/AppRoutes.tsx` (el generador `page` las registra solo).

> Usa los **generadores** siempre que puedas: mantienen la estructura y el estilo
> consistentes sin copiar-pegar.

---

## ⚙️ Generadores (plop)

Se corren **desde la raíz** del monorepo:

| Comando                  | Qué genera                                                        |
| ------------------------ | ----------------------------------------------------------------- |
| `npm run generate-comp`  | Un **componente** (con o sin estilos/props) en la ruta indicada.  |
| `npm run generate-page`  | Una **página** + container + estilos, y registra la ruta en `AppRoutes.tsx`. |
| `npm run generate-store` | Un **store** de Zustand (con o sin `persist`).                    |
| `npm run generate-form`  | Un **hook de formulario** (⚠️ pendiente, ver notas).              |

> **Rutas en `component` y `hook`:** cuando el generador pida el *path*, pega la
> **ruta ABSOLUTA** del folder destino (clic derecho sobre la carpeta → *Copy Path*).
> Una ruta relativa se resuelve respecto al plopfile y el archivo cae mal. `page`
> no necesita esto (escribe siempre en `src/pages/`).

### Agrupación de páginas

Por defecto el template **NO agrupa** las páginas: viven planas en `src/pages/`.
La agrupación por sección (`Landing/`, `Admin/`, `User/`, `Auth/`) solo tiene sentido
cuando la app crece mucho. En `generators/frontend/plopfile-page.js` se deja comentada
la variante con agrupación por si se necesita más adelante.

---

## 🧭 Paths absolutos y estilos

- **Paths absolutos:** importa con `src/*` en vez de `../../../` (mapeado en
  `tsconfig.json` y resuelto nativamente por Vite):
  ```ts
  import { useBoolean } from 'src/utils/hooks/useBoolean'
  ```
- **SCSS moderno:** los mixins/variables se consumen con `@use '...' as *`, así que
  la invocación no cambia (`onlyIn(lg)`, etc.). Estilos globales en `src/styles/`.

---

## 📜 Scripts

| Script            | Qué hace                                         |
| ----------------- | ------------------------------------------------ |
| `npm run dev`     | Dev server de Vite.                              |
| `npm run build`   | Type check (`tsc`) + build de producción (Vite). |
| `npm run preview` | `build` + sirve el build localmente.             |
| `npm run prod`    | Alias de `preview`.                              |

> Desde la raíz del monorepo: `front`, `front-build`, `front-prod`.

---

## ⚠️ Pendientes conocidos

- [ ] **Hooks tRPC generados.** Los generadores plop de hooks aún no crean hooks tRPC;
      por ahora se usa `useTRPC()` directo en el componente (ver sección tRPC).
- [ ] **Generador de formularios (`generate-form`).** Sigue adaptado al stack anterior
      (`zod-formik-adapter`) y las deps de forms (`formik`, `zod`, `zod-formik-adapter`)
      **no** están instaladas. Se adaptará al agregar el stack de formularios.
- [ ] **`sweetalert2`.** Decisión abierta: se queda o migra a `message`/`Modal` de AntD.
