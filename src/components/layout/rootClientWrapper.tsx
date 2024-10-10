import React from "react";

function RootClientWrapper({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

export default RootClientWrapper;
