/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  FileText,
  UserCheck,
  CheckCircle2,
  Clock,
  Plus,
  Trash2,
  FileSpreadsheet,
  AlertOctagon,
  HardHat,
  Award,
} from 'lucide-react';
import { SstStandard, SstIncident, SstDotacion, Employee } from '../../types';
import { checkDotacionEligibility, SMMLV_COLOMBIA_2026 } from '../../utils/colombiaHrRules';

interface SstModuleProps {
  standards: SstStandard[];
  incidents: SstIncident[];
  dotaciones: SstDotacion[];
  employees: Employee[];
  onAddIncident: (inc: SstIncident) => void;
  onAddDotacion: (dot: SstDotacion) => void;
  onDeleteIncident: (id: string) => void;
  searchTerm: string;
}

export const SstModule: React.FC<SstModuleProps> = ({
  standards,
  incidents,
  dotaciones,
  employees,
  onAddIncident,
  onAddDotacion,
  onDeleteIncident,
  searchTerm,
}) => {
  const [activeTab, setActiveTab] = useState<'estandares' | 'incidentes' | 'dotacion' | 'vigia'>('estandares');
  const [isIncidentModalOpen, setIsIncidentModalOpen] = useState(false);
  const [isDotacionModalOpen, setIsDotacionModalOpen] = useState(false);

  // New Incident Form
  const [incType, setIncType] = useState<SstIncident['type']>('INCIDENTE');
  const [incEmployeeId, setIncEmployeeId] = useState(employees[0]?.id || '');
  const [incDate, setIncDate] = useState(new Date().toISOString().split('T')[0]);
  const [incDesc, setIncDesc] = useState('');
  const [incSeverity, setIncSeverity] = useState<SstIncident['severity']>('LEVE');
  const [incDaysLost, setIncDaysLost] = useState(0);
  const [incCorrective, setIncCorrective] = useState('');
  const [incReportedArl, setIncReportedArl] = useState(false);
  const [incFurat, setIncFurat] = useState('');

  // New Dotacion Form
  const [dotEmpId, setDotEmpId] = useState(employees[0]?.id || '');
  const [dotPeriod, setDotPeriod] = useState<SstDotacion['period']>('Diciembre');
  const [dotShoes, setDotShoes] = useState(true);
  const [dotClothes, setDotClothes] = useState(true);
  const [dotNotes, setDotNotes] = useState('');

  const compliancePercentage = Math.round(
    (standards.filter((s) => s.status === 'CUMPLE').length / standards.length) * 100
  );

  const handleCreateIncident = (e: React.FormEvent) => {
    e.preventDefault();
    const emp = employees.find((e) => e.id === incEmployeeId);
    if (!incDesc) return;

    const newInc: SstIncident = {
      id: `inc-${Date.now()}`,
      date: incDate,
      type: incType,
      employeeId: emp?.id,
      employeeName: emp ? `${emp.firstName} ${emp.lastName}` : 'No aplica (Instalaciones)',
      description: incDesc,
      severity: incSeverity,
      daysLost: incDaysLost,
      correctiveActions: incCorrective || 'Acción correctiva en evaluación.',
      status: 'INVESTIGACION',
      reportedToArl: incReportedArl,
      furatNumber: incReportedArl ? incFurat || `FURAT-2026-${Math.floor(Math.random() * 9000 + 1000)}` : undefined,
    };

    onAddIncident(newInc);
    setIsIncidentModalOpen(false);
  };

  const handleCreateDotacion = (e: React.FormEvent) => {
    e.preventDefault();
    const emp = employees.find((e) => e.id === dotEmpId);
    if (!emp) return;

    const newDot: SstDotacion = {
      id: `dot-${Date.now()}`,
      employeeId: emp.id,
      employeeName: `${emp.firstName} ${emp.lastName}`,
      period: dotPeriod,
      year: 2026,
      deliveryDate: new Date().toISOString().split('T')[0],
      shoesDelivered: dotShoes,
      clothesDelivered: dotClothes,
      receivedSignature: true,
      notes: dotNotes || `Dotación legal entregada según CST Art. 230 periodo ${dotPeriod} 2026.`,
    };

    onAddDotacion(newDot);
    setIsDotacionModalOpen(false);
  };

  return (
    <div className="space-y-5">
      {/* Module Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900 p-4 rounded-xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-orange-500/10 text-orange-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h1 className="text-base font-bold text-white">
              Módulo 8: Seguridad y Salud en el Trabajo (SG-SST)
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Gestión de los 7 Estándares Mínimos obligatorios (Resolución 0312 de 2019 para microempresas),
            Vigía Ocupacional, investigación de incidentes/FURAT y dotación legal (CST Art. 230).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsDotacionModalOpen(true)}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <HardHat className="w-3.5 h-3.5 text-orange-400" />
            <span>Registrar Dotación</span>
          </button>
          <button
            onClick={() => setIsIncidentModalOpen(true)}
            className="px-3.5 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-lg text-xs font-semibold flex items-center gap-2 transition shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Reportar Incidente / Accidente</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
        <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl">
          <div className="flex justify-between items-center text-slate-400 mb-1">
            <span>Cumplimiento Res. 0312</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-xl font-bold font-mono text-emerald-400">{compliancePercentage}%</div>
          <div className="text-[11px] text-slate-400 mt-0.5">7 Estándares Mínimos evaluados</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl">
          <div className="flex justify-between items-center text-slate-400 mb-1">
            <span>Vigía de SST Elegido</span>
            <UserCheck className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-base font-bold text-white">Diana Mendoza</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Actas mensuales al día</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl">
          <div className="flex justify-between items-center text-slate-400 mb-1">
            <span>Días Perdidos por AT</span>
            <Clock className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-xl font-bold font-mono text-white">0 Días</div>
          <div className="text-[11px] text-emerald-400 mt-0.5">Cero accidentes incapacitantes</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl">
          <div className="flex justify-between items-center text-slate-400 mb-1">
            <span>Dotaciones Entregadas</span>
            <HardHat className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-xl font-bold font-mono text-amber-300">{dotaciones.length} entregas</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Firma de recibido archivada</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800 text-xs">
        <button
          onClick={() => setActiveTab('estandares')}
          className={`px-3 py-1.5 rounded-md font-medium transition ${
            activeTab === 'estandares'
              ? 'bg-orange-600 text-white shadow-sm'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          7 Estándares Mínimos (Res. 0312)
        </button>
        <button
          onClick={() => setActiveTab('incidentes')}
          className={`px-3 py-1.5 rounded-md font-medium transition ${
            activeTab === 'incidentes'
              ? 'bg-orange-600 text-white shadow-sm'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          Incidentes & Accidentes ({incidents.length})
        </button>
        <button
          onClick={() => setActiveTab('dotacion')}
          className={`px-3 py-1.5 rounded-md font-medium transition ${
            activeTab === 'dotacion'
              ? 'bg-orange-600 text-white shadow-sm'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          Dotación Legal (CST Art. 230)
        </button>
        <button
          onClick={() => setActiveTab('vigia')}
          className={`px-3 py-1.5 rounded-md font-medium transition ${
            activeTab === 'vigia'
              ? 'bg-orange-600 text-white shadow-sm'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          Vigía Ocupacional & Actas
        </button>
      </div>

      {/* Tab 1: 7 Estándares Mínimos */}
      {activeTab === 'estandares' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
          <div className="p-4 bg-slate-950/60 border-b border-slate-800 flex items-center justify-between text-xs">
            <div>
              <span className="font-bold text-white text-sm">
                Autoevaluación de Estándares Mínimos SG-SST
              </span>
              <p className="text-[11px] text-slate-400">
                Acreditación conforme a la Resolución 0312 de 2019 para microempresas de ≤ 10 trabajadores y riesgo I-II.
              </p>
            </div>
            <span className="bg-emerald-950/80 border border-emerald-700/50 text-emerald-300 px-2.5 py-1 rounded text-xs font-bold">
              6 Cumplidos / 1 En Proceso
            </span>
          </div>

          <div className="divide-y divide-slate-800 text-xs">
            {standards.map((std) => (
              <div key={std.id} className="p-4 hover:bg-slate-850/50 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-bold">
                      {std.code}
                    </span>
                    <span className="font-bold text-slate-100">{std.standardName}</span>
                    <span className="text-[10px] text-slate-400 font-medium">({std.category})</span>
                  </div>
                  <p className="text-[11px] text-slate-300">{std.evidenceSummary}</p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="w-24 bg-slate-800 rounded-full h-2 overflow-hidden hidden sm:block">
                    <div
                      className={`h-full ${std.status === 'CUMPLE' ? 'bg-emerald-500' : 'bg-amber-500'}`}
                      style={{ width: `${std.percentage}%` }}
                    />
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      std.status === 'CUMPLE'
                        ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                    }`}
                  >
                    {std.status} ({std.percentage}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Incidentes y Accidentes */}
      {activeTab === 'incidentes' && (
        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {incidents.map((inc) => (
              <div
                key={inc.id}
                className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs space-y-3 shadow-sm hover:border-slate-700 transition"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        inc.type === 'ACCIDENTE_TRABAJO'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {inc.type.replace('_', ' ')}
                    </span>
                    <span className="text-slate-400 font-mono text-[11px]">{inc.date}</span>
                  </div>

                  <button
                    onClick={() => {
                      if (confirm('¿Eliminar reporte de incidente?')) {
                        onDeleteIncident(inc.id);
                      }
                    }}
                    className="text-slate-500 hover:text-rose-400 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div>
                  <div className="font-semibold text-slate-200">
                    Involucrado: {inc.employeeName || 'Instalaciones / Locativo'}
                  </div>
                  <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                    {inc.description}
                  </p>
                </div>

                <div className="p-2.5 bg-slate-950/60 rounded-lg border border-slate-800 space-y-1 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Severidad:</span>
                    <span className="text-slate-200 font-medium">{inc.severity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Días Perdidos:</span>
                    <span className="text-slate-200 font-mono">{inc.daysLost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Reportado ARL:</span>
                    <span className={inc.reportedToArl ? 'text-emerald-400 font-medium' : 'text-slate-400'}>
                      {inc.reportedToArl ? `Sí (${inc.furatNumber || 'FURAT'})` : 'No (Incidente sin lesión)'}
                    </span>
                  </div>
                  <div className="pt-1 border-t border-slate-800 text-slate-300">
                    <span className="text-slate-400 block text-[10px]">Acciones Correctivas:</span>
                    <span>{inc.correctiveActions}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-1">
                  <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-300 font-semibold">
                    Estado: {inc.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Dotación Legal */}
      {activeTab === 'dotacion' && (
        <div className="space-y-4">
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl text-xs space-y-2">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <HardHat className="w-4 h-4 text-amber-400" />
              <span>Normativa Legal de Dotación (Código Sustantivo del Trabajo - Art. 230)</span>
            </h3>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              En Colombia, todo empleador que habitualmente ocupe uno o más trabajadores permanentes deberá
              suministrar cada 4 meses, en forma gratuita, un par de zapatos y un vestido de labor al trabajador
              cuya remuneración mensual sea <strong>hasta 2 SMMLV ($2.847.000 COP)</strong> y tenga más de 3 meses de servicio.
              Fechas de entrega legal: <strong>30 de abril, 31 de agosto y 20 de diciembre</strong>.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950/60 text-slate-400 border-b border-slate-800 text-[11px] uppercase tracking-wider">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Colaborador</th>
                    <th className="px-4 py-3 font-semibold">Periodo Legal</th>
                    <th className="px-4 py-3 font-semibold">Fecha de Entrega</th>
                    <th className="px-4 py-3 font-semibold">Prendas / Elementos</th>
                    <th className="px-4 py-3 font-semibold">Constancia de Firma</th>
                    <th className="px-4 py-3 font-semibold">Observaciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-200">
                  {dotaciones.map((dot) => (
                    <tr key={dot.id} className="hover:bg-slate-850/60 transition">
                      <td className="px-4 py-3 font-semibold text-slate-100">{dot.employeeName}</td>
                      <td className="px-4 py-3">
                        <span className="bg-slate-800 text-amber-300 px-2 py-0.5 rounded text-[10px] font-semibold">
                          {dot.period} {dot.year}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-300">{dot.deliveryDate}</td>
                      <td className="px-4 py-3 space-x-1">
                        {dot.shoesDelivered && (
                          <span className="bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded text-[10px]">
                            Calzado
                          </span>
                        )}
                        {dot.clothesDelivered && (
                          <span className="bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded text-[10px]">
                            Vestido de Labor
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-emerald-400 flex items-center gap-1 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Firmado</span>
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-400 text-[11px] max-w-xs truncate">
                        {dot.notes}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Vigía Ocupacional */}
      {activeTab === 'vigia' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center font-bold">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">Vigía de Seguridad y Salud en el Trabajo</h3>
                <p className="text-[11px] text-slate-400">Designado por votación conforme a Res. 0312 de 2019</p>
              </div>
            </div>

            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Titular Designada:</span>
                <span className="font-bold text-slate-100">Diana Patricia Mendoza Beltrán</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Cargo en la Empresa:</span>
                <span className="text-slate-200">Coordinadora de Talento y Administrativa</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Periodo de Elección:</span>
                <span className="text-slate-200">2025 - 2027 (2 años legales)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Curso Virtual 50 horas SST:</span>
                <span className="text-emerald-400 font-semibold">Certificado Vigente (MinTrabajo)</span>
              </div>
            </div>

            <div className="space-y-1.5 text-slate-300">
              <span className="font-semibold text-slate-200 block">Funciones Principales del Vigía:</span>
              <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-400">
                <li>Inspecciones periódicas de puestos de trabajo y ergonomía.</li>
                <li>Participar en la investigación de cualquier incidente laboral.</li>
                <li>Reunión mensual documentada con la Gerencia para revisar alertas.</li>
                <li>Coordinar las capacitaciones obligatorias de evacuación y primeros auxilios.</li>
              </ul>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <FileText className="w-4 h-4 text-orange-400" />
              <span>Actas de Reunión Mensual del Vigía</span>
            </h3>

            <div className="space-y-2.5">
              <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-slate-200">Acta #09 - Septiembre 2026</span>
                  <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                    Aprobada
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Revisión del simulacro distrital de evacuación y verificación del botiquín tipo A.
                </p>
              </div>

              <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-slate-200">Acta #08 - Agosto 2026</span>
                  <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                    Aprobada
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Entrega de dotación legal cuatrimestral y verificación de cableado en oficina.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Report Incident */}
      {isIncidentModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-lg p-5 text-xs shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-orange-400" />
                <span>Reportar Evento SST / Incidente</span>
              </h3>
              <button onClick={() => setIsIncidentModalOpen(false)} className="text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateIncident} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Tipo de Evento *</label>
                  <select
                    value={incType}
                    onChange={(e) => setIncType(e.target.value as SstIncident['type'])}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-100"
                  >
                    <option value="INCIDENTE">Incidente (Casi-accidente)</option>
                    <option value="ACCIDENTE_TRABAJO">Accidente de Trabajo (AT)</option>
                    <option value="ACTO_INSEGURO">Acto Inseguro</option>
                    <option value="CONDICION_INSEGURA">Condición Insegura</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Fecha del Evento</label>
                  <input
                    type="date"
                    required
                    value={incDate}
                    onChange={(e) => setIncDate(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Colaborador Involucrado</label>
                <select
                  value={incEmployeeId}
                  onChange={(e) => setIncEmployeeId(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-100"
                >
                  <option value="">No aplica / Falla Locativa General</option>
                  {employees.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.firstName} {e.lastName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Descripción del Suceso *</label>
                <textarea
                  rows={2}
                  required
                  value={incDesc}
                  onChange={(e) => setIncDesc(e.target.value)}
                  placeholder="Detallar qué ocurrió, lugar exacto y circunstancias..."
                  className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Severidad</label>
                  <select
                    value={incSeverity}
                    onChange={(e) => setIncSeverity(e.target.value as SstIncident['severity'])}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-100"
                  >
                    <option value="LEVE">Leve</option>
                    <option value="MODERADO">Moderado</option>
                    <option value="GRAVE">Grave</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Días de Incapacidad</label>
                  <input
                    type="number"
                    min="0"
                    value={incDaysLost}
                    onChange={(e) => setIncDaysLost(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-100 font-mono"
                  />
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={incReportedArl}
                    onChange={(e) => setIncReportedArl(e.target.checked)}
                    className="rounded text-orange-600 focus:ring-orange-500"
                  />
                  <span className="text-slate-200">
                    Reportado a la ARL (Dentro de los 2 días hábiles según Art. 62 Decreto 1295)
                  </span>
                </label>
                {incReportedArl && (
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-0.5">Radicado FURAT</label>
                    <input
                      type="text"
                      value={incFurat}
                      onChange={(e) => setIncFurat(e.target.value)}
                      placeholder="FURAT-2026-9812"
                      className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 text-slate-100 font-mono"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Plan de Acción Correctiva</label>
                <input
                  type="text"
                  value={incCorrective}
                  onChange={(e) => setIncCorrective(e.target.value)}
                  placeholder="Acción inmediata para evitar recurrencia..."
                  className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-100"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsIncidentModalOpen(false)}
                  className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-orange-600 hover:bg-orange-500 text-white rounded font-medium"
                >
                  Registrar Evento
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Add Dotacion */}
      {isDotacionModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-lg p-5 text-xs shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <HardHat className="w-4 h-4 text-orange-400" />
                <span>Registrar Entrega de Dotación (CST Art. 230)</span>
              </h3>
              <button onClick={() => setIsDotacionModalOpen(false)} className="text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateDotacion} className="space-y-3.5">
              <div>
                <label className="block text-slate-300 mb-1">Colaborador Beneficiario *</label>
                <select
                  required
                  value={dotEmpId}
                  onChange={(e) => setDotEmpId(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-100"
                >
                  {employees.map((e) => {
                    const check = checkDotacionEligibility(e.baseSalary, 100);
                    return (
                      <option key={e.id} value={e.id}>
                        {e.firstName} {e.lastName} — Salario: ${e.baseSalary.toLocaleString('es-CO')}{' '}
                        {check.eligible ? '(Elegible)' : '(No elegible)'}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Periodo Cuatrimestral Legal *</label>
                <select
                  value={dotPeriod}
                  onChange={(e) => setDotPeriod(e.target.value as SstDotacion['period'])}
                  className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-100"
                >
                  <option value="Abril">Abril (1ra entrega del año)</option>
                  <option value="Agosto">Agosto (2da entrega del año)</option>
                  <option value="Diciembre">Diciembre (3ra entrega del año)</option>
                </select>
              </div>

              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={dotShoes}
                    onChange={(e) => setDotShoes(e.target.checked)}
                    className="rounded text-orange-600 focus:ring-orange-500"
                  />
                  <span className="text-slate-200">1 Par de Calzado de Trabajo Entregado</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={dotClothes}
                    onChange={(e) => setDotClothes(e.target.checked)}
                    className="rounded text-orange-600 focus:ring-orange-500"
                  />
                  <span className="text-slate-200">1 Vestido de Labor Completo (Camisa / Pantalón)</span>
                </label>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Observaciones</label>
                <input
                  type="text"
                  value={dotNotes}
                  onChange={(e) => setDotNotes(e.target.value)}
                  placeholder="Talla M, botas talla 41 con puntera de seguridad..."
                  className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-100"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsDotacionModalOpen(false)}
                  className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-orange-600 hover:bg-orange-500 text-white rounded font-medium"
                >
                  Guardar Acta de Entrega
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
