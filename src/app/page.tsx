import type { Metadata } from "next";
import { HomePage } from "./home-client";

export const metadata: Metadata = {
  title: "triết.ai — Sanctuary triết học cho Gen Z Việt Nam",
  description:
    "Không gian học triết Mác – Lênin lấy cảm hứng từ Hy Lạp cổ: AI giảng giải, mindmap cẩm thạch, sổ tay cá nhân hoá cho sinh viên Việt.",
  openGraph: {
    title: "triết.ai — Sanctuary triết học",
    description: "Một thánh đường dịu dàng cho triết học Mác – Lênin.",
  },
};

export default function Page() {
  return <HomePage />;
}
