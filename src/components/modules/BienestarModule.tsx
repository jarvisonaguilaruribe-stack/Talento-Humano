/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Smile,
  Plus,
  Calendar,
  Gift,
  Heart,
  Award,
  DollarSign,
  Users,
  CheckCircle2,
  Trash2,
  Sparkles,
} from 'lucide-react';
import { WellnessActivity, Employee } from '../../types';

interface BienestarModuleProps {
  wellness: WellnessActivity[];
  employees: Employee[];
  onAddActivity: (act: WellnessActivity) => void;
  onDeleteActivity: (id: string) => void;
  searchTerm: string;
}

export const BienestarModule: React.FC<BienestarModuleProps> = ({
  wellness,
  employees,
  onAddActivity,
  onDeleteActivity,
  searchTerm,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Activity Form
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<WellnessActivity['category']>('CUMPLEANOS');
  const [date, setDate] = useState('2026-11-15');
  const [time, setTime] = useState('12:30 PM - 2:00 PM');
  const [budgetEstimated, setBudgetEstimated] = useState(300000);
  const [budgetSpent, setBudgetSpent] = useState(0);
  const [description, setDescription] = useState('');
  const [impactLevel, setImpactLevel] = useState<WellnessActivity['impactLevel']>('ALTO');

  const filteredActivities = wellness.filter((w) => {
    return (
      w.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      w.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      w.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const totalSpent = wellness.reduce((sum, w) => sum + w.budgetSpent, 0);
  const totalEstimated = wellness.reduce((sum, w) => sum + w.budgetEstimated, 0);

  const handleCreateActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    const newAct: WellnessActivity = {
      id: `well-${Date.now()}`,
      title,
      category,
      date,
      time,
      budgetEstimated,
      budgetSpent,
      attendeesCount: employees.length,
      description,
      status: 'PLANIFICADA',
      impactLevel,
    };

    onAddActivity(newAct);
    setIsModalOpen(false);
  };

  const categoryLabels: Record<string, string> = {
    CUMPLEANOS: 'Celebración de Cumpleaños',
    PAUSA_ACTIVA: 'Pausas Activas (ARL)',
    DIA_FAMILIA: 'Día de la Familia (Ley 1857)',
    INTEGRACION: 'Integración y Convivencia',
    SALUD_FISICA: 'Salud Física y Hábitos',
    RECONOCIMIENTO: 'Reconocimiento y Mérito',
  };

  return (
    <div className="space-y-5">
      {/* Module Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900 p-4 rounded-xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-pink-500/10 text-pink-400">
              <Smile className="w-5 h-5" />
            </div>
            <h1 className="text-base font-bold text-white">
              Módulo 7: Bienestar Laboral y Convivencia
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Programas de bienestar adaptados al presupuesto de una microempresa colombiana: Día de la Familia
            (Ley 1857 de 2017), pausas activas con la ARL, celebración de cumpleaños y reconocimientos.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-3.5 py-2 bg-pink-600 hover:bg-pink-500 text-white rounded-lg text-xs font-semibold flex items-center gap-2 transition self-start sm:self-auto shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Programar Actividad</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl flex items-center gap-3">
          <div className="p-2.5 bg-pink-500/10 text-pink-400 rounded-lg">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400">Actividades en Calendario</div>
            <div className="text-base font-bold text-white">{wellness.length} eventos</div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl flex items-center gap-3">
          <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-lg">
            <DollarSign className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400">Presupuesto Ejecutado</div>
            <div className="text-base font-bold font-mono text-emerald-400">
              ${totalSpent.toLocaleString('es-CO')} COP
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl flex items-center gap-3">
          <div className="p-2.5 bg-purple-500/10 text-purple-400 rounded-lg">
            <Heart className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400">Cumplimiento Ley 1857</div>
            <div className="text-base font-bold text-purple-300">Día de la Familia Activo</div>
          </div>
        </div>
      </div>

      {/* Activities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredActivities.map((act) => (
          <div
            key={act.id}
            className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs space-y-3 shadow-sm hover:border-slate-700 transition"
          >
            <div className="flex items-start justify-between gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase bg-pink-500/10 text-pink-300 border border-pink-500/20">
                {categoryLabels[act.category] || act.category}
              </span>

              <button
                onClick={() => {
                  if (confirm(`¿Eliminar actividad ${act.title}?`)) {
                    onDeleteActivity(act.id);
                  }
                }}
                className="text-slate-500 hover:text-rose-400 p-1"
                title="Eliminar"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <h3 className="font-bold text-slate-100 text-sm leading-snug">{act.title}</h3>
            <p className="text-[11px] text-slate-300 leading-relaxed">{act.description}</p>

            <div className="p-2.5 bg-slate-950/60 rounded-lg border border-slate-800/80 space-y-1 text-[11px]">
              <div className="flex justify-between">
                <span className="text-slate-400">Fecha y Horario:</span>
                <span className="text-slate-200">
                  {act.date} ({act.time})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Presupuesto Estimado:</span>
                <span className="font-mono text-slate-200">
                  ${act.budgetEstimated.toLocaleString('es-CO')} COP
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Gasto Real:</span>
                <span className="font-mono text-emerald-400 font-semibold">
                  ${act.budgetSpent.toLocaleString('es-CO')} COP
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Participantes:</span>
                <span className="text-slate-200 font-medium">
                  {act.attendeesCount} colaboradores convocados
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-300 font-semibold">
                Estado: {act.status}
              </span>
              <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>Impacto {act.impactLevel}</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Add Activity */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-lg p-5 text-xs shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Smile className="w-4 h-4 text-pink-400" />
                <span>Programar Actividad de Bienestar Laboral</span>
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateActivity} className="space-y-3.5">
              <div>
                <label className="block text-slate-300 mb-1">Nombre de la Actividad *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ej. Taller de Manejo del Estrés y Pausa Activa con ARL"
                  className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Categoría *</label>
                  <select
                    value={category}
                    onChange={(e) =>
                      setCategory(e.target.value as WellnessActivity['category'])
                    }
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-100"
                  >
                    {Object.entries(categoryLabels).map(([key, label]) => (
                      <option key={key} value={key}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Nivel de Impacto Estimado</label>
                  <select
                    value={impactLevel}
                    onChange={(e) =>
                      setImpactLevel(e.target.value as WellnessActivity['impactLevel'])
                    }
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-100"
                  >
                    <option value="ALTO">Alto</option>
                    <option value="MEDIO">Medio</option>
                    <option value="MODERADO">Moderado</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Fecha Programada</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Horario</label>
                  <input
                    type="text"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    placeholder="12:30 PM - 2:00 PM"
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Presupuesto Estimado (COP)</label>
                  <input
                    type="number"
                    min="0"
                    step="50000"
                    value={budgetEstimated}
                    onChange={(e) => setBudgetEstimated(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-100 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Gasto Ejecutado (COP)</label>
                  <input
                    type="number"
                    min="0"
                    step="10000"
                    value={budgetSpent}
                    onChange={(e) => setBudgetSpent(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-100 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Descripción y Detalles Lúdicos</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detalles de la integración, refrigerio o actividad..."
                  className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-100"
                />
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
                  className="px-4 py-1.5 bg-pink-600 hover:bg-pink-500 text-white rounded font-medium"
                >
                  Guardar Actividad
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
