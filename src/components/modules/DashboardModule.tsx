/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  Users,
  DollarSign,
  FileCheck,
  ShieldAlert,
  Smile,
  GraduationCap,
  Calendar,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Clock,
  Sparkles,
  Award,
  HeartHandshake,
  CheckCircle,
} from 'lucide-react';
import {
  Employee,
  PayrollNovelty,
  EmployeeDocument,
  SstStandard,
  SstIncident,
  TrainingPlan,
  WellnessActivity,
  ClimateSurvey,
  ModuleKey,
} from '../../types';

interface DashboardModuleProps {
  employees: Employee[];
  documents: EmployeeDocument[];
  novelties: PayrollNovelty[];
  trainings: TrainingPlan[];
  wellness: WellnessActivity[];
  sstStandards: SstStandard[];
  sstIncidents: SstIncident[];
  climate: ClimateSurvey;
  onNavigate: (module: ModuleKey) => void;
  onQuickNovelty: () => void;
  onQuickEmployee: () => void;
}

export const DashboardModule: React.FC<DashboardModuleProps> = ({
  employees,
  documents,
  novelties,
  trainings,
  wellness,
  sstStandards,
  sstIncidents,
  climate,
  onNavigate,
  onQuickNovelty,
  onQuickEmployee,
}) => {
  const activeEmployees = employees.filter((e) => e.status === 'ACTIVO' || e.status === 'VACACIONES');
  const totalPayroll = employees
    .filter((e) => e.contractType !== 'Prestación de Servicios')
    .reduce((sum, e) => sum + e.baseSalary, 0);

  const pendingDocs = documents.filter((d) => d.status === 'POR_VENCER' || d.status === 'VENCIDO');
  const sstCompliance = Math.round(
    (sstStandards.filter((s) => s.status === 'CUMPLE').length / sstStandards.length) * 100
  );

  const activeIncidents = sstIncidents.filter((i) => i.status !== 'CERRADO');
  const pendingNovelties = novelties.filter((n) => n.status === 'PENDIENTE');

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 p-6 rounded-xl border border-slate-700/80 shadow-sm relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Gestión Estratégica de Talento Humano - Microempresa Colombia</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
              Innovaciones Andinas S.A.S.
            </h1>
            <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-2xl">
              Control centralizado y modular de los 9 procesos de Talento Humano conforme al
              Código Sustantivo del Trabajo, estándares mínimos SG-SST (Resolución 0312 de 2019) y
              jornada laboral reducida (Ley 2101 de 2021).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={onQuickEmployee}
              className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-2 transition shadow-sm"
            >
              <Users className="w-4 h-4" />
              <span>Registrar Empleado</span>
            </button>
            <button
              onClick={onQuickNovelty}
              className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-100 text-xs font-semibold flex items-center gap-2 transition shadow-sm"
            >
              <DollarSign className="w-4 h-4 text-emerald-400" />
              <span>Ingresar Novedad Nómina</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Colaboradores */}
        <div
          onClick={() => onNavigate('personal')}
          className="bg-slate-900/90 border border-slate-800 hover:border-blue-500/50 p-4 rounded-xl transition cursor-pointer group shadow-sm"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Total Colaboradores</span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">{employees.length}</span>
            <span className="text-xs text-emerald-400 font-medium">
              {activeEmployees.length} activos
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1 flex items-center justify-between">
            <span>7 Laborales / 1 Honorarios</span>
            <ArrowRight className="w-3 h-3 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition" />
          </p>
        </div>

        {/* Nómina Base Mensual */}
        <div
          onClick={() => onNavigate('novedades')}
          className="bg-slate-900/90 border border-slate-800 hover:border-emerald-500/50 p-4 rounded-xl transition cursor-pointer group shadow-sm"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Nómina Base Mensual</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl font-bold text-white">
              ${(totalPayroll / 1000000).toFixed(1)}M
            </span>
            <span className="text-xs text-slate-400">COP</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1 flex items-center justify-between">
            <span>{pendingNovelties.length} novedades pendientes</span>
            <ArrowRight className="w-3 h-3 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition" />
          </p>
        </div>

        {/* SG-SST Cumplimiento (7 Estándares) */}
        <div
          onClick={() => onNavigate('sst')}
          className="bg-slate-900/90 border border-slate-800 hover:border-orange-500/50 p-4 rounded-xl transition cursor-pointer group shadow-sm"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">SG-SST (Res. 0312)</span>
            <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">{sstCompliance}%</span>
            <span className="text-xs text-amber-400 font-medium">6/7 Estándares</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1 flex items-center justify-between">
            <span>0 Días Perdidos por AT</span>
            <ArrowRight className="w-3 h-3 text-slate-500 group-hover:text-orange-400 group-hover:translate-x-1 transition" />
          </p>
        </div>

        {/* Clima Organizacional */}
        <div
          onClick={() => onNavigate('clima')}
          className="bg-slate-900/90 border border-slate-800 hover:border-teal-500/50 p-4 rounded-xl transition cursor-pointer group shadow-sm"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Clima Organizacional</span>
            <div className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Smile className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">{climate.overallScore}%</span>
            <span className="text-xs text-emerald-400 font-medium">Satisfactorio</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1 flex items-center justify-between">
            <span>100% Participación Q3</span>
            <ArrowRight className="w-3 h-3 text-slate-500 group-hover:text-teal-400 group-hover:translate-x-1 transition" />
          </p>
        </div>
      </div>

      {/* Two Columns: Actionable Attention Items & Module Shortcuts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Alerts & Critical Attention for Colombian Microenterprise (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>Atención Prioritaria y Vencimientos Legales</span>
              </h2>
              <span className="text-[11px] text-slate-400">Filtro en tiempo real</span>
            </div>

            <div className="space-y-3">
              {/* Document Alert */}
              {pendingDocs.length > 0 ? (
                <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg flex items-start gap-3">
                  <div className="p-1.5 bg-amber-500/20 text-amber-300 rounded shrink-0">
                    <FileCheck className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs font-semibold text-amber-200">
                      Exámenes Médicos Ocupacionales o Documentos por Renovar
                    </h3>
                    <p className="text-[11px] text-slate-300 mt-0.5">
                      {pendingDocs[0].employeeName}: {pendingDocs[0].name} (Vence:{' '}
                      {pendingDocs[0].expiryDate || 'Próximamente'}). Obligatorio por Decreto 1072.
                    </p>
                  </div>
                  <button
                    onClick={() => onNavigate('documentos')}
                    className="px-2.5 py-1 text-xs bg-amber-600/30 hover:bg-amber-600/50 text-amber-200 rounded font-medium shrink-0 transition"
                  >
                    Ver Documentos
                  </button>
                </div>
              ) : null}

              {/* Payroll Novelties Pending */}
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-start gap-3">
                <div className="p-1.5 bg-emerald-500/20 text-emerald-300 rounded shrink-0">
                  <DollarSign className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xs font-semibold text-emerald-200">
                    Novedades de Nómina de la Quincena Actual
                  </h3>
                  <p className="text-[11px] text-slate-300 mt-0.5">
                    Hay {novelties.length} novedades ingresadas ({novelties.filter(n => n.type.includes('HORA_EXTRA')).length} horas extras y recargos liquidados según CST Art. 168).
                  </p>
                </div>
                <button
                  onClick={() => onNavigate('novedades')}
                  className="px-2.5 py-1 text-xs bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-200 rounded font-medium shrink-0 transition"
                >
                  Liquidar
                </button>
              </div>

              {/* Upcoming Training */}
              {trainings.length > 0 && (
                <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-lg flex items-start gap-3">
                  <div className="p-1.5 bg-indigo-500/20 text-indigo-300 rounded shrink-0">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs font-semibold text-indigo-200">
                      Próxima Capacitación Obligatoria SG-SST
                    </h3>
                    <p className="text-[11px] text-slate-300 mt-0.5">
                      {trainings[0].title} — Fecha: {trainings[0].scheduledDate} ({trainings[0].durationHours} horas).
                    </p>
                  </div>
                  <button
                    onClick={() => onNavigate('capacitacion')}
                    className="px-2.5 py-1 text-xs bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 rounded font-medium shrink-0 transition"
                  >
                    Ver Plan
                  </button>
                </div>
              )}

              {/* Wellness & Family Day */}
              {wellness.length > 0 && (
                <div className="p-3 bg-pink-500/10 border border-pink-500/20 rounded-lg flex items-start gap-3">
                  <div className="p-1.5 bg-pink-500/20 text-pink-300 rounded shrink-0">
                    <Smile className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs font-semibold text-pink-200">
                      Bienestar Laboral: {wellness[0].title}
                    </h3>
                    <p className="text-[11px] text-slate-300 mt-0.5">
                      Fecha programada: {wellness[0].date}. Presupuesto ejecutado: ${wellness[0].budgetSpent.toLocaleString('es-CO')} COP.
                    </p>
                  </div>
                  <button
                    onClick={() => onNavigate('bienestar')}
                    className="px-2.5 py-1 text-xs bg-pink-600/30 hover:bg-pink-600/50 text-pink-200 rounded font-medium shrink-0 transition"
                  >
                    Ver Actividades
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Quick Roster Overview */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-white">Equipo de Trabajo (Muestra Rápida)</h2>
              <button
                onClick={() => onNavigate('personal')}
                className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-medium"
              >
                <span>Ver los {employees.length} colaboradores</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="divide-y divide-slate-800/80">
              {employees.slice(0, 4).map((emp) => (
                <div key={emp.id} className="py-2.5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-slate-300 text-xs">
                      {emp.firstName[0]}
                      {emp.lastName[0]}
                    </div>
                    <div>
                      <div className="font-medium text-slate-200">
                        {emp.firstName} {emp.lastName}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {emp.position} • {emp.department}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-slate-300 font-medium">
                      ${emp.baseSalary.toLocaleString('es-CO')}
                    </span>
                    <div className="text-[10px] text-emerald-400 font-medium">
                      {emp.contractType}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Quick Module Directory & Colombian Framework Overview (1 Col) */}
        <div className="space-y-4">
          {/* Colombian Framework Card */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-xl p-5 shadow-sm">
            <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-400" />
              <span>Cumplimiento Normativo Colombia</span>
            </h2>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-200">Ley 2101 de 2021:</span>
                  <p className="text-[11px] text-slate-400">Jornada máxima legal de 46 horas/semana (divisor 230 horas/mes para cálculo de horas extras).</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-200">Resolución 0312 de 2019:</span>
                  <p className="text-[11px] text-slate-400">Microempresa (≤ 10 trab., Riesgo I-II): Aplica los 7 estándares mínimos y Vigía de SST.</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-200">Ley 1857 de 2017:</span>
                  <p className="text-[11px] text-slate-400">Jornada semestral para compartir con el núcleo familiar (Día de la Familia).</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-200">Art. 230 CST (Dotación):</span>
                  <p className="text-[11px] text-slate-400">Entrega de calzado y vestido de labor a quienes ganen hasta 2 SMMLV con &gt;3 meses.</p>
                </div>
              </li>
            </ul>

            <div className="mt-4 pt-3 border-t border-slate-800">
              <button
                onClick={() => onNavigate('arquitectura')}
                className="w-full py-2 px-3 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition"
              >
                <span>Ver Diseño Conceptual & MER</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick Access to the 9 Modules */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm">
            <h2 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Acceso Rápido a Procesos
            </h2>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => onNavigate('personal')}
                className="p-2.5 bg-slate-800/70 hover:bg-slate-800 rounded-lg text-left transition border border-slate-700/50"
              >
                <div className="text-blue-400 font-medium">1. Personal</div>
                <div className="text-[10px] text-slate-400">8 empleados</div>
              </button>
              <button
                onClick={() => onNavigate('documentos')}
                className="p-2.5 bg-slate-800/70 hover:bg-slate-800 rounded-lg text-left transition border border-slate-700/50"
              >
                <div className="text-amber-400 font-medium">2. Documentos</div>
                <div className="text-[10px] text-slate-400">{documents.length} archivos</div>
              </button>
              <button
                onClick={() => onNavigate('familia')}
                className="p-2.5 bg-slate-800/70 hover:bg-slate-800 rounded-lg text-left transition border border-slate-700/50"
              >
                <div className="text-rose-400 font-medium">3. Familia</div>
                <div className="text-[10px] text-slate-400">Beneficiarios CCF</div>
              </button>
              <button
                onClick={() => onNavigate('novedades')}
                className="p-2.5 bg-slate-800/70 hover:bg-slate-800 rounded-lg text-left transition border border-slate-700/50"
              >
                <div className="text-emerald-400 font-medium">4. Nómina CST</div>
                <div className="text-[10px] text-slate-400">Liquidador horas</div>
              </button>
              <button
                onClick={() => onNavigate('capacitacion')}
                className="p-2.5 bg-slate-800/70 hover:bg-slate-800 rounded-lg text-left transition border border-slate-700/50"
              >
                <div className="text-indigo-400 font-medium">5. Capacitación</div>
                <div className="text-[10px] text-slate-400">Plan PIC anual</div>
              </button>
              <button
                onClick={() => onNavigate('reclutamiento')}
                className="p-2.5 bg-slate-800/70 hover:bg-slate-800 rounded-lg text-left transition border border-slate-700/50"
              >
                <div className="text-purple-400 font-medium">6. Reclutamiento</div>
                <div className="text-[10px] text-slate-400">Pipeline talento</div>
              </button>
              <button
                onClick={() => onNavigate('bienestar')}
                className="p-2.5 bg-slate-800/70 hover:bg-slate-800 rounded-lg text-left transition border border-slate-700/50"
              >
                <div className="text-pink-400 font-medium">7. Bienestar</div>
                <div className="text-[10px] text-slate-400">Pausas y fechas</div>
              </button>
              <button
                onClick={() => onNavigate('sst')}
                className="p-2.5 bg-slate-800/70 hover:bg-slate-800 rounded-lg text-left transition border border-slate-700/50"
              >
                <div className="text-orange-400 font-medium">8. SG-SST</div>
                <div className="text-[10px] text-slate-400">Vigía y riesgos</div>
              </button>
              <button
                onClick={() => onNavigate('clima')}
                className="col-span-2 p-2.5 bg-slate-800/70 hover:bg-slate-800 rounded-lg text-left transition border border-slate-700/50 flex justify-between items-center"
              >
                <div>
                  <div className="text-teal-400 font-medium">9. Clima Laboral</div>
                  <div className="text-[10px] text-slate-400">Medición de clima organizacional y planes</div>
                </div>
                <span className="text-xs font-bold text-teal-300 bg-teal-900/50 px-2 py-0.5 rounded">
                  88%
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
