'use client';

import { useState, useEffect, useCallback } from 'react';
import Navbar from '@/app/components/Navbar';
import { getProducts, searchProductsByName } from '@/utils/inventory-api';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export default function ProductCatalogPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);

  // Fetch all products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getProducts();
        const productsData = response.data.data || response.data || [];
        setProducts(productsData);
        setFilteredProducts(productsData);
      } catch (err) {
        setError('Gagal memuat produk. Silakan coba lagi.');
        console.error('Error fetching products:', err);
        toast.error('Gagal memuat produk');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle search as user types with debounce
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredProducts(products);
      return;
    }

    const searchTimeout = setTimeout(async () => {
      try {
        setSearchLoading(true);
        const response = await searchProductsByName(searchQuery);
        const searchResults = response.data.data || response.data || [];
        setFilteredProducts(searchResults);
      } catch (err) {
        console.error('Error searching products:', err);
        toast.error('Gagal mencari produk');
      } finally {
        setSearchLoading(false);
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(searchTimeout);
  }, [searchQuery, products]);

  // Format price to IDR
  const formatPrice = (price) => {
    if (!price) return 'N/A';
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f4f7f9] to-[#eef4ff]">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-[#10203f] mb-2">Katalog Produk</h1>
          <p className="text-lg text-gray-600">Temukan produk favorit Anda dari ribuan pilihan</p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10"
        >
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Cari produk berdasarkan nama..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-[#d8e3ff] bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#2149d8] focus:border-transparent shadow-sm transition-all"
            />
            {searchLoading && (
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                <div className="animate-spin h-5 w-5 text-[#2149d8]">
                  <svg className="w-full h-full" fill="none" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Results Count */}
        {!loading && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-sm text-gray-600 mb-6"
          >
            Menampilkan {filteredProducts.length} produk
            {searchQuery && ` untuk "${searchQuery}"`}
          </motion.p>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-24">
            <div className="text-center">
              <div className="inline-block animate-spin h-12 w-12 text-[#2149d8] mb-4">
                <svg className="w-full h-full" fill="none" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
              <p className="text-gray-600 font-medium">Memuat produk...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg bg-red-50 border border-red-200 p-6 text-center"
          >
            <p className="text-red-700 font-medium">{error}</p>
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg bg-blue-50 border border-blue-200 p-12 text-center"
          >
            <svg
              className="mx-auto w-12 h-12 text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.354 15.354A9 9 0 015.646 5.646 9 9 0 0120.354 15.354z"
              />
            </svg>
            <p className="text-gray-700 font-medium">
              {searchQuery ? 'Tidak ada produk yang ditemukan' : 'Tidak ada produk tersedia'}
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#2149d8] px-4 py-2 text-white font-medium hover:bg-[#1737ad] transition-colors"
              >
                Lihat Semua Produk
              </button>
            )}
          </motion.div>
        )}

        {/* Products Grid */}
        {!loading && !error && filteredProducts.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                className="group rounded-lg border border-[#d8e3ff] bg-white shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                {/* Product Card */}
                <div className="flex flex-col h-full">
                  {/* Image Container */}
                  <div className="relative h-48 bg-gradient-to-br from-[#f4f7f9] to-[#eef4ff] overflow-hidden">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg
                          className="w-12 h-12 text-gray-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-grow p-4">
                    {/* Product Name */}
                    <h3 className="text-sm font-semibold text-[#10203f] line-clamp-2 mb-2 group-hover:text-[#2149d8] transition-colors">
                      {product.name}
                    </h3>

                    {/* Origin */}
                    {product.negaraAsal && (
                      <p className="text-xs text-gray-500 mb-3 flex items-center gap-1">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#2149d8]"></span>
                        {product.negaraAsal}
                      </p>
                    )}

                    {/* Stock */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-medium text-gray-600">Stok:</span>
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded-full ${
                          product.stok > 0
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {product.stok || 0}
                      </span>
                    </div>

                    {/* Price - Always at bottom */}
                    <div className="mt-auto pt-4 border-t border-[#d8e3ff]">
                      <p className="text-lg font-bold text-[#2149d8]">
                        {formatPrice(product.harga)}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>
    </div>
  );
}

