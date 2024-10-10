import React from "react";
import OnchainProviders from "./onchainProviders";

function Providers({ children }: { children: React.ReactNode }) {
  return <OnchainProviders>{children}</OnchainProviders>;
}

export default Providers;
