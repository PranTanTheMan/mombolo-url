"use client";

import { useEffect, useState } from "react";
import getSupabaseBrowserClient from "../lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { CopyIcon, TrashIcon, CheckIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { Button } from "./ui/button";

interface UrlData {
  id: string;
  original_url: string;
  created_at: string;
}

const UrlList = () => {
  const [urls, setUrls] = useState<UrlData[]>([]);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchUrls = async () => {
      const supabase = getSupabaseBrowserClient();

      const { data, error } = await supabase
        .from("urls")
        .select("id, original_url, created_at");

      if (error) {
        console.error("Error fetching URLs:", error);
      } else {
        setUrls(data as UrlData[]);
      }
    };

    fetchUrls();
  }, []);

  const handleDelete = async (id: string) => {
    const supabase = getSupabaseBrowserClient();

    const { error } = await supabase.from("urls").delete().eq("id", id);

    if (error) {
      console.error("Error deleting URL:", error);
    } else {
      setUrls(urls.filter((url) => url.id !== id));
    }
  };

  const handleCopy = (shortUrl: string) => {
    navigator.clipboard.writeText(shortUrl);
    setCopiedUrl(shortUrl);
    setTimeout(() => {
      setCopiedUrl(null);
    }, 3000);
  };

  return (
    <div className="flex justify-center mt-16 mx-[20rem]">
      <Card className="w-full ">
        <CardHeader>
          <CardTitle>Shortened URLs</CardTitle>
        </CardHeader>
        <CardContent>
          {urls.map((url) => (
            <div key={url.id} className="mb-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  {format(new Date(url.created_at), "MMM d, yyyy HH:mm")}
                </span>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    onClick={() =>
                      handleCopy(`https://url.prani.tech/${url.id}`)
                    }
                    aria-label="Copy"
                    size={"icon"}
                  >
                    {copiedUrl === `https://url.prani.tech/${url.id}` ? (
                      <CheckIcon className="text-green-500" />
                    ) : (
                      <CopyIcon />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => handleDelete(url.id)}
                    aria-label="Delete"
                    size={"icon"}
                  >
                    <TrashIcon className="w-5 h-5 text-red-600" />
                  </Button>
                </div>
              </div>
              <div className="mt-2">
                <a
                  href={`https://url.prani.tech/${url.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-bold hover:underline"
                >
                  https://url.prani.tech/{url.id}
                </a>
              </div>
              <div className="mt-1">
                <p className="text-sm">{url.original_url}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default UrlList;
