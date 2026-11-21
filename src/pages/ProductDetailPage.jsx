import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

function ProductDetailPage({ products, apiUrl, onEditClick, onDeleteClick }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const parsedId = Number(id);

  const localProduct = products.find((p) => Number(p.id) === parsedId);
  const [fetchedProduct, setFetchedProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    if (!Number.isInteger(parsedId) || parsedId <= 0) {
      return;
    }

    setLoading(true);
    fetch(`${apiUrl}/${parsedId}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (isMounted && json && json.data) {
          setFetchedProduct(json.data);
        }
      })
      .catch(() => {})
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [parsedId, apiUrl, products]);

  const product = localProduct || fetchedProduct;

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    })
      .format(number)
      .replace(/\s/g, '');
  };

  if (loading && !product) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-12 text-center">
        <p className="text-slate-500 text-sm">Memuat detail produk...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
            !
          </div>
          <span className="inline-block text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 mb-2">
            404 • Produk Tidak Ditemukan
          </span>
          <h1 className="text-2xl font-bold text-slate-900">
            Produk dengan ID &ldquo;{id}&rdquo; Tidak Ditemukan
          </h1>
          <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto">
            Data produk yang Anda cari tidak tersedia atau telah dihapus dari daftar produk.
          </p>
          <div className="mt-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors"
            >
              ← Kembali ke Daftar Produk
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                ID Produk: #{product.id}
              </span>
              <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                Tersedia
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">{product.name}</h1>
          </div>

          <div className="sm:text-right">
            <span className="text-xs text-slate-500 block">Harga Satuan</span>
            <p className="text-2xl font-bold text-blue-700">{formatRupiah(product.price)}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4">
            <span className="text-xs text-slate-500 block">ID Produk</span>
            <strong className="text-base font-bold text-slate-900 mt-0.5 block">
              {product.id}
            </strong>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4">
            <span className="text-xs text-slate-500 block">Nama Produk</span>
            <strong className="text-base font-bold text-slate-900 mt-0.5 block">
              {product.name}
            </strong>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4">
            <span className="text-xs text-slate-500 block">Stok Tersedia</span>
            <strong className="text-base font-bold text-slate-900 mt-0.5 block">
              {product.stock !== undefined ? `${product.stock} unit` : 'Tersedia'}
            </strong>
          </div>
        </div>

        <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-4 text-xs text-slate-600 mb-6">
          <strong className="text-slate-800 block mb-0.5">Informasi Route Detail Produk</strong>
          Halaman ini diakses melalui dynamic route <code className="font-mono text-blue-700 bg-blue-100/80 px-1.5 py-0.5 rounded">/products/{product.id}</code> dan menampilkan rincian produk sesuai parameter <code className="font-mono">:id</code>.
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
          <Link
            to="/"
            className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold transition-colors"
          >
            ← Kembali ke Daftar Produk
          </Link>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onEditClick(product)}
              className="px-4 py-2 rounded-lg bg-white border border-blue-300 text-blue-700 hover:bg-blue-50 text-sm font-semibold transition-colors cursor-pointer"
            >
              Edit Produk
            </button>
            <button
              type="button"
              onClick={() => {
                onDeleteClick(product, () => navigate('/'));
              }}
              className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition-colors cursor-pointer"
            >
              Hapus Produk
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
