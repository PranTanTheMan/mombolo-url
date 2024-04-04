import { redirect } from "next/navigation";
import getSupabaseBrowserClient from "@/lib/supabase/client";

interface Params {
  params: {
    id: string;
  };
}

async function RedirectPage({ params: { id } }: Params) {
  const supabase = getSupabaseBrowserClient();
  const { data, error } = await supabase
    .from("urls")
    .select("original_url")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching original URL:", error);
    redirect("/404");
  } else if (data) {
    redirect(data.original_url);
  } else {
    console.error("No data returned from Supabase");
    redirect("/404");
  }
}

export default RedirectPage;
