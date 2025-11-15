import { route } from "@react-router/dev/routes";

export const authRoutes = [
  route("login", "pages/auth/Login.tsx"),
  route("register", "pages/auth/Register.tsx")
];