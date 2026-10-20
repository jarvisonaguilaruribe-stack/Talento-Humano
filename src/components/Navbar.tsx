/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  Users,
  ShieldCheck,
  Building2,
  BookOpenCheck,
  LayoutDashboard,
  Search,
  Bell,
  CheckCircle2,
  FileSpreadsheet,
} from 'lucide-react';
import { ModuleKey } from '../types';

interface NavbarProps {
  currentModule: ModuleKey;
  onSelectModule: (mod: ModuleKey) => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  employeeCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentModule,
  onSelectModule,
  searchTerm,
  onSearchChange,
  employeeCount,
}) => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-30 shadow-md">
      {/* Top Banner: Microempresa Info & Colombian Legal Status */}
      <div className="px-4 py-2 bg-slate-950/60 border-b border-slate-800/80 flex flex-wrap items-center justify-between text-xs text-slate-300 gap-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-medium text-emerald-400">
            <Building2 className="w-3.5 h-3.5" />
            <span>Innovaciones Andinas S.A.S.</span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-400">NIT: 901.482.391-4</span>
          </div>
          <span className="hidden sm:inline-block bg-slate-800 text-slate-300 px-2 py-0.5 rounded text-[11px]">
            Microempresa (Ley 590/2000 - Decreto 957/2019)
          </span>
        </div>

        <div className="flex items-center gap-4 text-[11px]">
          <span className="flex items-center gap-1 text-emerald-300">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            Seguridad Social PILA al día
          </span>
          <span className="hidden md:flex items-center gap-1 text-blue-300">
            <ShieldCheck className="w-3 h-3 text-blue-400" />
            SG-SST Res. 0312: 7 Estándares
          </span>
          <span className="bg-emerald-950/80 border border-emerald-700/50 text-emerald-300 px-2 py-0.5 rounded font-medium">
            Jornada Ley 2101: 46h/sem
          </span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="px-4 py-3 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onSelectModule('dashboard')}
            className="flex items-center gap-2.5 text-left focus:outline-none group"
            title="Ir al Dashboard de Talento Humano"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-sm font-bold text-lg group-hover:scale-105 transition-transform">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base text-slate-100 tracking-tight">
                  TalentoPyme
                </span>
                <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] px-1.5 py-0.2 rounded font-semibold uppercase tracking-wider">
                  Colombia
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Gestión Integral de Talento Humano para Microempresas
              </p>
            </div>
          </button>
        </div>

        {/* Search bar */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Buscar colaborador, documento, cargo o novedad..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-slate-800/80 border border-slate-700/80 rounded-lg pl-9 pr-4 py-1.5 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
            />
            {searchTerm && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-2 text-xs text-slate-400 hover:text-slate-200"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* View Switcher: Operational vs Architecture Blueprint */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onSelectModule('dashboard')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition ${
              currentModule !== 'arquitectura'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Panel Operativo</span>
            <span className="sm:hidden">Operativo</span>
          </button>

          <button
            onClick={() => onSelectModule('arquitectura')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition border ${
              currentModule === 'arquitectura'
                ? 'bg-teal-700 border-teal-500 text-white shadow-sm'
                : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
            }`}
          >
            <BookOpenCheck className="w-3.5 h-3.5 text-teal-300" />
            <span>Diseño & Arquitectura</span>
          </button>

          {/* Quick Stats Pill */}
          <div className="hidden lg:flex items-center gap-2 pl-2 border-l border-slate-800 text-xs text-slate-400">
            <span className="bg-slate-800 px-2.5 py-1 rounded-md text-slate-300 font-mono text-[11px]">
              {employeeCount} Colaboradores
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
