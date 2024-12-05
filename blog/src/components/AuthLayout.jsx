import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function AuthLayout({ children, authentication = true }) {
  const [loader, setLoader] = useState(true); // Initial loader state
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth?.status); // Safely access Redux state
  console.log("Auth Status:", authStatus);
  console.log("Authentication Required:", authentication);

  useEffect(() => {
    // Check if authStatus is ready and determine navigation
    if (authStatus !== undefined) {
      if (authentication && authStatus !== authentication) {
        console.log("Redirecting to login...");
        navigate("/login");
      } else if (!authentication && authStatus !== authentication) {
        console.log("Redirecting to home...");
        navigate("/");
      } else {
        console.log(`No navigation needed, rendering child`);
      }
    }
    setLoader(false); // Ensure loader is turned off
  }, [authStatus, navigate, authentication]);

  return loader ? <h1>Loading...</h1> : <>{children}</>;
 
}  


