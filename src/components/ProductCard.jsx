import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ product, viewMode = 'grid', onEdit, onDelete }) {
  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    })
      .format(number)
      .replace(/\s/g, '');
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs hover:shadow-md hover:border-blue-200 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 text-blue-700 font-bold text-sm flex items-center justify-center shrink-0">
            #{product.id}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-slate-500">ID: {product.id}</span>
              {product.stock !== undefined && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
                  Stok: {product.stock}
                </span>
              )}
            </div>
            <Link
              to={`/products/${product.id}`}
              className="text-lg font-bold text-slate-900 hover:text-blue-600 transition-colors block mt-0.5"
            >
              {product.name}
            </Link>
          </div>
        </div>

        <div className="flex sm:items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
          <p className="text-blue-700 font-bold text-lg whitespace-nowrap">
            {formatRupiah(product.price)}
          </p>
          <div className="flex items-center gap-2">
            <Link
              to={`/products/${product.id}`}
              className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 text-sm font-semibold transition-colors cursor-pointer"
            >
              Lihat Detail
            </Link>
            <button
              type="button"
              onClick={() => onEdit(product)}
              className="px-3 py-1.5 rounded-lg border border-blue-300 text-blue-700 hover:bg-blue-50 text-sm font-semibold transition-colors cursor-pointer"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => onDelete(product)}
              className="px-3 py-1.5 rounded-lg border border-red-300 text-red-600 hover:bg-red-50 text-sm font-semibold transition-colors cursor-pointer"
            >
              Hapus
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:shadow-md hover:border-blue-200 transition-all flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-medium text-slate-500">ID: {product.id}</span>
          {product.stock !== undefined && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
              Stok: {product.stock}
            </span>
          )}
        </div>
        <Link
          to={`/products/${product.id}`}
          className="text-lg font-bold text-slate-900 hover:text-blue-600 transition-colors block my-1"
        >
          {product.name}
        </Link>
        <p className="text-blue-700 font-bold text-lg mb-4">{formatRupiah(product.price)}</p>
      </div>

      <div className="flex flex-col gap-2">
        <Link
          to={`/products/${product.id}`}
          className="w-full py-1.5 px-3 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-center text-sm font-semibold transition-colors"
        >
          Lihat Detail
        </Link>
        <div className="flex gap-2">
          <button
            type="button"
            className="flex-1 py-1.5 px-3 rounded-lg bg-white border border-blue-300 text-blue-700 hover:bg-blue-50 text-sm font-semibold transition-colors cursor-pointer"
            onClick={() => onEdit(product)}
          >
            Edit
          </button>
          <button
            type="button"
            className="flex-1 py-1.5 px-3 rounded-lg bg-white border border-red-300 text-red-600 hover:bg-red-50 text-sm font-semibold transition-colors cursor-pointer"
            onClick={() => onDelete(product)}
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
