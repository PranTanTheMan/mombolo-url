"use client";
import { useState } from "react";
import getSupabaseBrowserClient from "../lib/supabase/client";
import { CopyIcon, CheckIcon } from "@radix-ui/react-icons";
import { nanoid } from "nanoid";

import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface UrlData {
  id: string;
  original_url: string;
  created_at: string;
}

const UrlShortnerForm = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const supabase = getSupabaseBrowserClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const shortId = nanoid(8);

    const { data, error } = await supabase
      .from("urls")
      .insert({ id: shortId, original_url: url })
      .select("id")
      .single();

    if (error) {
      console.error("Error shortening URL:", error);
    } else if (data) {
      const urlData = data as UrlData;
      console.log(urlData);
      setShortUrl(`https://url.prani.tech/${urlData.id}`);
    } else {
      console.error("No data returned from Supabase");
    }

    setUrl("");
    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      window.location.reload();
    }, 2000);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex justify-center items-center mx-auto gap-x-4 mt-4 max-w-xl"
      >
        <Input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL"
          required
          className="py-6 text-md"
        />
        <Button className="py-6 text-md" type="submit" disabled={loading}>
          {loading ? "Shortening..." : "Shorten URL"}
        </Button>
      </form>
      {shortUrl && (
        <div className="flex justify-center items-center mt-5">
          <p className="font-normal text-lg text-black">Shortened URL: </p>
          <Button
            onClick={() => (window.location.href = shortUrl)}
            className="mr-3 text-lg"
            variant="link"
          >
            {shortUrl}
          </Button>
          <Button variant="outline" size="icon" onClick={handleCopy}>
            {copied ? <CheckIcon /> : <CopyIcon />}
          </Button>
        </div>
      )}
    </>
  );
};

export default UrlShortnerForm;
