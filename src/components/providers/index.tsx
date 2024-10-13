import React from "react";
import OnchainProviders from "./onchainProviders";
import { ThemeProvider } from "./themeProvider";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <OnchainProviders>{children}</OnchainProviders>
    </ThemeProvider>
  );
}

export default Providers;
