/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Smile,
  AlertTriangle,
  CheckCircle2,
  Plus,
  Send,
  Users,
  Award,
  Clock,
  Sparkles,
  HelpCircle,
} from 'lucide-react';
import { ClimateSurvey } from '../../types';

interface ClimaModuleProps {
  climate: ClimateSurvey;
  onAddActionPlan: (plan: {
    id: string;
    action: string;
    dimension: string;
    responsible: string;
    deadline: string;
    status: 'PENDIENTE' | 'EN_CURSO' | 'FINALIZADO';
  }) => void;
  onUpdateActionStatus: (
    id: string,
    status: 'PENDIENTE' | 'EN_CURSO' | 'FINALIZADO'
  ) => void;
  searchTerm: string;
}

export const ClimaModule: React.FC<ClimaModuleProps> = ({
  climate,
  onAddActionPlan,
  onUpdateActionStatus,
  searchTerm,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSurveyModalOpen, setIsSurveyModalOpen] = useState(false);

  // New Action Form
  const [actionTitle, setActionTitle] = useState('');
  const [dimension, setDimension] = useState(climate.dimensions[0]?.name || '');
  const [responsible, setResponsible] = useState('Diana Mendoza (Gestión Humana)');
  const [deadline, setDeadline] = useState('2026-11-30');

  // Interactive quick feedback simulator
  const [surveyAnswers, setSurveyAnswers] = useState<Record<number, number>>({
    0: 5,
    1: 5,
    2: 4,
    3: 4,
    4: 5,
  });
  const [surveySubmitted, setSurveySubmitted] = useState(false);

  const handleCreatePlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!actionTitle) return;

    onAddActionPlan({
      id: `act-${Date.now()}`,
      action: actionTitle,
      dimension,
      responsible,
      deadline,
      status: 'EN_CURSO',
    });

    setActionTitle('');
    setIsModalOpen(false);
  };

  const handleSurveySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSurveySubmitted(true);
    setTimeout(() => {
      setSurveySubmitted(false);
      setIsSurveyModalOpen(false);
    }, 1800);
  };

  return (
    <div className="space-y-5">
      {/* Module Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900 p-4 rounded-xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-teal-500/10 text-teal-400">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h1 className="text-base font-bold text-white">
              Módulo 9: Medición del Clima Organizacional
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Diagnóstico cuantitativo del ambiente laboral, compromiso de los colaboradores, semáforo por
            dimensiones estratégicas y planes de mejora continua para microempresas.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsSurveyModalOpen(true)}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <Send className="w-3.5 h-3.5 text-teal-400" />
            <span>Simular Encuesta Rápida</span>
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-3 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-xs font-semibold flex items-center gap-2 transition shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Crear Plan de Acción</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
        <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl">
          <div className="flex justify-between items-center text-slate-400 mb-1">
            <span>Índice General de Clima</span>
            <Smile className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-teal-300">{climate.overallScore}%</div>
          <div className="text-[11px] text-emerald-400 mt-0.5 font-medium">Clasificación: Satisfactorio</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl">
          <div className="flex justify-between items-center text-slate-400 mb-1">
            <span>Tasa de Participación</span>
            <Users className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">{climate.participationRate}%</div>
          <div className="text-[11px] text-slate-400 mt-0.5">8 de 8 colaboradores respondieron</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl">
          <div className="flex justify-between items-center text-slate-400 mb-1">
            <span>Periodo de Medición</span>
            <Clock className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-base font-bold text-white">{climate.period}</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Medición trimestral cerrada</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl">
          <div className="flex justify-between items-center text-slate-400 mb-1">
            <span>Planes de Mejora Activos</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-400">
            {climate.actionPlans.filter((a) => a.status === 'EN_CURSO').length}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">En ejecución con responsables</div>
        </div>
      </div>

      {/* Main Grid: Dimensions Bars & Action Plans */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Dimension Bars (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-sm font-bold text-white">Resultados por Dimensiones del Clima</h2>
              <p className="text-[11px] text-slate-400">
                Puntaje obtenido vs Benchmark del sector tecnológico PYME (línea blanca)
              </p>
            </div>
            <div className="flex items-center gap-2 text-[10px]">
              <span className="flex items-center gap-1 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /> &gt;80% Óptimo
              </span>
              <span className="flex items-center gap-1 text-amber-400">
                <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" /> 70-79% Alerta
              </span>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            {climate.dimensions.map((dim, idx) => {
              const isAlert = dim.status === 'EN_ALERTA';
              return (
                <div key={idx} className="space-y-1.5 p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="font-semibold text-slate-100">{dim.name}</span>
                      <p className="text-[11px] text-slate-400 mt-0.5 italic">
                        "{dim.keyQuestion}"
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span
                        className={`font-mono font-bold text-sm ${
                          isAlert ? 'text-amber-400' : 'text-emerald-400'
                        }`}
                      >
                        {dim.score}%
                      </span>
                      <span className="text-[10px] text-slate-500 block">
                        Meta: {dim.benchmark}%
                      </span>
                    </div>
                  </div>

                  {/* Progress bar with benchmark indicator */}
                  <div className="relative w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        isAlert ? 'bg-amber-500' : 'bg-teal-500'
                      }`}
                      style={{ width: `${dim.score}%` }}
                    />
                    {/* Benchmark vertical pin */}
                    <div
                      className="absolute top-0 bottom-0 w-0.5 bg-white shadow-sm"
                      style={{ left: `${dim.benchmark}%` }}
                      title={`Benchmark: ${dim.benchmark}%`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Action Plans (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-teal-400" />
              <span>Planes de Acción y Compromisos</span>
            </h2>
            <span className="text-[10px] text-slate-400">
              {climate.actionPlans.length} planes
            </span>
          </div>

          <div className="space-y-3 text-xs">
            {climate.actionPlans.map((plan) => (
              <div
                key={plan.id}
                className="p-3 bg-slate-950/70 border border-slate-800 rounded-lg space-y-2"
              >
                <div className="flex justify-between items-start gap-2">
                  <span className="font-semibold text-slate-200 leading-snug">
                    {plan.action}
                  </span>
                </div>

                <div className="text-[11px] text-slate-400 space-y-0.5">
                  <div>
                    <span className="text-slate-500">Dimensión: </span>
                    <span className="text-teal-300 font-medium">{plan.dimension}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Responsable: </span>
                    <span className="text-slate-300">{plan.responsible}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Fecha Límite: </span>
                    <span className="text-slate-300">{plan.deadline}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-1 border-t border-slate-800/80">
                  <span className="text-[10px] text-slate-400">Estado de avance:</span>
                  <select
                    value={plan.status}
                    onChange={(e) =>
                      onUpdateActionStatus(
                        plan.id,
                        e.target.value as 'PENDIENTE' | 'EN_CURSO' | 'FINALIZADO'
                      )
                    }
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${
                      plan.status === 'FINALIZADO'
                        ? 'bg-emerald-950/40 text-emerald-300 border-emerald-700/50'
                        : 'bg-amber-950/40 text-amber-300 border-amber-700/50'
                    }`}
                  >
                    <option value="PENDIENTE">PENDIENTE</option>
                    <option value="EN_CURSO">EN CURSO</option>
                    <option value="FINALIZADO">FINALIZADO</option>
                  </select>
                </div>
              </div>
            ))}

            {climate.actionPlans.length === 0 && (
              <div className="p-6 text-center text-xs text-slate-400">
                No hay planes de acción registrados actualmente.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal Add Action Plan */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-lg p-5 text-xs shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-teal-400" />
                <span>Crear Plan de Acción de Clima Laboral</span>
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreatePlan} className="space-y-3.5">
              <div>
                <label className="block text-slate-300 mb-1">Acción o Iniciativa Concreta *</label>
                <textarea
                  rows={2}
                  required
                  value={actionTitle}
                  onChange={(e) => setActionTitle(e.target.value)}
                  placeholder="Ej. Taller de coaching para líderes en retroalimentación continua y reconocimiento..."
                  className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-100"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Dimensión a Impactar *</label>
                <select
                  value={dimension}
                  onChange={(e) => setDimension(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-100"
                >
                  {climate.dimensions.map((d, i) => (
                    <option key={i} value={d.name}>
                      {d.name} (Actual: {d.score}%)
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Líder Responsable</label>
                  <input
                    type="text"
                    value={responsible}
                    onChange={(e) => setResponsible(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Fecha Límite de Cumplimiento</label>
                  <input
                    type="date"
                    required
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-100"
                  />
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
                  className="px-4 py-1.5 bg-teal-600 hover:bg-teal-500 text-white rounded font-medium"
                >
                  Guardar Plan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Quick Survey Simulator */}
      {isSurveyModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-lg p-5 text-xs shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Send className="w-4 h-4 text-teal-400" />
                <span>Simulador de Encuesta Anónima de Clima</span>
              </h3>
              <button onClick={() => setIsSurveyModalOpen(false)} className="text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            {surveySubmitted ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="text-sm font-bold text-white">¡Respuesta Registrada con Éxito!</h4>
                <p className="text-slate-400 text-xs">
                  Tu retroalimentación anónima nutre el cálculo del índice de clima organizacional de la microempresa.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSurveySubmit} className="space-y-4">
                <p className="text-slate-300 text-xs">
                  Califica cada aspecto de 1 (Totalmente en desacuerdo) a 5 (Totalmente de acuerdo):
                </p>

                {climate.dimensions.map((dim, idx) => (
                  <div key={idx} className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
                    <span className="font-semibold text-slate-200 block text-xs">
                      {idx + 1}. {dim.name}
                    </span>
                    <p className="text-[11px] text-slate-400 italic mb-2">"{dim.keyQuestion}"</p>
                    <div className="flex items-center justify-between gap-1 pt-1">
                      {[1, 2, 3, 4, 5].map((val) => (
                        <label
                          key={val}
                          className={`flex-1 py-1 text-center rounded border text-xs cursor-pointer font-bold transition ${
                            surveyAnswers[idx] === val
                              ? 'bg-teal-600 border-teal-500 text-white'
                              : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750'
                          }`}
                        >
                          <input
                            type="radio"
                            name={`q_${idx}`}
                            value={val}
                            checked={surveyAnswers[idx] === val}
                            onChange={() =>
                              setSurveyAnswers({ ...surveyAnswers, [idx]: val })
                            }
                            className="sr-only"
                          />
                          {val}
                        </label>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsSurveyModalOpen(false)}
                    className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded font-medium"
                  >
                    Cerrar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-teal-600 hover:bg-teal-500 text-white rounded font-medium flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Enviar Respuesta</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
