export default function Home() {
  const highlights = [
    {
      title: "Akun dan Identitas",
      description: "Registrasi, login, dan profil pengguna jadi fondasi masuk ke seluruh alur belanja.",
    },
    {
      title: "Voucher dan Promo",
      description: "Voucher checkout sudah masuk ke flow order dan siap dipakai sebelum submit transaksi.",
    },
    {
      title: "Checkout Terpadu",
      description: "Arah akhirnya satu shell frontend yang menyatukan Auth, Inventory, Voucher, Order, dan Wallet.",
    },
  ];

  const milestones = [
    "Masuk atau daftar akun baru",
    "Lihat produk dan detail checkout",
    "Terapkan voucher sebelum submit order",
    "Lanjutkan pembayaran dan konfirmasi status",
  ];

  return (
    <div className="min-h-[calc(100vh-72px)]">
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
        <section className="grid gap-5 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="rounded-lg border border-blue-100 bg-white px-8 py-9 shadow-[0_18px_45px_rgba(24,51,122,0.08)] sm:px-10">
            <div className="inline-flex rounded-md border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-blue-700">
              Frontend Integrasi Jastip
            </div>

            <h1 className="mt-6 max-w-3xl text-4xl font-black leading-tight text-slate-950 sm:text-5xl">
              Satu pintu untuk alur belanja lintas service.
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Repo ini disiapkan sebagai frontend utama untuk milestone 75. Fokusnya bukan landing page marketing, tapi pengalaman checkout yang rapi, cepat dipahami, dan siap dihubungkan ke Auth, Inventory, Voucher, Order, dan Wallet.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="/register"
                className="inline-flex min-w-52 items-center justify-center rounded-md bg-blue-700 px-6 py-3.5 text-sm font-bold tracking-tight shadow-[0_12px_24px_rgba(33,73,216,0.22)] transition-all hover:-translate-y-0.5 hover:bg-blue-800"
                style={{ color: "#ffffff" }}
              >
                Mulai dengan Daftar
              </a>
              <a
                href="/login"
                className="inline-flex min-w-44 items-center justify-center rounded-md border border-blue-200 bg-white px-6 py-3.5 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-50"
              >
                Masuk ke Akun
              </a>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-4">
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Status</div>
                <div className="mt-2 text-lg font-extrabold text-slate-950">Voucher Ready</div>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-4">
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Next</div>
                <div className="mt-2 text-lg font-extrabold text-slate-950">Inventory + Order</div>
              </div>
              <div className="rounded-lg border border-[#ffe39a] bg-[#fff8df] px-4 py-4">
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#8a6700]">Focus</div>
                <div className="mt-2 text-lg font-extrabold text-slate-950">Checkout Flow</div>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-lg border border-blue-100 bg-white p-6 shadow-[0_18px_45px_rgba(24,51,122,0.06)]">
              <div className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">Progress saat ini</div>
              <div className="mt-3 text-3xl font-black leading-tight text-slate-950">Auth Base Ready</div>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Login, register, dan profile sudah punya fondasi. Berikutnya tinggal dinaikkan jadi app shell yang benar-benar menyambungkan semua service.
              </p>
            </div>

            <div className="rounded-lg border border-blue-100 bg-white p-6 shadow-[0_18px_45px_rgba(24,51,122,0.06)]">
              <div className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">Target flow</div>
              <ul className="mt-4 space-y-3 text-sm text-slate-700">
                {milestones.map((step, index) => (
                  <li key={step} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-blue-600 text-xs font-bold text-white shadow-sm">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {highlights.map((item) => (
            <article key={item.title} className="rounded-lg border border-blue-100 bg-white p-6 shadow-[0_18px_45px_rgba(24,51,122,0.05)]">
              <h2 className="text-lg font-bold text-slate-950">{item.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
