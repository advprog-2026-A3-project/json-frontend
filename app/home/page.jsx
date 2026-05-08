'use client';

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HomePage() {
  const dummyProducts = [
    { id: 1, name: "Labubu Blindbox Series 1", price: "Rp 350.000", image: "/image_home_json_barang_jastipan.png", category: "Toys" },
    { id: 2, name: "Nike Air Jordan 1 Low", price: "Rp 2.100.000", image: "/image_flash_sale.png", category: "Shoes" },
    { id: 3, name: "Skincare Olive Young Bundle", price: "Rp 850.000", image: "/image_home_json_jastip.png", category: "Beauty" },
    { id: 4, name: "Tokyo Banana Snack Box", price: "Rp 250.000", image: "/image_flash_sale.png", category: "Food" },
  ];

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  const scaleUp = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#f4f7f9] flex flex-col overflow-hidden">
      {/* 1. HERO SECTION & QUICK ACTIONS */}
      <section className="bg-gradient-to-b from-[#2b44a8] to-[#1f3482] pt-16 pb-32 text-white relative">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 0.3 }} 
          transition={{ duration: 0.8 }}
          className="absolute inset-0 bg-[url('/background_image_home_page.png')] bg-cover bg-[center_25%] mix-blend-overlay"
        ></motion.div>
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
              Selamat Datang di <span className="text-[#ffd54a]">JSON</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-blue-100 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Temukan barang impianmu dari seluruh dunia. Kami menghubungkanmu dengan Jastiper terpercaya untuk transaksi yang aman, mudah, dan transparan.
            </motion.p>
            
            {/* Quick Actions */}
            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4">
              <Link href="/katalog" className="bg-[#ff4b72] text-white px-8 py-3.5 rounded-lg font-bold hover:bg-[#e63e63] transition-colors shadow-[0_4px_12px_rgba(255,75,114,0.3)] hover:shadow-[0_6px_16px_rgba(255,75,114,0.4)] hover:-translate-y-1">
                Mulai Belanja
              </Link>
              <Link href="/voucher" className="bg-white/10 border border-white/20 text-white px-8 py-3.5 rounded-lg font-bold hover:bg-white/20 transition-colors backdrop-blur-sm hover:-translate-y-1">
                Lihat Promo
              </Link>
              <Link href="/register?role=jastiper" className="bg-transparent border border-blue-400 text-blue-50 px-8 py-3.5 rounded-lg font-bold hover:bg-white/5 transition-colors hover:-translate-y-1">
                Masuk sebagai Jastiper
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-14 relative z-20 w-full">
        
        {/* 2. SYSTEM STATUS (Microservices Integrations) */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-white p-6 mb-20 flex flex-wrap items-center justify-center lg:justify-between gap-4"
        >
          <motion.div variants={scaleUp} className="flex items-center gap-3 text-sm font-bold text-emerald-700 bg-emerald-50 px-4 py-2.5 rounded-full border border-emerald-200 shadow-sm">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            Auth Ready
          </motion.div>
          <motion.div variants={scaleUp} className="flex items-center gap-3 text-sm font-bold text-emerald-700 bg-emerald-50 px-4 py-2.5 rounded-full border border-emerald-200 shadow-sm">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            Inventory Connected
          </motion.div>
          <motion.div variants={scaleUp} className="flex items-center gap-3 text-sm font-bold text-emerald-700 bg-emerald-50 px-4 py-2.5 rounded-full border border-emerald-200 shadow-sm">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            Voucher Connected
          </motion.div>
          <motion.div variants={scaleUp} className="flex items-center gap-3 text-sm font-bold text-amber-700 bg-amber-50 px-4 py-2.5 rounded-full border border-amber-200 shadow-sm">
            <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
            Checkout Coming Soon
          </motion.div>
        </motion.section>

        {/* 3. PREVIEW KATALOG */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mb-24"
        >
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-8 gap-4">
            <motion.div variants={fadeInUp}>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-800">Preview Katalog</h2>
              <p className="text-slate-500 text-sm mt-1">Intip beberapa barang incaran yang tersedia di inventory saat ini.</p>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Link href="/katalog" className="text-[#2149d8] text-sm font-bold hover:underline shrink-0 flex items-center gap-1 group">
                Lihat Seluruh Katalog 
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </Link>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {dummyProducts.map((product) => (
              <motion.div 
                variants={fadeInUp} 
                whileHover={{ y: -8 }}
                key={product.id} 
                className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl transition-shadow group"
              >
                <div className="h-48 sm:h-56 w-full relative bg-slate-100 overflow-hidden">
                  <Image src={product.image} alt={product.name} fill className="object-cover object-bottom group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-slate-700 shadow-sm border border-white/50">
                    {product.category}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-slate-800 text-[15px] line-clamp-2">{product.name}</h3>
                  <p className="text-[#2149d8] font-black mt-3 text-lg">{product.price}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <div className="grid lg:grid-cols-2 gap-8 mb-24">
          {/* 4. VOUCHER / PROMO HIGHLIGHT */}
          <motion.section 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={scaleUp}
            className="bg-gradient-to-br from-[#ff4b72] to-[#ff7a98] rounded-3xl p-8 sm:p-10 text-white flex flex-col justify-center relative overflow-hidden shadow-xl"
          >
            <motion.div 
              animate={{ rotate: 360 }} 
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute -top-10 -right-10 w-48 h-48 bg-white opacity-10 rounded-full blur-3xl"
            ></motion.div>
            <div className="absolute bottom-0 right-10 w-24 h-24 bg-yellow-300 opacity-20 rounded-full blur-2xl"></div>
            
            <div className="inline-flex items-center gap-2 bg-white/20 w-fit px-3 py-1 rounded-full mb-4 border border-white/30 backdrop-blur-sm shadow-sm">
              <span className="text-xl">🎟️</span>
              <span className="text-xs font-bold tracking-widest uppercase text-white drop-shadow-sm">Promo Aktif</span>
            </div>
            
            <h2 className="text-3xl font-black mb-3 relative z-10 leading-tight">Diskon Ongkir<br/>Hingga 50%</h2>
            <p className="text-rose-100 mb-8 relative z-10 text-sm sm:text-base max-w-md">Klaim voucher ini di layanan Voucher kami untuk mendapatkan potongan harga spesial pada transaksi pertamamu.</p>
            
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center relative z-10">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-white text-[#ff4b72] rounded-xl px-6 py-4 font-mono font-black text-xl tracking-widest border-2 border-dashed border-rose-200 shadow-inner"
              >
                JSONHEMAT50
              </motion.div>
              <Link href="/voucher" className="text-sm font-bold text-white hover:text-rose-100 underline underline-offset-4">Lihat Semua Voucher</Link>
            </div>
          </motion.section>

          {/* 5. CARA KERJA */}
          <motion.section 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl shadow-slate-200/40 flex flex-col justify-center"
          >
            <motion.h2 variants={slideInRight} className="text-2xl font-black text-slate-800 mb-8">Cara Kerja Jastip JSON</motion.h2>
            <div className="space-y-6">
              <motion.div variants={slideInRight} className="flex gap-5 group">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-[#2149d8] flex items-center justify-center font-black shrink-0 border border-blue-100 group-hover:scale-110 transition-transform shadow-sm">1</div>
                <div>
                  <h4 className="font-bold text-slate-800 text-[15px]">Daftar / Login</h4>
                  <p className="text-sm text-slate-500 mt-1 leading-relaxed">Buat akun menggunakan layanan Auth kami untuk mulai menggunakan aplikasi.</p>
                </div>
              </motion.div>
              <motion.div variants={slideInRight} className="flex gap-5 group">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-[#2149d8] flex items-center justify-center font-black shrink-0 border border-blue-100 group-hover:scale-110 transition-transform shadow-sm">2</div>
                <div>
                  <h4 className="font-bold text-slate-800 text-[15px]">Pilih Produk (Katalog/Inventory)</h4>
                  <p className="text-sm text-slate-500 mt-1 leading-relaxed">Eksplorasi barang-barang eksklusif yang tersambung dengan layanan Inventory.</p>
                </div>
              </motion.div>
              <motion.div variants={slideInRight} className="flex gap-5 group">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-[#2149d8] flex items-center justify-center font-black shrink-0 border border-blue-100 group-hover:scale-110 transition-transform shadow-sm">3</div>
                <div>
                  <h4 className="font-bold text-slate-800 text-[15px]">Gunakan Voucher</h4>
                  <p className="text-sm text-slate-500 mt-1 leading-relaxed">Klaim diskon melalui layanan Voucher agar transaksimu lebih hemat.</p>
                </div>
              </motion.div>
              <motion.div variants={slideInRight} className="flex gap-5 group">
                <div className="w-10 h-10 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center font-black shrink-0 border border-slate-100 shadow-sm">4</div>
                <div>
                  <h4 className="font-bold text-slate-400 text-[15px]">Checkout & Pengiriman <span className="text-xs bg-slate-200 px-2 py-0.5 rounded text-slate-500 ml-1">Segera</span></h4>
                  <p className="text-sm text-slate-400 mt-1 leading-relaxed">Selesaikan pembayaran dan pantau pengiriman dengan sistem yang aman.</p>
                </div>
              </motion.div>
            </div>
          </motion.section>
        </div>

      </main>
      
      {/* 6. FOOTER SINGKAT */}
      <footer className="border-t border-slate-200 mt-auto py-10 bg-white text-center text-slate-500 text-sm w-full">
        <p className="font-bold text-slate-800 mb-2">Jastip Online Nasional (JSON)</p>
        <p>&copy; 2026. All rights reserved.</p>
      </footer>
    </div>
  );
}
