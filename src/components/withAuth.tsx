"use client";

import { FutureProofUser } from "@/types";
import { useRouter } from "next/navigation";
import { ComponentType, useEffect, useState } from "react";

interface WithAuthProps {
  user?: FutureProofUser;
}

function withAuth<P extends WithAuthProps>(WrappedComponent: ComponentType<P>) {
  const ProtectedRoute = (props: Omit<P, keyof WithAuthProps>) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      const checkAuth = async () => {
        try {
          const token = localStorage.getItem("token");
          if (!token) {
            router.replace("/login");
            return;
          }
          setIsAuthenticated(true);
        } catch (error) {
          console.log(error);
          router.replace("/login");
        } finally {
          setIsLoading(false);
        }
      };

      checkAuth();
    }, [router]);

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
      return null;
    }

    return <WrappedComponent {...(props as P)} />;
  };

  return ProtectedRoute;
}

export default withAuth;
