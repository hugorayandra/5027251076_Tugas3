import React, { useState, useEffect } from 'react';

function ProductModal({ isOpen, mode, initialData, onClose, onSubmit }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('10');
  const [error, setError] = useState('');

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setName(initialData.name);
      setPrice(initialData.price);
      setStock(initialData.stock !== undefined ? String(initialData.stock) : '10');
    } else {
      setName('');
      setPrice('');
      setStock('10');
    }
    setError('');
  }, [isOpen, mode, initialData]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const numericPrice = Number(price);
    const numericStock = stock === '' ? 0 : Number(stock);

    if (!name.trim()) {
      setError('Nama produk wajib diisi.');
      return;
    }
    if (isNaN(numericPrice) || numericPrice <= 0) {
      setError('Harga harus lebih dari 0.');
      return;
    }
    if (isNaN(numericStock) || !Number.isInteger(numericStock) || numericStock < 0) {
      setError('Stok harus berupa bilangan bulat minimal 0.');
      return;
    }

    onSubmit({
      name: name.trim(),
      price: numericPrice,
      stock: numericStock,
    });
  };

  return (
    <div className="fixed inset-0 bg-slate-900/45 backdrop-blur-[1px] flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl border border-slate-200 relative">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {mode === 'add' ? 'Tambah Produk' : 'Edit Produk'}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              {mode === 'add'
                ? 'Masukkan informasi produk baru.'
                : 'Perbarui informasi produk yang dipilih.'}
            </p>
          </div>
          <button
            type="button"
            className="text-slate-400 hover:text-slate-600 text-2xl leading-none cursor-pointer"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        {mode === 'edit' && initialData && (
          <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-200 mb-3">
            ID: {initialData.id}
          </span>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Nama Produk
            </label>
            <input
              type="text"
              placeholder="Contoh: Pulpen"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Harga (Rp)
              </label>
              <input
                type="number"
                placeholder="Contoh: 5000"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <small className="text-[11px] text-slate-500 mt-1 block">
                Harga harus lebih dari 0.
              </small>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Stok
              </label>
              <input
                type="number"
                placeholder="Contoh: 25"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <small className="text-[11px] text-slate-500 mt-1 block">
                Jumlah stok tersedia.
              </small>
            </div>
          </div>

          {error && (
            <p className="text-red-600 text-xs font-medium bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              className="px-4 py-2 rounded-lg bg-white text-blue-700 border border-slate-300 hover:bg-slate-50 text-sm font-semibold cursor-pointer transition-colors"
              onClick={onClose}
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold cursor-pointer transition-colors"
            >
              {mode === 'add' ? 'Simpan Produk' : 'Simpan Perubahan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductModal;
