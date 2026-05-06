"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('token')) {
      router.replace('/home');
    }
  }, [router]);
  const highlights = [
    {
      title: "Bagi Titipers (Pembeli)",
      description:
        "Dapatkan akses ke barang limited edition atau viral tanpa perlu bepergian. Ikuti sesi War atau Flash Sale dengan sistem antrean yang adil dan transparan.",
    },
    {
      title: "Bagi Jastipers (Traveler)",
      description:
        "Manfaatkan bagasi kosong untuk penghasilan tambahan. Buka Live Shopping atau katalog Pre-Order dan atur stok barang otomatis tanpa mencatat manual.",
    },
    {
      title: "Transaksi Aman Terlindungi",
      description:
        "Pembayaran Anda terjamin dengan sistem dompet digital. Uang hanya akan diteruskan ke Jastiper ketika barang sudah dipastikan ada dan terkirim.",
    },
  ];

  const milestones = [
    "Daftar akun sebagai Titipers atau Jastiper",
    "Eksplorasi katalog Pre-Order dan barang Flash Sale",
    "Checkout pesanan dan bayar aman dengan dompet digital",
    "Pantau status pesanan hingga barang tiba di tangan Anda",
  ];

  return (
    <div className="relative min-h-[calc(100vh-72px)] bg-[#f4f7f9] overflow-hidden">
      {/* Background Decorations (Ornamen Lingkaran & Titik) */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* Ornamen Kiri (Lingkaran Besar Orange & Dashed Circles) */}
        <svg className="absolute -left-[10%] top-[20%] h-[600px] w-[600px]" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="200" cy="300" r="250" fill="#ffd457" fillOpacity="0.04" />
          <circle cx="200" cy="300" r="180" stroke="#f5c22c" strokeOpacity="0.3" strokeWidth="1.5" strokeDasharray="12 12" />
          <circle cx="200" cy="300" r="120" stroke="#f5c22c" strokeOpacity="0.2" strokeWidth="1" />
        </svg>
        
        {/* Ornamen Kiri Atas (Lingkaran Biru Halus) */}
        <svg className="absolute -left-52 -top-52 h-[600px] w-[600px] pointer-events-none" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="250" cy="250" r="250" stroke="#2149d8" strokeOpacity="0.05" strokeWidth="1" />
          <circle cx="250" cy="250" r="180" stroke="#2149d8" strokeOpacity="0.03" strokeWidth="1" strokeDasharray="8 8" />
        </svg>

        {/* Pola Titik Kiri Bawah yang Jelas */}
        <div className="absolute left-8 top-[65%] h-72 w-48 opacity-[0.3]" style={{ backgroundImage: "radial-gradient(#fbbf24 3px, transparent 3px)", backgroundSize: "32px 32px" }} />
        
        {/* Ornamen Kanan Atas (Pola Titik) */}
        <div className="absolute right-10 top-10 h-40 w-40 opacity-[0.15]" style={{ backgroundImage: "radial-gradient(#1f3482 2px, transparent 2px)", backgroundSize: "24px 24px" }} />
        
        {/* Ornamen Kanan Bawah (Garis Melengkung Lingkaran) */}
        <svg className="absolute -right-[20%] top-[20%] h-[900px] w-[900px] text-blue-600/[0.07]" viewBox="0 0 900 900" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="450" cy="450" r="400" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="450" cy="450" r="320" stroke="currentColor" strokeWidth="1.5" strokeDasharray="12 12" />
          <circle cx="550" cy="350" r="450" stroke="currentColor" strokeWidth="1" />
        </svg>

        {/* Ornamen Top Center (Garis Halus Melengkung) */}
        <svg className="absolute left-[30%] -top-20 h-[500px] w-[800px] text-blue-500/[0.07]" viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M-100 500 Q400 -100 900 500" stroke="currentColor" strokeWidth="1" />
          <path d="M100 500 Q400 100 700 500" stroke="currentColor" strokeWidth="1" strokeDasharray="6 6" />
        </svg>
      </div>

      <main className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8 lg:py-10 xl:px-10">
        <section className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.7fr)_minmax(320px,0.88fr)] xl:gap-8">
          <div className="grid gap-6">
            <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.88fr)] xl:gap-8">
              <div className="w-full text-center lg:text-left">
                <h2 className="mb-4 whitespace-nowrap text-base font-black uppercase tracking-[0.15em] text-transparent bg-clip-text bg-gradient-to-r from-[#ff4b72] to-[#ff8533] sm:text-lg lg:text-xl">
                  Platform Jasa Titip Terpercaya
                </h2>

                <h1 className="mt-5 max-w-[12ch] text-3xl font-black leading-[1.14] text-[#17254a] sm:text-4xl lg:text-[3.55rem]">
                  JaStip Online Nasional <span className="text-[#2149d8] whitespace-nowrap">(JSON)</span>
                </h1>

                <p className="mx-auto mt-5 max-w-[31rem] text-[clamp(1rem,1.15vw,1.18rem)] leading-[1.7] text-slate-600 lg:mx-0">
                  Platform layanan titip yang menghubungkan traveler dengan pembeli untuk mendapatkan barang eksklusif dari berbagai daerah atau negara. Mengubah jastip manual yang memusingkan menjadi pengalaman yang terorganisir, cepat, dan aman.
                </p>

                <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
                  <a
                    href="/register"
                    className="inline-flex w-full items-center justify-center rounded-md bg-[#ff4b72] px-7 py-3 text-sm font-bold tracking-tight shadow-[0_8px_20px_rgba(255,75,114,0.25)] transition-all hover:-translate-y-1 hover:bg-[#e63e63] hover:shadow-[0_12px_24px_rgba(255,75,114,0.35)] sm:w-auto"
                    style={{ color: "#ffffff" }}
                  >
                    Mulai Belanja Sekarang
                  </a>
                  <a
                    href="/login"
                    className="inline-flex w-full items-center justify-center rounded-md border-2 border-[#2b44a8] bg-transparent px-7 py-3 text-sm font-bold text-[#2b44a8] transition-colors hover:bg-[#2b44a8] hover:text-white sm:w-auto"
                  >
                    Masuk ke Akun
                  </a>
                </div>
              </div>

              <div className="relative flex w-full justify-center lg:justify-end">
                <Image
                  src="/image_home_json_jastip.png"
                  width={600}
                  height={600}
                  alt="JaStip Online Nasional Hero"
                  className="h-auto w-full max-w-[320px] rounded-md border-4 border-white object-cover shadow-lg sm:max-w-[380px] lg:max-w-[460px] xl:max-w-[500px]"
                  priority
                />
              </div>
            </div>

            {/* Promo Strip */}
            <div className="hidden w-full items-center justify-between gap-6 rounded-xl border border-[#ffd6e2] bg-[#fff7f9]/90 p-6 shadow-sm backdrop-blur lg:flex xl:px-7">
              <div className="flex flex-1 items-center gap-5 xl:gap-6">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#ffd6e2] bg-[rgba(255,75,114,0.08)] text-[#ff4b72]">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6"><path fillRule="evenodd" d="M1.5 7.125c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v3.714c-1.105.304-1.91 1.34-1.91 2.586s.805 2.282 1.91 2.586v3.714c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 19.875v-3.714c1.105-.304 1.91-1.34 1.91-2.586s-.805-2.282-1.91-2.586V7.125ZM12 16.5a.75.75 0 0 0 .75-.75v-7.5a.75.75 0 0 0-1.5 0v7.5a.75.75 0 0 0 .75.75Z" clipRule="evenodd" /></svg>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-[1.12rem] font-bold leading-tight text-[#17254a]">Ada 3 Promo Menunggumu! 🎉</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Pilih promo yang paling cocok dan gunakan saat checkout untuk potongan harga tambahan.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2.5">
                    <div className="flex items-center gap-2 rounded-lg border border-[#ffc8d8] bg-[rgba(255,75,114,0.08)] px-3 py-2 text-xs text-[#d81b60]">
                      <span className="font-bold">Diskon 10%</span>
                      <span className="h-3.5 w-px bg-[#ffb7ca]"></span>
                      <span className="font-medium">Maks Rp50rb</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-700">
                      <span className="font-bold">Gratis Ongkir</span>
                      <span className="h-3.5 w-px bg-emerald-300"></span>
                      <span className="font-medium">Min. Rp100rb</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-700">
                      <span className="font-bold">Cashback 5%</span>
                      <span className="h-3.5 w-px bg-amber-300"></span>
                      <span className="font-medium">Maks Rp25rb</span>
                    </div>
                  </div>
                </div>
              </div>
              <a href="/voucher" className="shrink-0 rounded-md bg-[#ff4b72] px-6 py-3 text-sm font-bold text-white shadow-[0_4px_12px_rgba(255,75,114,0.2)] transition-all hover:-translate-y-0.5 hover:bg-[#e63e63] hover:text-white hover:shadow-[0_6px_16px_rgba(255,75,114,0.3)]">
                Klaim Sekarang
              </a>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 xl:gap-5">
              <div className="rounded-md border border-amber-100/50 bg-[#fffef7] px-5 py-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                <div className="text-[2rem] font-black text-[#ffd457]">01</div>
                <div className="mt-2 text-sm font-bold text-slate-800">Eksklusif</div>
                <div className="mt-1 text-sm leading-relaxed text-slate-500">
                  Akses langsung barang limited edition & viral.
                </div>
              </div>
              <div className="rounded-md border border-amber-100/50 bg-[#fffef7] px-5 py-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                <div className="text-[2rem] font-black text-[#ffd457]">02</div>
                <div className="mt-2 text-sm font-bold text-slate-800">Adil</div>
                <div className="mt-1 text-sm leading-relaxed text-slate-500">
                  Sistem antrean War / Flash sale yang transparan.
                </div>
              </div>
              <div className="rounded-md border border-amber-100/50 bg-[#fffef7] px-5 py-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                <div className="text-[2rem] font-black text-[#ffd457]">03</div>
                <div className="mt-2 text-sm font-bold text-slate-800">Praktis</div>
                <div className="mt-1 text-sm leading-relaxed text-slate-500">
                  Manajemen stok & katalog Jastiper otomatis.
                </div>
              </div>
            </div>

            {/* Pindahkan Highlights ke dalam kolom kiri untuk mengisi ruang kosong */}
            <div className="mt-2 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {highlights.map((item) => (
                <article
                  key={item.title}
                  className="rounded-md border border-amber-100/50 bg-[#fffef7] p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                >
                  <h2 className="text-lg font-bold text-[#17254a]">{item.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.description}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="grid self-start content-start gap-6">
            <div className="group flex h-full flex-col justify-between overflow-hidden rounded-md border border-[#1f3482] bg-[#2b44a8] text-white shadow-xl">
              <div className="p-7 pb-4 xl:p-8 xl:pb-5">
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#ffd54a] sm:text-sm">
                  War Barang Limited
                </div>
                <div className="mt-2 whitespace-nowrap text-[clamp(2rem,2.8vw,3.05rem)] font-black leading-[1.08] text-white sm:mt-3">
                  Ikuti Flash Sale
                </div>
                <p className="mt-3 max-w-[28rem] text-sm leading-relaxed text-blue-100 sm:mt-4 sm:text-[1rem]">
                  Jangan lewatkan kesempatan untuk memperebutkan tiket konser, sepatu edisi terbatas, atau makanan khas luar negeri secara adil.
                </p>
              </div>

              <div className="relative mt-2 h-56 w-full overflow-hidden sm:h-64 xl:h-[19rem]">
                <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-20 bg-gradient-to-b from-[#2b44a8] to-transparent" />
                <Image
                  src="/image_flash_sale.png"
                  fill
                  style={{ objectFit: "cover", objectPosition: "bottom" }}
                  alt="Barang Jastipan Flash Sale"
                  className="origin-bottom transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            </div>

            <div className="rounded-md border border-amber-100/50 bg-[#fffef7] p-7 shadow-sm xl:p-8">
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 sm:text-sm">
                Cara Kerja JSON
              </div>
              <ul className="mt-5 space-y-4 text-sm text-slate-700 sm:text-[1.02rem]">
                {milestones.map((step, index) => (
                  <li key={step} className="flex items-start gap-3 sm:gap-4">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-sm bg-[#ff4b72] text-xs font-bold text-white shadow-sm">
                      {index + 1}
                    </span>
                    <span className="leading-relaxed font-medium">{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
