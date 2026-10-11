# 🛒 বাজার দর (BazarDor) — নিত্যপ্রয়োজনীয় পণ্যের বাজার দর ট্র্যাকার

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![BetterAuth](https://img.shields.io/badge/BetterAuth-Authentication-green?style=for-the-badge)](https://better-auth.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![Deployed on Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel)](https://bazardor-ten.vercel.app)

**বাজার দর (BazarDor)** হলো একটি আধুনিক ও ফুল-স্ট্যাক ওয়েবাসাইট, যার মাধ্যমে বাংলাদেশে নিত্যপ্রয়োজনীয় পণ্যের (চাল, ডাল, তেল, সবজি, মাছ, মাংস ইত্যাদি) প্রতিদিনের বাজার দর, দামের পরিবর্তন এবং বাজারভিত্তিক বিস্তারিত তথ্য এক নজরে পাওয়া যায়।

---

## 🔗 গুরুত্বপূর্ণ লিংক (Important Links)

- 🌐 **লাইভ ওয়েবসাইট (Live Demo):** [https://bazardor-ten.vercel.app](https://bazardor-ten.vercel.app)
- 📁 **গিটহাব রিপোজিটোরি (GitHub Repo):** [https://github.com/dev-marufbillah/bazardor](https://github.com/dev-marufbillah/bazardor)

---

## ✨ প্রধান ফিচারসমূহ (Key Features)

1. **📊 লাইভ প্রাইস টিকার (Live Price Ticker):**
   - নেভবারের নিচে রিয়েল-টাইম স্ক্রলিং স্ট্রিপ যেখানে প্রতিনিয়ত সব পণ্যের নাম, দাম এবং পরিবর্তনের শতাংশ (▲/▼ %) স্বয়ংক্রিয়ভাবে প্রদর্শন করে।

2. **📈 দামের বাড়া-কমা সেকশন (Risings & Fallings Sections):**
   - হোম পেজে **"আজ দাম বেড়েছে ▲"** এবং **"আজ দাম কমেছে ▼"** শিরোনামে পৃথক ফিল্টার করা সেকশন।

3. **🗂️ ক্যাটাগরি ফিল্টার ও সর্টিং (Category Filtering & Price Sorting - C1 Challenge):**
   - চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম-দুধ ও মসলা ক্যাটাগরিতে ফিল্টার করার সুবিধা।
   - **সাজান (Sort):** গাণিতিক মান অনুযায়ী দাম কম থেকে বেশি এবং বেশি থেকে কম সাজানোর সুবিধা (Bengali Numerals & Numeric Value Supported)।

4. **🔒 বাজারভিত্তিক প্রোডাক্ট ডিটেইলস (Protected Detail Page):**
   - সুরক্ষিত রাউট (Protected Route) — শুধুমাত্র অথেন্টিকেটেড ব্যবহারকারীরা দেখতে পারেন।
   - কারওয়ান বাজার, গ্রীন মার্কেট, মিরপুর, চট্টগ্রাম ইত্যাদি বাজার ভিত্তিক **সর্বনিম্ন**, **সর্বোচ্চ** এবং **গড় দামের** বিস্তারিত টেবিল।

5. **🔐 বেটার-অথেন্টিকেশন ও প্রোফাইল ব্যবস্থাপনা (BetterAuth & Profile System - C3 Challenge):**
   - ইমেইল/পাসওয়ার্ড দিয়ে সাইন আপ ও সাইন ইন।
   - **Google OAuth** এবং **GitHub OAuth** সামাজিক লগইন সুবিধা।
   - **প্রোফাইল আপডেট:** প্রোফাইল পেজ (`/profile`) থেকে সরাসরি ইউজারের নাম আপডেট করার সুবিধা।
   - **রিসপন্সিভ টুস্ট:** প্রতিটি অ্যাকশনে (লগইন, ভুল তথ্য, আপডেট) `react-hot-toast` নোটিফিকেশন।

6. **🎨 ফ্লেক্সিবল ও রেসপন্সিভ ডিজাইন (Responsive & Error Handling):**
   - মোবাইল, ট্যাবলেট ও ডেস্কটপ সব ডিভাইসে সম্পূর্ণ রেসপন্সিভ (Figma Design System অনুসরণ করে নির্মিত)।
   - কাস্টম **404 Not Found** পেজ ও লোডিং **Skeleton Animation**।

---

## 🛠️ ব্যবহৃত প্রযুক্তি (Technologies Used)

| ক্যাটাগরি | টেকনোলজি / লাইব্রেরি |
| :--- | :--- |
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS v4, DaisyUI |
| **Authentication** | BetterAuth (Email/Password, Google OAuth, GitHub OAuth) |
| **Database** | MongoDB Atlas (Native MongoDB Driver) |
| **Toast Notifications** | React Hot Toast |
| **Icons & Assets** | Native Emojis & Custom Local Graphics |
| **Deployment** | Vercel |

---

## 💻 লোকাল ডেভেলপমেন্ট সেটআপ (Local Installation & Setup)

এই প্রজেক্টটি আপনার লোকাল কম্পিউটারে রান করতে নিচের ধাপগুলো অনুসরণ করুন:

### ১. রিপোজিটোরি ক্লোন করুন:
```bash
git clone https://github.com/dev-marufbillah/bazardor.git
cd bazardor