import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Service Design & Strategy, Experience Delivery, UI/UX Architecture, and Agile Implementation by Dulaidila Studio.",
  openGraph: {
    url: "https://dulaidila.com/services",
    title: "Services | dulaidila",
    description:
      "Service Design & Strategy, Experience Delivery, UI/UX Architecture, and Agile Implementation.",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
