import { Outlet } from "react-router";
import Header from "./components/layouts/header";
import Container from "./components/ui/container";
import VideoPlayer from "./components/video-player/video-player";

const AppLayout = () => {
  return (
    <Container>
      <Header />
      <VideoPlayer src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" />
      <Outlet />
    </Container>
  );
};

export default AppLayout;
