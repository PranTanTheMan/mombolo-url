import { useEffect } from "react";
import { useRouter } from "next/router";
import getSupabaseBrowserClient from "../lib/supabase/client";

const RedirectPage = () => {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const redirectToOriginalUrl = async () => {
      const supabase = getSupabaseBrowserClient();

      const { data, error } = await supabase
        .from("urls")
        .select("original_url")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching original URL:", error);
        router.push("/404");
      } else {
        router.push(data.original_url);
      }
    };

    if (id) {
      redirectToOriginalUrl();
    }
  }, [id]);

  return null;
};

export default RedirectPage;
