import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Dulaidila Studio — an independent Service Design & Delivery studio founded by Tony Jin. We bridge human-centric strategies and flawless digital execution.",
  openGraph: {
    url: "https://dulaidila.com/about",
    title: "About | dulaidila",
    description:
      "Dulaidila Studio — an independent Service Design & Delivery studio founded by Tony Jin.",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
