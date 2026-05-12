This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# JaStip Online Nasional (JSON) — C4 Model: Level 2 Container Diagram

## Deskripsi Sistem

**JSON** adalah platform yang menghubungkan **Titipers** (pembeli barang limited/viral) dengan **Jastipers** (traveler yang menyediakan jasa titip). Sistem dirancang untuk menangani lonjakan traffic tinggi saat *War* (perebutan barang limited) dan menjamin keamanan transaksi keuangan melalui fitur **Wallet**.

---
## Context Diagram

<img width="770" height="501" alt="ContextDiagram" src="https://github.com/user-attachments/assets/9199ae1f-c1ea-4d23-8459-7a40adf577ee" />

## Container Diagram (Mermaid.js)

```mermaid
C4Container
    title C4 Model — Level 2: Container Diagram — JaStip Online Nasional (JSON)

    Person(titipers, "Titipers", "Pembeli yang menitipkan pembelian barang limited/viral")
    Person(jastipers, "Jastipers", "Traveler yang menyediakan jasa titip beli")
    Person(admin, "Admin", "Pengelola dan moderator platform JSON")

    System_Boundary(json_system, "JaStip Online Nasional (JSON)") {

        Container(web_app, "Web Application", "Next.js", "Antarmuka pengguna untuk Titipers, Jastipers, dan Admin. Menangani pendaftaran, browsing katalog War, dan manajemen profil.")

        Container(api_app, "API Application", "Spring Boot (Java)", "Server utama yang mengelola seluruh logika bisnis platform, terdiri dari: Modul Auth & Profile (Registrasi, Login, KYC), Modul Inventory & Katalog (Manajemen stok, pencegahan overselling saat War), Modul Order (Orkestrator transaksi, manajemen status: Paid → Purchased → Shipped → Completed), Modul Wallet & Transaksi (Saldo, top-up, withdrawal, refund otomatis).")

        ContainerDb(database, "Database", "PostgreSQL (Supabase)", "Menyimpan data persisten: profil pengguna, data KYC, produk & stok, pesanan & status, serta mutasi saldo wallet.")
    }

    Rel(titipers, web_app, "Mengakses platform", "HTTPS")
    Rel(jastipers, web_app, "Mengakses platform", "HTTPS")
    Rel(admin, web_app, "Mengelola platform", "HTTPS")
    Rel(web_app, api_app, "Mengirim request & menerima response", "REST API / JSON over HTTPS")
    Rel(api_app, database, "Membaca & menulis data", "JDBC / SQL")

    UpdateLayoutConfig($c4ShapeInRow="3", $c4BoundaryInRow="1")
```
## Deplyment Diagram
<img width="8191" height="4710" alt="Deployment Diagram" src="https://github.com/user-attachments/assets/08ab5510-59ba-4044-8e48-7c91a093a50f" />

---

## Penjelasan Komponen

| Container | Teknologi | Fungsi Utama |
|---|---|---|
| **Web Application** | Next.js | UI untuk semua role user — pendaftaran, katalog War, profil, dashboard admin |
| **API Application** | Spring Boot (Java) | Backend monolitik dengan 4 modul: Auth & Profile, Inventory & Katalog, Order, Wallet & Transaksi |
| **Database** | PostgreSQL (Supabase) | Penyimpanan persisten untuk seluruh entitas bisnis |

## Relasi & Protokol

| Dari | Ke | Protokol | Keterangan |
|---|---|---|---|
| Titipers / Jastipers / Admin | Web Application | HTTPS | Akses antarmuka pengguna via browser |
| Web Application | API Application | REST API / JSON over HTTPS | Komunikasi client-server |
| API Application | Database | JDBC / SQL | Query dan mutasi data persisten |

