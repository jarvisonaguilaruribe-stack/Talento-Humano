/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  DollarSign,
  Plus,
  Calculator,
  Calendar,
  CheckCircle2,
  Clock,
  FileSpreadsheet,
  AlertCircle,
  Trash2,
  HelpCircle,
  TrendingUp,
  Download,
} from 'lucide-react';
import { Employee, PayrollNovelty } from '../../types';
import {
  calculateNoveltyAmount,
  calculateHourlyRate,
  NoveltyType,
  NOVELTY_FACTORS,
  HORAS_MES_ESTANDAR_LEY_2101,
} from '../../utils/colombiaHrRules';

interface NovedadesModuleProps {
  novelties: PayrollNovelty[];
  employees: Employee[];
  onAddNovelty: (novelty: PayrollNovelty) => void;
  onUpdateNoveltyStatus: (id: string, status: PayrollNovelty['status']) => void;
  onDeleteNovelty: (id: string) => void;
  searchTerm: string;
}

export const NovedadesModule: React.FC<NovedadesModuleProps> = ({
  novelties,
  employees,
  onAddNovelty,
  onUpdateNoveltyStatus,
  onDeleteNovelty,
  searchTerm,
}) => {
  const [periodFilter, setPeriodFilter] = useState('TODOS');
  const [typeFilter, setTypeFilter] = useState('TODOS');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Novelty Form State
  const [selectedEmpId, setSelectedEmpId] = useState(employees[0]?.id || '');
  const [noveltyType, setNoveltyType] = useState<NoveltyType>('HORA_EXTRA_DIURNA');
  const [quantity, setQuantity] = useState<number>(2);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [period, setPeriod] = useState('Octubre 2026 - Q2');
  const [notes, setNotes] = useState('');

  const selectedEmployee = employees.find((e) => e.id === selectedEmpId) || employees[0];

  // Live calculation for preview inside modal
  const liveCalculation = selectedEmployee
    ? calculateNoveltyAmount(noveltyType, quantity, selectedEmployee.baseSalary)
    : { amount: 0, unitRate: 0, description: '', payer: 'EMPRESA' as const };

  const filteredNovelties = novelties.filter((nov) => {
    const matchesSearch =
      `${nov.employeeName} ${nov.notes} ${nov.type} ${nov.period}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    const matchesPeriod = periodFilter === 'TODOS' || nov.period === periodFilter;
    const matchesType = typeFilter === 'TODOS' || nov.type === typeFilter;
    return matchesSearch && matchesPeriod && matchesType;
  });

  const totalAmount = filteredNovelties.reduce((sum, n) => sum + n.calculatedAmount, 0);
  const companyPayableAmount = filteredNovelties
    .filter((n) => n.payer === 'EMPRESA')
    .reduce((sum, n) => sum + n.calculatedAmount, 0);
  const epsOrArlAmount = filteredNovelties
    .filter((n) => n.payer === 'EPS' || n.payer === 'ARL')
    .reduce((sum, n) => sum + n.calculatedAmount, 0);

  const handleOpenAdd = () => {
    setSelectedEmpId(employees[0]?.id || '');
    setNoveltyType('HORA_EXTRA_DIURNA');
    setQuantity(2);
    setNotes('');
    setIsModalOpen(true);
  };

  const handleCreateNovelty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEmployee || quantity <= 0) return;

    const calc = calculateNoveltyAmount(
      noveltyType,
      quantity,
      selectedEmployee.baseSalary,
      HORAS_MES_ESTANDAR_LEY_2101
    );

    const newNov: PayrollNovelty = {
      id: `nov-${Date.now()}`,
      employeeId: selectedEmployee.id,
      employeeName: `${selectedEmployee.firstName} ${selectedEmployee.lastName}`,
      period,
      date,
      type: noveltyType,
      quantity,
      unitRate: calc.unitRate,
      calculatedAmount: calc.amount,
      notes: notes || calc.description,
      status: 'APROBADA',
      payer: calc.payer,
    };

    onAddNovelty(newNov);
    setIsModalOpen(false);
  };

  const noveltyLabels: Record<string, string> = {
    HORA_EXTRA_DIURNA: 'Hora Extra Diurna (+25%)',
    HORA_EXTRA_NOCTURNA: 'Hora Extra Nocturna (+75%)',
    HORA_EXTRA_FESTIVA_DIURNA: 'Hora Extra Festiva Diurna (+100%)',
    HORA_EXTRA_FESTIVA_NOCTURNA: 'Hora Extra Festiva Nocturna (+150%)',
    RECARGO_NOCTURNO: 'Recargo Nocturno Ordinario (+35%)',
    RECARGO_DOMINICAL_FESTIVO: 'Recargo Dominical/Festivo (+75%)',
    INCAPACIDAD_GENERAL: 'Incapacidad Médica General (EPS/Empresa)',
    INCAPACIDAD_LABORAL: 'Incapacidad Accidente Laboral (100% ARL)',
    LICENCIA_MATERNIDAD_PATERNIDAD: 'Licencia Maternidad / Paternidad',
    LICENCIA_NO_REMUNERADA: 'Licencia No Remunerada',
    VACACIONES: 'Vacaciones Remuneradas',
    BONIFICACION: 'Bonificación Extraordinaria',
    OTRA_DEDUCCION: 'Deducción de Nómina',
  };

  return (
    <div className="space-y-5">
      {/* Module Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900 p-4 rounded-xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
              <DollarSign className="w-5 h-5" />
            </div>
            <h1 className="text-base font-bold text-white">
              Módulo 4: Novedades de Nómina (CST Colombia)
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Ingreso, procesamiento y liquidación de horas extras, recargos nocturnos/festivos,
            incapacidades y licencias conforme a la Ley 2101 de 2021 (divisor 230 horas) y el Código Sustantivo del Trabajo.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              alert('Consolidado de novedades generado para Nómina Electrónica / Contabilidad (formato estándar DIAN).');
            }}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Exportar para Contabilidad</span>
          </button>
          <button
            onClick={handleOpenAdd}
            className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center gap-2 transition shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Ingresar Novedad</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl">
          <div className="flex justify-between items-center text-slate-400 mb-1">
            <span>Total Liquidado Novedades</span>
            <Calculator className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-xl font-bold font-mono text-emerald-400">
            ${totalAmount.toLocaleString('es-CO')} COP
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            {filteredNovelties.length} eventos procesados en el periodo
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl">
          <div className="flex justify-between items-center text-slate-400 mb-1">
            <span>Asumido por la Microempresa</span>
            <DollarSign className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-xl font-bold font-mono text-white">
            ${companyPayableAmount.toLocaleString('es-CO')} COP
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            Horas extras, recargos y bonificaciones
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl">
          <div className="flex justify-between items-center text-slate-400 mb-1">
            <span>Recobro EPS / ARL</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-xl font-bold font-mono text-amber-300">
            ${epsOrArlAmount.toLocaleString('es-CO')} COP
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            Incapacidades y licencias legalmente cubiertas
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-3 bg-slate-900/60 p-3 rounded-lg border border-slate-800 text-xs">
        <div className="flex items-center gap-1">
          <span className="text-slate-400">Periodo:</span>
          <select
            value={periodFilter}
            onChange={(e) => setPeriodFilter(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-slate-200 rounded px-2 py-1"
          >
            <option value="TODOS">Todos los periodos</option>
            <option value="Octubre 2026 - Q2">Octubre 2026 - Q2</option>
            <option value="Octubre 2026 - Q1">Octubre 2026 - Q1</option>
            <option value="Octubre 2026 - Mensual">Octubre 2026 - Mensual</option>
          </select>
        </div>

        <div className="flex items-center gap-1">
          <span className="text-slate-400">Tipo:</span>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-slate-200 rounded px-2 py-1"
          >
            <option value="TODOS">Todos los conceptos</option>
            {Object.entries(noveltyLabels).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Novelties Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/60 text-slate-400 border-b border-slate-800 text-[11px] uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3 font-semibold">Colaborador</th>
                <th className="px-4 py-3 font-semibold">Concepto Laboral</th>
                <th className="px-4 py-3 font-semibold">Cantidad / Tarifa Unit.</th>
                <th className="px-4 py-3 font-semibold">Monto Liquidado</th>
                <th className="px-4 py-3 font-semibold">Asume</th>
                <th className="px-4 py-3 font-semibold">Estado</th>
                <th className="px-4 py-3 font-semibold text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200">
              {filteredNovelties.map((nov) => (
                <tr key={nov.id} className="hover:bg-slate-850/60 transition">
                  <td className="px-4 py-3">
                    <div className="font-semibold text-slate-100">{nov.employeeName}</div>
                    <div className="text-[11px] text-slate-400">
                      {nov.period} • {nov.date}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-slate-200">
                      {noveltyLabels[nov.type] || nov.type}
                    </div>
                    <div className="text-[11px] text-slate-400 max-w-xs truncate">
                      {nov.notes}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-mono text-slate-200">
                      {nov.type === 'BONIFICACION' || nov.type === 'OTRA_DEDUCCION'
                        ? 'Valor Fijo'
                        : nov.type.includes('INCAPACIDAD') || nov.type === 'VACACIONES'
                        ? `${nov.quantity} días`
                        : `${nov.quantity} hrs`}
                    </div>
                    {nov.type !== 'BONIFICACION' && nov.type !== 'OTRA_DEDUCCION' && (
                      <div className="text-[11px] text-slate-400 font-mono">
                        @ ${nov.unitRate.toLocaleString('es-CO')}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 font-bold font-mono text-emerald-400">
                    ${nov.calculatedAmount.toLocaleString('es-CO')} COP
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        nov.payer === 'EMPRESA'
                          ? 'bg-blue-500/10 text-blue-300 border border-blue-500/20'
                          : nov.payer === 'ARL'
                          ? 'bg-orange-500/10 text-orange-300 border border-orange-500/20'
                          : 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                      }`}
                    >
                      {nov.payer}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={nov.status}
                      onChange={(e) =>
                        onUpdateNoveltyStatus(nov.id, e.target.value as PayrollNovelty['status'])
                      }
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded border focus:outline-none ${
                        nov.status === 'LIQUIDADA'
                          ? 'bg-emerald-950/40 border-emerald-700/50 text-emerald-300'
                          : nov.status === 'APROBADA'
                          ? 'bg-blue-950/40 border-blue-700/50 text-blue-300'
                          : 'bg-amber-950/40 border-amber-700/50 text-amber-300'
                      }`}
                    >
                      <option value="PENDIENTE">PENDIENTE</option>
                      <option value="APROBADA">APROBADA</option>
                      <option value="LIQUIDADA">LIQUIDADA</option>
                    </select>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => {
                        if (confirm(`¿Eliminar novedad de ${nov.employeeName}?`)) {
                          onDeleteNovelty(nov.id);
                        }
                      }}
                      className="p-1.5 text-slate-400 hover:text-rose-400 transition"
                      title="Eliminar"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredNovelties.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-slate-400">
                    No hay novedades registradas con estos filtros.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add Novelty with Live Colombian Labor Calculator */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-lg p-5 text-xs shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Calculator className="w-4 h-4 text-emerald-400" />
                <span>Ingreso y Liquidación Automática de Novedad CST</span>
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateNovelty} className="space-y-3.5">
              <div>
                <label className="block text-slate-300 mb-1">Colaborador Titular *</label>
                <select
                  required
                  value={selectedEmpId}
                  onChange={(e) => setSelectedEmpId(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-100"
                >
                  {employees.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.firstName} {e.lastName} — Salario: ${e.baseSalary.toLocaleString('es-CO')}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Concepto de Novedad Laboral *</label>
                <select
                  value={noveltyType}
                  onChange={(e) => setNoveltyType(e.target.value as NoveltyType)}
                  className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-100"
                >
                  {Object.entries(noveltyLabels).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">
                    {noveltyType.includes('INCAPACIDAD') || noveltyType === 'VACACIONES'
                      ? 'Número de Días'
                      : noveltyType === 'BONIFICACION' || noveltyType === 'OTRA_DEDUCCION'
                      ? 'Valor Total COP'
                      : 'Número de Horas'}{' '}
                    *
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-100 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Fecha de la Novedad</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Periodo de Nómina</label>
                <input
                  type="text"
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                  placeholder="Ej. Octubre 2026 - Q2"
                  className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-100"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Motivo / Soporte</label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ej. Despliegue de software nocturno, incapacidad EPS Sanitas #8491..."
                  className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-100"
                />
              </div>

              {/* Live CST Calculation Card */}
              <div className="p-3 bg-emerald-950/40 border border-emerald-700/50 rounded-lg space-y-1.5">
                <div className="flex items-center justify-between text-[11px] text-emerald-300 font-medium">
                  <span>Liquidación Automática (Ley 2101 / CST):</span>
                  <span>Divisor Legal: 230 hrs</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-slate-300 text-xs">Valor Total a Liquidar:</span>
                  <span className="text-base font-bold font-mono text-emerald-400">
                    ${liveCalculation.amount.toLocaleString('es-CO')} COP
                  </span>
                </div>
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Tarifa unitaria calculada: ${liveCalculation.unitRate.toLocaleString('es-CO')}</span>
                  <span>Asume: <strong>{liveCalculation.payer}</strong></span>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-medium"
                >
                  Registrar Novedad
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
