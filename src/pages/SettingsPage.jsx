import React from 'react';
import { Link } from 'react-router-dom';

function SettingsPage({ viewMode, onViewModeChange }) {
  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
        >
          <span>←</span>
          <span>Kembali ke Daftar Produk</span>
        </Link>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="pb-6 border-b border-slate-100">
          <h1 className="text-2xl font-bold text-slate-900">Pengaturan Tampilan (Settings)</h1>
          <p className="text-sm text-slate-500 mt-1">
            Pilih tata letak daftar produk pada halaman utama. Perubahan akan langsung diterapkan dan disimpan.
          </p>
        </div>

        <div className="py-6">
          <label className="block text-sm font-bold text-slate-800 mb-3">
            Mode Tampilan Daftar Produk
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => onViewModeChange('grid')}
              className={`text-left p-5 rounded-xl border-2 transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'border-blue-600 bg-blue-50/50 shadow-xs'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-base font-bold text-slate-900">Tampilan Grid</span>
                <span
                  className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                    viewMode === 'grid'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {viewMode === 'grid' ? 'Aktif' : 'Pilih'}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-1.5 mb-3">
                <div className="h-7 rounded bg-blue-200/70" />
                <div className="h-7 rounded bg-blue-200/70" />
                <div className="h-7 rounded bg-blue-200/70" />
              </div>
              <p className="text-xs text-slate-500">
                Menampilkan produk dalam bentuk kartu 3 kolom yang ringkas dan visual.
              </p>
            </button>

            <button
              type="button"
              onClick={() => onViewModeChange('list')}
              className={`text-left p-5 rounded-xl border-2 transition-all cursor-pointer ${
                viewMode === 'list'
                  ? 'border-blue-600 bg-blue-50/50 shadow-xs'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-base font-bold text-slate-900">Tampilan List</span>
                <span
                  className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                    viewMode === 'list'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {viewMode === 'list' ? 'Aktif' : 'Pilih'}
                </span>
              </div>
              <div className="flex flex-col gap-1.5 mb-3">
                <div className="h-3 rounded bg-blue-200/70 w-full" />
                <div className="h-3 rounded bg-blue-200/70 w-full" />
              </div>
              <p className="text-xs text-slate-500">
                Menampilkan produk secara memanjang ke bawah dalam baris horizontal.
              </p>
            </button>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Status saat ini:{' '}
            <strong className="text-slate-800 uppercase">{viewMode}</strong>
          </span>
          <Link
            to="/"
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors"
          >
            Lihat Hasil di Daftar Produk →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
