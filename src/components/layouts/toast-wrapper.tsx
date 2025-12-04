import { Toaster } from "react-hot-toast";

const ToastWrapper = () => {
  const style = {
    background: "var(--card)",
    color: "var(--card-foreground)",
  };
  return <Toaster toastOptions={{ style, duration: 1000 }} />;
};

export default ToastWrapper;
