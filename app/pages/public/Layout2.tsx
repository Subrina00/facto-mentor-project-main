import { Outlet } from "react-router";
import Header from "~/components/layout/header";

export default function BaseLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
