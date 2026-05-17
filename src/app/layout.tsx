import type { Metadata } from "next";
import "../styles.css";

export const metadata: Metadata = {
  title: "triết.ai — Sanctuary triết học cho Gen Z Việt Nam",
  description:
    "AI-powered companion for Vietnamese students to master Marxism-Leninism philosophy with personalized, visual learning.",
  authors: [{ name: "triết.ai" }],
  openGraph: {
    title: "triết.ai — Sanctuary triết học",
    description:
      "Một thánh đường dịu dàng cho triết học Mác – Lênin.",
    type: "website",
    images: [
      "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/84dd7087-afac-41ad-9a90-25c92f8aedf3/id-preview-1dce32e9--0b3fc1a5-c898-4aa6-975a-85b46eb28594.lovable.app-1778830355774.png",
    ],
  },
  twitter: {
    card: "summary",
    title: "triết.ai — Sanctuary triết học",
    description:
      "AI-powered companion for Vietnamese students to master Marxism-Leninism philosophy with personalized, visual learning.",
    images: [
      "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/84dd7087-afac-41ad-9a90-25c92f8aedf3/id-preview-1dce32e9--0b3fc1a5-c898-4aa6-975a-85b46eb28594.lovable.app-1778830355774.png",
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
