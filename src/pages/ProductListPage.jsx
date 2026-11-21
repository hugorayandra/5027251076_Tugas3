import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

function ProductListPage({
  products,
  searchQuery,
  onSearchChange,
  viewMode,
  onAddClick,
  onEditClick,
  onDeleteClick,
}) {
  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Manajemen Produk</h1>
          <p className="text-sm text-slate-500 mt-1">
            Kelola daftar produk, lihat detail berdasarkan ID, dan atur tampilan melalui halaman Settings.
          </p>
        </div>

        <button
          type="button"
          onClick={onAddClick}
          className="px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-xs transition-colors cursor-pointer shrink-0"
        >
          + Tambah Produk
        </button>
      </header>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div className="flex items-center bg-white border border-slate-300 rounded-lg px-3.5 py-2 w-full sm:w-80 gap-2.5 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
          <span className="text-slate-400">🔍</span>
          <input
            type="text"
            placeholder="Cari nama produk..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full text-sm text-slate-800 placeholder-slate-400 focus:outline-none bg-transparent"
          />
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/settings"
            className="text-xs font-medium px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-700 transition-colors"
          >
            Tampilan: <strong className="uppercase">{viewMode}</strong> (Ubah di Settings)
          </Link>
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg">
            {products.length} produk
          </span>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center">
          <p className="text-slate-600 font-semibold">Tidak ada produk yang cocok dengan pencarian.</p>
          <p className="text-xs text-slate-400 mt-1">Coba gunakan kata kunci lain atau tambahkan produk baru.</p>
        </div>
      ) : (
        <div
          className={
            viewMode === 'list'
              ? 'flex flex-col gap-3'
              : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'
          }
        >
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              viewMode={viewMode}
              onEdit={onEditClick}
              onDelete={onDeleteClick}
            />
          ))}
        </div>
      )}

      <footer className="mt-6 text-xs text-slate-500 flex items-center justify-between">
        <span>
          Menampilkan {filteredProducts.length} dari {products.length} produk
        </span>
        <span>Mode tampilan aktif: {viewMode === 'grid' ? 'Grid (Kartu)' : 'List (Baris)'}</span>
      </footer>
    </div>
  );
}

export default ProductListPage;
