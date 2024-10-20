"use client";
import { useEffect } from "react";
import WalletWrapper from "./WalletWrapper";
import { useConnect, useAccount } from "wagmi";
import { redirect } from "next/navigation";
import { useName } from "@coinbase/onchainkit/identity";

export default function LoginButton() {
  const { status } = useConnect();
  const { address } = useAccount();
  const { name } = useName({
    address: address!,
  });

  useEffect(() => {
    if (status === "success") {
      console.log("success");
      const baseName = name?.split(".")[0];
      console.log(baseName);
      redirect(`/${baseName}`);
    }
  }, [status, name]);

  return (
    <WalletWrapper
      className="min-w-[90px]"
      text="Get started"
      withWalletAggregator={true}
    />
  );
}
