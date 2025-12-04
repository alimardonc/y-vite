import { Outlet } from "react-router";
import Header from "./components/layouts/header";
import Container from "./components/ui/container";

const AppLayout = () => {
  return (
    <Container>
      <Header />
      <Outlet />
    </Container>
  );
};

export default AppLayout;
