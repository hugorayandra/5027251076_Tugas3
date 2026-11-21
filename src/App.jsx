import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductModal from './components/ProductModal';
import DeleteModal from './components/DeleteModal';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import SettingsPage from './pages/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/products';

const INITIAL_PRODUCTS = [
  { id: 1, name: 'Pulpen', price: 5000, stock: 100 },
  { id: 2, name: 'Buku Tulis', price: 12000, stock: 45 },
  { id: 3, name: 'Spidol', price: 8000, stock: 60 },
  { id: 4, name: 'Penggaris', price: 6000, stock: 50 },
  { id: 5, name: 'Penghapus', price: 3000, stock: 80 },
];

function App() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [apiOnline, setApiOnline] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState(() => {
    return localStorage.getItem('product_view_mode') || 'grid';
  });
  const [modalState, setModalState] = useState({ isOpen: false, mode: 'add', data: null });
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [afterDeleteCallback, setAfterDeleteCallback] = useState(null);

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
    localStorage.setItem('product_view_mode', mode);
  };

  const fetchProducts = useCallback(async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Gagal memuat produk dari API');
      const result = await response.json();
      if (result && Array.isArray(result.data)) {
        setProducts(result.data);
        setApiOnline(true);
      }
    } catch {
      setApiOnline(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSaveProduct = async (formData) => {
    if (modalState.mode === 'add') {
      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          const result = await response.json();
          if (result && result.data) {
            setProducts((prev) => [...prev, result.data]);
            setApiOnline(true);
          } else {
            await fetchProducts();
          }
        } else {
          throw new Error('Fallback local add');
        }
      } catch {
        const nextId = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
        setProducts((prev) => [...prev, { id: nextId, ...formData }]);
      }
    } else if (modalState.mode === 'edit' && modalState.data) {
      const targetId = modalState.data.id;
      try {
        const response = await fetch(`${API_URL}/${targetId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: targetId, ...formData }),
        });
        if (response.ok) {
          const result = await response.json();
          if (result && result.data) {
            setProducts((prev) =>
              prev.map((item) => (item.id === targetId ? result.data : item))
            );
            setApiOnline(true);
          } else {
            await fetchProducts();
          }
        } else {
          throw new Error('Fallback local edit');
        }
      } catch {
        setProducts((prev) =>
          prev.map((item) =>
            item.id === targetId ? { ...item, ...formData } : item
          )
        );
      }
    }
    setModalState({ isOpen: false, mode: 'add', data: null });
  };

  const handleDeleteProduct = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setApiOnline(true);
      }
    } catch {
      // tetap hapus dari state lokal jika server sedang offline
    }
    setProducts((prev) => prev.filter((item) => item.id !== id));
    setDeleteTarget(null);
    if (typeof afterDeleteCallback === 'function') {
      afterDeleteCallback();
      setAfterDeleteCallback(null);
    }
  };

  const openDeleteModal = (product, onDeleted = null) => {
    setDeleteTarget(product);
    setAfterDeleteCallback(() => onDeleted);
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
        <Navbar
          viewMode={viewMode}
          productCount={products.length}
          apiOnline={apiOnline}
        />

        <main className="flex-1">
          <Routes>
            <Route
              path="/"
              element={
                <ProductListPage
                  products={products}
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  viewMode={viewMode}
                  onAddClick={() =>
                    setModalState({ isOpen: true, mode: 'add', data: null })
                  }
                  onEditClick={(item) =>
                    setModalState({ isOpen: true, mode: 'edit', data: item })
                  }
                  onDeleteClick={(item) => openDeleteModal(item)}
                />
              }
            />
            <Route path="/products" element={<Navigate to="/" replace />} />
            <Route
              path="/products/:id"
              element={
                <ProductDetailPage
                  products={products}
                  apiUrl={API_URL}
                  onEditClick={(item) =>
                    setModalState({ isOpen: true, mode: 'edit', data: item })
                  }
                  onDeleteClick={(item, onDeleted) =>
                    openDeleteModal(item, onDeleted)
                  }
                />
              }
            />
            <Route
              path="/settings"
              element={
                <SettingsPage
                  viewMode={viewMode}
                  onViewModeChange={handleViewModeChange}
                />
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        <ProductModal
          isOpen={modalState.isOpen}
          mode={modalState.mode}
          initialData={modalState.data}
          onClose={() =>
            setModalState({ isOpen: false, mode: 'add', data: null })
          }
          onSubmit={handleSaveProduct}
        />

        <DeleteModal
          isOpen={Boolean(deleteTarget)}
          product={deleteTarget}
          onClose={() => {
            setDeleteTarget(null);
            setAfterDeleteCallback(null);
          }}
          onConfirm={handleDeleteProduct}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
