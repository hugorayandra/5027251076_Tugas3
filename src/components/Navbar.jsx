import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar({ viewMode, productCount, apiOnline }) {
  const navLinkClass = ({ isActive }) =>
    `inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-150 ${
      isActive
        ? 'bg-blue-600 text-white shadow-sm'
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
    }`;

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-base shadow-xs">
            MP
          </div>
          <div>
            <span className="font-bold text-slate-900 text-base tracking-tight block leading-none">
              Manajemen Produk
            </span>
            <span className="text-xs text-slate-500 mt-0.5 flex items-center gap-1.5">
              <span
                className={`inline-block w-1.5 h-1.5 rounded-full ${
                  apiOnline ? 'bg-emerald-500' : 'bg-amber-500'
                }`}
              />
              {apiOnline ? 'Terhubung ke API Express' : 'Mode Penyimpanan Lokal'} • {productCount} produk
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <NavLink to="/" end className={navLinkClass}>
            <span>📦</span>
            <span>Produk</span>
          </NavLink>

          <NavLink to="/settings" className={navLinkClass}>
            <span>⚙️</span>
            <span>Settings</span>
            <span className="ml-1 text-[11px] uppercase px-1.5 py-0.5 rounded bg-slate-200/80 text-slate-700 font-bold">
              {viewMode}
            </span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
