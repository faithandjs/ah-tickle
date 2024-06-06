import { DailyArticles } from "@/components";
import { createClient } from "@/utils/supabase/server";
import { useEffect } from "react";

export default async function Index() {
  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient(); //
  // useEffect(() => {
  //   console.log(isSupabaseConnected, "here");
  // });
  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <DailyArticles />
    </div>
  );
}
