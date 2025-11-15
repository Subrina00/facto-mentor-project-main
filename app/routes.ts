import { type RouteConfig, layout } from "@react-router/dev/routes";
import { authRoutes } from "./routes/auth.routes";
import { publicRoutes } from "./routes/public.routes";
import { privateRoutes } from "./routes/private.routes";

export default [
  layout("pages/public/Layout.tsx", publicRoutes),
  layout("pages/auth/Layout.tsx", authRoutes),
  layout("pages/private/Layout.tsx", privateRoutes),
] satisfies RouteConfig;
