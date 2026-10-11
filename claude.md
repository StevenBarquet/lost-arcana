# Language

- SIEMPRE responde en español. Nunca uses inglés en tus respuestas al usuario.

# Project Rules
La app es full mobile, y debe ser diseñada con ese viewport solamente

## Git Policy

- NEVER commit, push, or interact with git in any way
- The user is solely responsible for all git operations
- Do not run git add, git commit, git push, git stash, or any other git command


- **Package manager: npm** (npm workspaces). No usar yarn/pnpm.
- **Runtime: Node 26** (`engines` en cada `package.json`).
- **PROHIBIDO instalar dependencias sin el flag `-E` (`--save-exact`).** Siempre
  versiones exactas, nunca rangos con caret (`^`) ni tilde (`~`). Ejemplo correcto:
  `npm install -E <pkg>` / `npm install -D -E <pkg>`. Si un `package.json` termina
  con `^` o `~` en alguna versión, es un error: pínnealo a la versión exacta.
  ⚠️ Poner la versión en el nombre (`npm i pkg@1.2.3`) **NO basta**: npm igual
  escribe `^1.2.3` en el `package.json`. El flag `-E` es obligatorio SIEMPRE,
  incluso con versión explícita. Antes de correr cualquier `npm install`,
  verifica que `-E` esté presente en el comando.


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
  - **Frontend:** `npm run build` (que hace `tsc && vite build`) — o al menos
    `tsc --noEmit` + levantar el dev server.

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


## Stack

- Vite + React 19 (full client-side SPA, no SSR)
- Ant Design (ConfigProvider for dark theming)
- **tRPC 11 + TanStack React Query 5** — type-safe data layer (client in `providers/TrpcProv`)
- Zustand (with devtools + persist middleware) for client state
- SCSS Modules for styling
- react-router-dom for routing
- react-forge-grid (Frow, Fcol) for layouts
- TypeScript strict

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

## Referente de buena estética
Siempre que te pida que hagas algo estético, puedes revisar el folder src/pages/Home/HomeCont/QuizSelector y los archivos, '/src/styles/variables', '/src/styles/animations', '/src/styles/utils'

## Uso de contexto y revisión de archivos
Salvo que el usuario lo indique, evita revisar todos los archivos que consideras necesarios. Pregunta explícitamente donde buscar tal funcionalidad o autorización para encontrar referencias en el código para evitar consumo exagerado de contexto y tokens en la sesión. También optimiza las tareas, y procesamiento para consumir la menor cantidad de tokens posibles pero maximizando la resolución de problemas o solicitudes del usuario