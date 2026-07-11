import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { BottomNav } from "@/app/components/bottom-nav";
import { Logo } from "@/app/components/ui";
import { NutritionClient } from "./nutrition-client";

export default async function NutritionPage() {
  const supabase = await createClient();
  const { data: claims } = await supabase.auth.getClaims();

  if (!claims?.claims) {
    redirect("/login");
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1, maxWidth: 480, margin: "0 auto", width: "100%", padding: "20px 18px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
          <Logo size={26} />
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 15 }}>
            Teenfit Tracker
          </span>
        </div>

        <NutritionClient />
      </div>

      <div style={{ maxWidth: 480, margin: "0 auto", width: "100%" }}>
        <BottomNav />
      </div>
    </div>
  );
}
