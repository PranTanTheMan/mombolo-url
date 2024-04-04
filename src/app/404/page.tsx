"use client";
import React from "react";
import { Button } from "@/components/ui/button";
export default function page() {
  return (
    <div className="w-full gap-y-6 flex-col min-h-screen flex justify-center items-center">
      <h1 className="font-regular text-2xl ">
        Oopsie Daisie, There was an error!
      </h1>
      <Button onClick={() => (window.location.href = "/")}>Go Home</Button>
    </div>
  );
}
