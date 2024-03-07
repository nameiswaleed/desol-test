// pages/middleware.js

import { useRouter } from "next/router";
import { useEffect } from "react";

const Middleware = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const authToken = localStorage.getItem("x-auth-token");
    if (!authToken) {
      router.push("/"); // Redirect to logout page if token is not present
    }
    if (authToken && router.pathname === "/") {
      router.push("/dashboard");
    }
  }, [router]);

  return <>{children}</>;
};

export default Middleware;
