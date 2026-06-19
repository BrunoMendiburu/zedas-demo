import type { Metadata } from "next";
import ZedasApp from "@/components/zedas-app";

export const metadata: Metadata = {
  title: "Global Map",
  description:
    "An illustrative pilot map classifying 16 countries by their water profile — renewable resources, water stress, withdrawal, and economic productivity.",
  alternates: { canonical: "/map" },
};

export default function MapPage() {
  return <ZedasApp />;
}
