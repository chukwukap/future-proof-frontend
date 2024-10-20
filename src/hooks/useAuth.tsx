import { useCallback, useEffect } from "react";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { createUser } from "@/actions/userActions";
import { toast } from "sonner";

export function useAuth() {
  const { user, setShowAuthFlow } = useDynamicContext();

  const handleSignUp = useCallback(async () => {
    if (user) {
      try {
        await createUser(user.userId!, user.email);
        toast.success("Account created successfully");
      } catch (error) {
        console.error("Error during sign up:", error);
        toast.error("Failed to create account");
      }
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      handleSignUp();
    }
  }, [user, handleSignUp]);

  const signIn = () => {
    setShowAuthFlow(true);
  };

  const signOut = () => {
    // Dynamic handles sign out internally
  };

  return { user, signIn, signOut };
}
