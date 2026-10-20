/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  Users,
  FileText,
  HeartHandshake,
  DollarSign,
  GraduationCap,
  UserPlus,
  Smile,
  ShieldAlert,
  BarChart3,
  LayoutDashboard,
  Cpu,
  Layers,
  ChevronRight,
  Info,
} from 'lucide-react';
import { ModuleKey } from '../types';

interface SidebarProps {
  currentModule: ModuleKey;
  onSelectModule: (mod: ModuleKey) => void;
  counts: {
    employees: number;
    documents: number;
    families: number;
    novelties: number;
    trainings: number;
    jobs: number;
    wellness: number;
    sstStandards: number;
    climateSurveys: number;
  };
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentModule,
  onSelectModule,
  counts,
}) => {
  const navSections = [
    {
      title: 'VISTA GENERAL',
      items: [
        {
          id: 'dashboard' as ModuleKey,
          label: 'Dashboard General',
          icon: LayoutDashboard,
          badge: null,
          color: 'text-slate-300',
        },
      ],
    },
    {
      title: 'MÓDULOS DE TALENTO HUMANO (9 PROCESOS)',
      items: [
        {
          id: 'personal' as ModuleKey,
          label: '1. Datos del Personal',
          icon: Users,
          badge: counts.employees,
          color: 'text-blue-400',
          desc: 'Registro, contratos CST y afiliaciones',
        },
        {
          id: 'documentos' as ModuleKey,
          label: '2. Documentación',
          icon: FileText,
          badge: counts.documents,
          color: 'text-amber-400',
          desc: 'Expedientes, exámenes y contratos',
        },
        {
          id: 'familia' as ModuleKey,
          label: '3. Información Familiar',
          icon: HeartHandshake,
          badge: counts.families,
          color: 'text-rose-400',
          desc: 'Beneficiarios CCF y emergencias',
        },
        {
          id: 'novedades' as ModuleKey,
          label: '4. Novedades de Nómina',
          icon: DollarSign,
          badge: counts.novelties,
          color: 'text-emerald-400',
          desc: 'Horas extras, recargos e incapacidades',
        },
        {
          id: 'capacitacion' as ModuleKey,
          label: '5. Capacitación (PIC)',
          icon: GraduationCap,
          badge: counts.trainings,
          color: 'text-indigo-400',
          desc: 'Plan anual, asistencias y evaluación',
        },
        {
          id: 'reclutamiento' as ModuleKey,
          label: '6. Reclutamiento & Selección',
          icon: UserPlus,
          badge: counts.jobs,
          color: 'text-purple-400',
          desc: 'Vacantes, pipeline y contratación',
        },
        {
          id: 'bienestar' as ModuleKey,
          label: '7. Bienestar Laboral',
          icon: Smile,
          badge: counts.wellness,
          color: 'text-pink-400',
          desc: 'Pausas activas, cumpleaños, Ley 1857',
        },
        {
          id: 'sst' as ModuleKey,
          label: '8. SG-SST (Res. 0312)',
          icon: ShieldAlert,
          badge: `${counts.sstStandards} std`,
          color: 'text-orange-400',
          desc: 'Vigía, peligros, dotación e incidentes',
        },
        {
          id: 'clima' as ModuleKey,
          label: '9. Clima Organizacional',
          icon: BarChart3,
          badge: '88%',
          color: 'text-teal-400',
          desc: 'Encuestas, dimensiones y planes',
        },
      ],
    },
    {
      title: 'INGENIERÍA DE SISTEMAS',
      items: [
        {
          id: 'arquitectura' as ModuleKey,
          label: 'Diseño Conceptual & MER',
          icon: Cpu,
          badge: 'Blueprint',
          color: 'text-emerald-400',
          desc: 'Arquitectura, MER, flujos y marco legal',
        },
      ],
    },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col shrink-0 min-h-[calc(100vh-65px)]">
      <div className="p-3 border-b border-slate-800/80 bg-slate-950/40">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
          <Layers className="w-4 h-4 text-emerald-400" />
          <span>ESTRUCTURA MODULAR</span>
        </div>
        <p className="text-[11px] text-slate-400 mt-0.5">
          9 Procesos Integrales + Arquitectura
        </p>
      </div>

      <nav className="flex-1 p-2.5 space-y-4 overflow-y-auto">
        {navSections.map((sec, idx) => (
          <div key={idx} className="space-y-1">
            <h3 className="px-2.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              {sec.title}
            </h3>
            <div className="space-y-0.5">
              {sec.items.map((item) => {
                const Icon = item.icon;
                const isActive = currentModule === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onSelectModule(item.id)}
                    className={`w-full text-left px-2.5 py-2 rounded-lg flex items-center justify-between text-xs transition group ${
                      isActive
                        ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 font-medium'
                        : 'text-slate-300 hover:bg-slate-800/70 hover:text-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon className={`w-4 h-4 shrink-0 ${item.color}`} />
                      <div className="truncate">
                        <div className="truncate font-medium">{item.label}</div>
                      </div>
                    </div>
                    {item.badge !== null && (
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono shrink-0 ml-1.5 ${
                          isActive
                            ? 'bg-emerald-500 text-slate-950 font-bold'
                            : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Microenterprise Colombian Context Card */}
      <div className="p-3 m-2.5 bg-slate-950/70 border border-slate-800 rounded-lg text-xs space-y-1.5">
        <div className="flex items-center gap-1.5 text-amber-400 font-medium text-[11px]">
          <Info className="w-3.5 h-3.5" />
          <span>Microempresa en Colombia</span>
        </div>
        <p className="text-[11px] text-slate-400 leading-relaxed">
          Diseñado bajo los estándares del <strong>CST</strong>, Decreto 1072/15 y
          Resolución 0312/19 (7 Estándares Mínimos SG-SST para empresas de ≤10 trabajadores).
        </p>
      </div>
    </aside>
  );
};
