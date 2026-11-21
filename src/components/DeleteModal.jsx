import React from 'react';

function DeleteModal({ isOpen, product, onClose, onConfirm }) {
  if (!isOpen || !product) return null;

  const formatRupiah = (number) =>
    'Rp' + Number(number).toLocaleString('id-ID');

  return (
    <div className="fixed inset-0 bg-slate-900/45 backdrop-blur-[1px] flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl border border-slate-200 relative text-center">
        <button
          type="button"
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-2xl leading-none cursor-pointer"
          onClick={onClose}
        >
          ×
        </button>

        <div className="w-12 h-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center mx-auto mb-3 text-xl">
          🗑️
        </div>

        <h2 className="text-xl font-bold text-slate-900">Hapus Produk?</h2>
        <p className="text-xs text-slate-500 mt-1">
          Produk yang dihapus tidak dapat dikembalikan.
        </p>

        <div className="border border-slate-200 bg-slate-50 rounded-xl p-3.5 text-left my-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">ID: {product.id}</span>
            {product.stock !== undefined && (
              <span className="text-xs text-slate-500">Stok: {product.stock}</span>
            )}
          </div>
          <h4 className="font-bold text-slate-900 my-1">{product.name}</h4>
          <p className="text-blue-700 font-bold text-base">{formatRupiah(product.price)}</p>
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="flex-1 py-2 px-4 rounded-lg bg-white text-blue-700 border border-slate-300 hover:bg-slate-50 text-sm font-semibold cursor-pointer transition-colors"
            onClick={onClose}
          >
            Batal
          </button>
          <button
            type="button"
            className="flex-1 py-2 px-4 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-semibold cursor-pointer transition-colors"
            onClick={() => onConfirm(product.id)}
          >
            Hapus Produk
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
