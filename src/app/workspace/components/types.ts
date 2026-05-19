export type Message = { id: string; role: "user" | "ai"; content: string };
export type Thread = { id: string; title: string; messages: Message[] };

export const SEED: Thread[] = [
  {
    id: "t1",
    title: "Phép biện chứng duy vật là gì?",
    messages: [
      {
        id: "t1-q",
        role: "user",
        content: "Hãy giải thích nhẹ nhàng cho mình về phép biện chứng duy vật.",
      },
      {
        id: "t1-a",
        role: "ai",
        content:
          "Hãy tưởng tượng thế giới như một dòng sông luôn chảy ✨ — phép biện chứng duy vật là cách nhìn mọi sự vật trong sự vận động, biến đổi và liên hệ với nhau. Ba quy luật cốt lõi: lượng-chất, mâu thuẫn, phủ định của phủ định.",
      },
    ],
  },
  {
    id: "t2",
    title: "Mâu thuẫn & sự phát triển",
    messages: [
      {
        id: "t2-q",
        role: "user",
        content: "Mâu thuẫn nội tại có vai trò gì trong sự phát triển?",
      },
      {
        id: "t2-a",
        role: "ai",
        content:
          "Mâu thuẫn là nguồn gốc, động lực của mọi sự phát triển. Khi hai mặt đối lập đấu tranh và thống nhất, sự vật chuyển hoá sang trạng thái mới — như hạt mầm tự phá vỏ để nảy lên ☘️",
      },
    ],
  },
  {
    id: "t3",
    title: "Vật chất quyết định ý thức?",
    messages: [
      {
        id: "t3-q",
        role: "user",
        content: "Mình hơi mơ hồ về việc vật chất quyết định ý thức.",
      },
      {
        id: "t3-a",
        role: "ai",
        content:
          "Vật chất là cái có trước, ý thức là cái có sau và phản ánh vật chất. Nhưng ý thức cũng tác động trở lại vật chất thông qua hoạt động thực tiễn của con người 🌿",
      },
    ],
  },
  {
    id: "t4",
    title: "Lượng đổi → chất đổi",
    messages: [
      {
        id: "t4-q",
        role: "user",
        content: "Quy luật lượng – chất hoạt động thế nào trong đời sống?",
      },
      {
        id: "t4-a",
        role: "ai",
        content:
          "Mỗi ngày bạn đọc thêm một trang sách — đó là tích luỹ về lượng. Đến một ngưỡng nhất định (điểm nút), tư duy của bạn bước sang một chất mới: bạn nhìn thế giới khác đi ✨",
      },
    ],
  },
];
