import React from "react";
import { ThemeProvider } from "./themeProvider";
import DynamicProvider from "./dynamic";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <DynamicProvider>{children}</DynamicProvider>
    </ThemeProvider>
  );
}

export default Providers;
