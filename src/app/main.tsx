import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/shared/styles/index.scss";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";
import { mainTheme } from "@/shared/config/theme.ts";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider theme={mainTheme}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </BrowserRouter>
    </ConfigProvider>
  </StrictMode>
);
