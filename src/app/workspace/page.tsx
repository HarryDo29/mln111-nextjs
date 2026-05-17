import type { Metadata } from "next";
import { WorkspaceClient } from "./workspace-client";

export const metadata: Metadata = {
  title: "Phòng học của tôi — triết.ai",
  description:
    "Dòng thời gian học triết Mác – Lênin: mọi câu hỏi và câu trả lời cùng cuộn trong một không gian thống nhất.",
};

export default function WorkspacePage() {
  return <WorkspaceClient />;
}
