import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function NotFoundPage() {
  const location = useLocation();

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-10 text-center shadow-xs">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-50 text-red-600 border border-red-100 font-extrabold text-2xl mb-4">
          404
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          404 - Halaman Tidak Ditemukan
        </h1>
        <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto">
          Maaf, halaman dengan alamat{' '}
          <code className="font-mono text-xs bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded">
            {location.pathname}
          </code>{' '}
          tidak tersedia atau telah dipindahkan.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors"
          >
            ← Kembali ke Daftar Produk
          </Link>
          <Link
            to="/settings"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-semibold transition-colors"
          >
            Buka Halaman Settings
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
