import React from "react";
import DynamicProvider from "./dynamic";

function Providers({ children }: { children: React.ReactNode }) {
  return <DynamicProvider>{children}</DynamicProvider>;
}

export default Providers;
