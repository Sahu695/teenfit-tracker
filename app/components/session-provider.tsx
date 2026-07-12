"use client";

import { useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

export function SessionProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const supabase = createClient();
    
    // Restore session from localStorage on app start
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        localStorage.setItem("sb-session", JSON.stringify(session));
      } else {
        localStorage.removeItem("sb-session");
      }
    });
  }, []);

  return <>{children}</>;
}