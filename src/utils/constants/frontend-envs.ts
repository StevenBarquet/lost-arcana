const { MODE, PROD, VITE_FRONTEND_URL } = import.meta.env

export const FRONTEND_ENVS = {
  FRONTEND_URL: VITE_FRONTEND_URL,
  MODE: MODE,
  PROD: PROD,
}
