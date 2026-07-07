import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Console",
  robots: { index: false, follow: false },
};

// The public site uses the light "paper" theme; the admin console keeps a
// dark scoped theme (see .theme-dark in globals.css) since its modules were
// designed against dark tokens.
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="theme-dark">{children}</div>;
}
