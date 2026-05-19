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
// console.log("N8N_WEBHOOK_URL", N8N_WEBHOOK_URL);

// Kiểm tra ngay nếu thiếu biến môi trường sẽ báo lỗi rõ ràng trên log
if (!N8N_WEBHOOK_URL) {
    throw new Error("Missing N8N_WEBHOOK_URL in environment variables");
}

export async function POST(req: NextRequest) {
    // 1. Lấy message và sessionId từ request của frontend (có xử lý lỗi JSON rỗng)
    let body;
    try {
        const textBody = await req.text();
        if (!textBody) {
            return NextResponse.json({ error: "Empty request body" }, { status: 400 });
        }
        body = JSON.parse(textBody);
    } catch (err) {
        console.error("Error parsing request body:", err);
        return NextResponse.json({ error: "Invalid JSON in request" }, { status: 400 });
    }
    
    const { message, sessionId } = body;

    // console.log("Received message:", message);
    // console.log("Session ID:", sessionId);

    // Nếu không có tin nhắn → trả lỗi 400
    if (!message) {
        return NextResponse.json({ error: "Missing message" }, { status: 400 });
    }

    try {
        // Gửi sang n8n webhook để AI xử lý
        const response = await fetch(N8N_WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                message,
                sessionId
            })
        });

        // Đọc response body dạng text trước, sau đó parse JSON
        const text = await response.text();
        
        // Nếu body rỗng → n8n chưa trả về gì, báo lỗi
        if (!text) {
            return NextResponse.json(
                { reply: "Athena đang bận, thử lại sau nhé 🙏" },
                { status: 200 }
            );
        }

        // Parse JSON từ text
        const data = JSON.parse(text);
        return NextResponse.json(data);
    } catch (error) {
        console.log(error);

        // Nếu n8n lỗi → báo lỗi cho frontend
        return NextResponse.json(
            { error: "n8n connection failed" },
            { status: 500 }
        );
    }
}
