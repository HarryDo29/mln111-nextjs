// ============================================================
// FILE NÀY ĐẶT Ở: src/app/api/chat/route.ts
// Tạo folder mới: src/app/api/chat/ rồi tạo file route.ts bên trong
//
// CHỨC NĂNG: Nhận tin nhắn từ giao diện chat Lovable,
//            chuyển tiếp sang n8n để AI xử lý,
//            rồi trả kết quả về cho frontend.
// ============================================================

import { NextRequest, NextResponse } from "next/server";

// Đọc URL webhook n8n từ biến môi trường Vercel
// (Cần add N8N_WEBHOOK_URL vào Vercel → Settings → Environment Variables)
const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL!;

// Kiểm tra ngay nếu thiếu biến môi trường sẽ báo lỗi rõ ràng trên log
if (!N8N_WEBHOOK_URL) {
    throw new Error("Missing N8N_WEBHOOK_URL in environment variables");
}

export async function POST(req: NextRequest) {
    // Lấy message và sessionId từ request của frontend
    const body = await req.json();
    const { message, sessionId } = body;

    // Nếu không có tin nhắn → trả lỗi 400
    if (!message) {
        return NextResponse.json({ error: "Missing message" }, { status: 400 });
    }

    try {
        // Gửi sang n8n webhook để AI xử lý
        const response = await fetch(N8N_WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message, sessionId }),
        });

        // Nhận kết quả từ n8n (có dạng { reply: "...", sessionId: "..." })
        const data = await response.json();

        // Trả kết quả về cho frontend
        return NextResponse.json(data);
    } catch {
        // Nếu n8n lỗi → báo lỗi cho frontend
        return NextResponse.json(
            { error: "n8n connection failed" },
            { status: 500 }
        );
    }
}
