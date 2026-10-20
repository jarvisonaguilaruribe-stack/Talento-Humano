/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  GraduationCap,
  Plus,
  Calendar,
  Clock,
  CheckCircle2,
  Users,
  Award,
  BookOpen,
  Filter,
  Trash2,
  ExternalLink,
} from 'lucide-react';
import { TrainingPlan, Employee } from '../../types';

interface CapacitacionModuleProps {
  trainings: TrainingPlan[];
  employees: Employee[];
  onAddTraining: (training: TrainingPlan) => void;
  onDeleteTraining: (id: string) => void;
  searchTerm: string;
}

export const CapacitacionModule: React.FC<CapacitacionModuleProps> = ({
  trainings,
  employees,
  onAddTraining,
  onDeleteTraining,
  searchTerm,
}) => {
  const [topicFilter, setTopicFilter] = useState('TODOS');
  const [statusFilter, setStatusFilter] = useState('TODOS');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Training Form
  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState<TrainingPlan['topic']>('SST_OBLIGATORIA');
  const [facilitator, setFacilitator] = useState('');
  const [targetAudience, setTargetAudience] = useState('Todo el personal (8 colaboradores)');
  const [scheduledDate, setScheduledDate] = useState('2026-11-05');
  const [durationHours, setDurationHours] = useState(2);
  const [location, setLocation] = useState('Sala de Juntas & Google Meet');
  const [objectives, setObjectives] = useState('');

  const filteredTrainings = trainings.filter((t) => {
    const matchesSearch =
      `${t.title} ${t.facilitator} ${t.objectives}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    const matchesTopic = topicFilter === 'TODOS' || t.topic === topicFilter;
    const matchesStatus = statusFilter === 'TODOS' || t.status === statusFilter;
    return matchesSearch && matchesTopic && matchesStatus;
  });

  const totalHours = trainings.reduce((sum, t) => sum + t.durationHours, 0);
  const completedCount = trainings.filter((t) => t.status === 'COMPLETADA').length;

  const handleOpenAdd = () => {
    setTitle('');
    setTopic('SST_OBLIGATORIA');
    setFacilitator('ARL Positiva / Asesor Externo SST');
    setTargetAudience('Todo el personal');
    setScheduledDate('2026-11-05');
    setDurationHours(2);
    setLocation('Virtual / Presencial');
    setObjectives('');
    setIsModalOpen(true);
  };

  const handleCreateTraining = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !facilitator) return;

    const newTrn: TrainingPlan = {
      id: `trn-${Date.now()}`,
      title,
      topic,
      facilitator,
      targetAudience,
      scheduledDate,
      durationHours,
      status: 'PROGRAMADA',
      location,
      objectives,
      attendeesCount: 0,
      totalTargetEmployees: employees.length,
    };

    onAddTraining(newTrn);
    setIsModalOpen(false);
  };

  const topicLabels: Record<string, string> = {
    SST_OBLIGATORIA: 'SST Obligatoria (Res. 0312)',
    HABILIDADES_TECNICAS: 'Habilidades Técnicas',
    HABILIDADES_BLANDAS: 'Habilidades Blandas',
    SEGURIDAD_INFORMACION: 'Seguridad de la Información',
    CALIDAD_PROCESOS: 'Calidad y Procesos',
  };

  return (
    <div className="space-y-5">
      {/* Module Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900 p-4 rounded-xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h1 className="text-base font-bold text-white">
              Módulo 5: Capacitación y Formación (Plan PIC)
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Gestión del Plan Institucional de Capacitaciones: cumplimiento del Estándar 1.2.1 de la Resolución 0312 de 2019,
            talleres técnicos y desarrollo continuo de habilidades para el equipo.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center gap-2 transition self-start sm:self-auto shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Programar Capacitación</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl flex items-center gap-3">
          <div className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-lg">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400">Sesiones del Plan Anual</div>
            <div className="text-base font-bold text-white">{trainings.length} programadas</div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl flex items-center gap-3">
          <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-lg">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400">Completadas con Éxito</div>
            <div className="text-base font-bold text-emerald-400">{completedCount} sesiones</div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl flex items-center gap-3">
          <div className="p-2.5 bg-blue-500/10 text-blue-400 rounded-lg">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400">Horas Totales de Formación</div>
            <div className="text-base font-bold text-blue-400">{totalHours} horas acumuladas</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 bg-slate-900/60 p-3 rounded-lg border border-slate-800 text-xs">
        <div className="flex items-center gap-1">
          <span className="text-slate-400">Tema:</span>
          <select
            value={topicFilter}
            onChange={(e) => setTopicFilter(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-slate-200 rounded px-2 py-1"
          >
            <option value="TODOS">Todos los temas</option>
            {Object.entries(topicLabels).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-1">
          <span className="text-slate-400">Estado:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-slate-200 rounded px-2 py-1"
          >
            <option value="TODOS">Todos</option>
            <option value="PROGRAMADA">Programada</option>
            <option value="EN_CURSO">En Curso</option>
            <option value="COMPLETADA">Completada</option>
          </select>
        </div>
      </div>

      {/* Grid of Trainings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTrainings.map((trn) => (
          <div
            key={trn.id}
            className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs space-y-3 shadow-sm hover:border-slate-700 transition"
          >
            <div className="flex items-start justify-between gap-2">
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                  trn.topic === 'SST_OBLIGATORIA'
                    ? 'bg-orange-500/10 text-orange-300 border border-orange-500/20'
                    : 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/20'
                }`}
              >
                {topicLabels[trn.topic] || trn.topic}
              </span>

              <button
                onClick={() => {
                  if (confirm(`¿Eliminar capacitación ${trn.title}?`)) {
                    onDeleteTraining(trn.id);
                  }
                }}
                className="text-slate-500 hover:text-rose-400 p-1"
                title="Eliminar"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <h3 className="font-bold text-slate-100 text-sm leading-snug">{trn.title}</h3>
            <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
              {trn.objectives}
            </p>

            <div className="p-2.5 bg-slate-950/60 rounded-lg border border-slate-800/80 space-y-1.5 text-[11px]">
              <div className="flex justify-between">
                <span className="text-slate-400">Facilitador:</span>
                <span className="font-medium text-slate-200">{trn.facilitator}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Fecha y Hora:</span>
                <span className="text-slate-200">
                  {trn.scheduledDate} ({trn.durationHours} hrs)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Lugar / Medio:</span>
                <span className="text-slate-200 truncate max-w-[140px]">{trn.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Asistencia:</span>
                <span className="font-semibold text-emerald-400">
                  {trn.attendeesCount} / {trn.totalTargetEmployees} colaboradores
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                  trn.status === 'COMPLETADA'
                    ? 'bg-emerald-500/20 text-emerald-300'
                    : 'bg-amber-500/20 text-amber-300'
                }`}
              >
                {trn.status}
              </span>

              {trn.effectivenessScore && (
                <span className="text-[11px] font-semibold text-emerald-300 flex items-center gap-1">
                  <Award className="w-3.5 h-3.5" />
                  <span>Eficacia: {trn.effectivenessScore}%</span>
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal Add Training */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-lg p-5 text-xs shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-indigo-400" />
                <span>Programar Nueva Capacitación (Plan PIC)</span>
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateTraining} className="space-y-3.5">
              <div>
                <label className="block text-slate-300 mb-1">Título de la Capacitación *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ej. Taller de Primeros Auxilios y Evacuación de Emergencias"
                  className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Eje Temático *</label>
                  <select
                    value={topic}
                    onChange={(e) => setTopic(e.target.value as TrainingPlan['topic'])}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-100"
                  >
                    {Object.entries(topicLabels).map(([key, label]) => (
                      <option key={key} value={key}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Facilitador / Entidad *</label>
                  <input
                    type="text"
                    required
                    value={facilitator}
                    onChange={(e) => setFacilitator(e.target.value)}
                    placeholder="ARL Positiva, SURA, Sena..."
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Fecha</label>
                  <input
                    type="date"
                    required
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Duración (Horas)</label>
                  <input
                    type="number"
                    min="1"
                    max="40"
                    value={durationHours}
                    onChange={(e) => setDurationHours(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-100 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Lugar</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Google Meet / Sede"
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Objetivos de la Sesión</label>
                <textarea
                  rows={2}
                  value={objectives}
                  onChange={(e) => setObjectives(e.target.value)}
                  placeholder="Detallar competencias o cumplimiento legal a alcanzar..."
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
                  className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded font-medium"
                >
                  Guardar en el Plan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
