import { index, route } from "@react-router/dev/routes";

export const publicRoutes = [
  index("pages/public/Home.tsx"),
  route("about", "pages/public/About.tsx"),
];
