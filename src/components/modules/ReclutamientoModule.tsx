/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  UserPlus,
  Briefcase,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Star,
  ArrowRight,
  Plus,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  Trash2,
  Sparkles,
} from 'lucide-react';
import { JobVacancy, Candidate, Employee, ContractType } from '../../types';

interface ReclutamientoModuleProps {
  jobs: JobVacancy[];
  candidates: Candidate[];
  onAddJob: (job: JobVacancy) => void;
  onAddCandidate: (cand: Candidate) => void;
  onUpdateCandidateStage: (id: string, stage: Candidate['stage']) => void;
  onHireCandidate: (cand: Candidate) => void;
  onDeleteCandidate: (id: string) => void;
  searchTerm: string;
}

export const ReclutamientoModule: React.FC<ReclutamientoModuleProps> = ({
  jobs,
  candidates,
  onAddJob,
  onAddCandidate,
  onUpdateCandidateStage,
  onHireCandidate,
  onDeleteCandidate,
  searchTerm,
}) => {
  const [activeTab, setActiveTab] = useState<'pipeline' | 'vacantes'>('pipeline');
  const [selectedJobFilter, setSelectedJobFilter] = useState('TODOS');
  const [isCandidateModalOpen, setIsCandidateModalOpen] = useState(false);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);

  // New Candidate Form
  const [candName, setCandName] = useState('');
  const [candJobId, setCandJobId] = useState(jobs[0]?.id || '');
  const [candEmail, setCandEmail] = useState('');
  const [candPhone, setCandPhone] = useState('');
  const [candCity, setCandCity] = useState('Bogotá D.C.');
  const [candNotes, setCandNotes] = useState('');

  // New Job Form
  const [jobTitle, setJobTitle] = useState('');
  const [jobDept, setJobDept] = useState('Tecnología');
  const [jobSalary, setJobSalary] = useState('$2.800.000 - $3.500.000 COP');
  const [jobContract, setJobContract] = useState<ContractType>('Término Indefinido');
  const [jobReqs, setJobReqs] = useState('');
  const [jobDesc, setJobDesc] = useState('');

  const stages: { key: Candidate['stage']; label: string; color: string }[] = [
    { key: 'POSTULACION', label: 'Postulación', color: 'border-slate-700 bg-slate-900' },
    { key: 'REVISION_HV', label: 'Filtro HV', color: 'border-blue-900/50 bg-blue-950/20' },
    { key: 'ENTREVISTA', label: 'Entrevista', color: 'border-indigo-900/50 bg-indigo-950/20' },
    { key: 'PRUEBA_TECNICA', label: 'Prueba Técnica', color: 'border-amber-900/50 bg-amber-950/20' },
    { key: 'EXAMEN_MEDICO', label: 'Examen Ocupacional', color: 'border-teal-900/50 bg-teal-950/20' },
    { key: 'CONTRATADO', label: 'Contratado', color: 'border-emerald-900/50 bg-emerald-950/20' },
  ];

  const filteredCandidates = candidates.filter((c) => {
    const matchesSearch =
      `${c.fullName} ${c.jobTitle} ${c.email} ${c.notes}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    const matchesJob = selectedJobFilter === 'TODOS' || c.jobId === selectedJobFilter;
    return matchesSearch && matchesJob;
  });

  const handleCreateCandidate = (e: React.FormEvent) => {
    e.preventDefault();
    const job = jobs.find((j) => j.id === candJobId);
    if (!job || !candName) return;

    const newCand: Candidate = {
      id: `cand-${Date.now()}`,
      jobId: job.id,
      jobTitle: job.title,
      fullName: candName,
      email: candEmail,
      phone: candPhone,
      city: candCity,
      applicationDate: new Date().toISOString().split('T')[0],
      stage: 'POSTULACION',
      score: 4.0,
      notes: candNotes || 'Postulación recibida.',
    };

    onAddCandidate(newCand);
    setIsCandidateModalOpen(false);
  };

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobTitle) return;

    const newJob: JobVacancy = {
      id: `job-${Date.now()}`,
      title: jobTitle,
      department: jobDept,
      vacanciesCount: 1,
      salaryRange: jobSalary,
      contractType: jobContract,
      status: 'ABIERTA',
      publishedDate: new Date().toISOString().split('T')[0],
      closingDate: '2026-11-30',
      requirements: jobReqs.split('\n').filter((r) => r.trim().length > 0),
      description: jobDesc,
    };

    onAddJob(newJob);
    setIsJobModalOpen(false);
  };

  return (
    <div className="space-y-5">
      {/* Module Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900 p-4 rounded-xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400">
              <UserPlus className="w-5 h-5" />
            </div>
            <h1 className="text-base font-bold text-white">
              Módulo 6: Reclutamiento y Selección de Talento
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Gestión de vacantes y embudo de selección (filtro de hoja de vida, entrevistas, prueba técnica
            y examen médico de ingreso osteomuscular antes de la contratación legal).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsJobModalOpen(true)}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <Briefcase className="w-3.5 h-3.5 text-purple-400" />
            <span>Crear Vacante</span>
          </button>
          <button
            onClick={() => setIsCandidateModalOpen(true)}
            className="px-3.5 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-semibold flex items-center gap-2 transition shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Nuevo Candidato</span>
          </button>
        </div>
      </div>

      {/* Tabs & Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/60 p-3 rounded-lg border border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('pipeline')}
            className={`px-3 py-1.5 rounded-md font-medium transition ${
              activeTab === 'pipeline'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Embudo de Candidatos (Kanban)
          </button>
          <button
            onClick={() => setActiveTab('vacantes')}
            className={`px-3 py-1.5 rounded-md font-medium transition ${
              activeTab === 'vacantes'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Vacantes Activas ({jobs.length})
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-400">Filtrar por Vacante:</span>
          <select
            value={selectedJobFilter}
            onChange={(e) => setSelectedJobFilter(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-slate-200 rounded px-2 py-1 text-xs"
          >
            <option value="TODOS">Todas las vacantes</option>
            {jobs.map((j) => (
              <option key={j.id} value={j.id}>
                {j.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Kanban Pipeline View */}
      {activeTab === 'pipeline' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3 overflow-x-auto pb-4">
          {stages.map((stage) => {
            const stageCandidates = filteredCandidates.filter((c) => c.stage === stage.key);
            return (
              <div
                key={stage.key}
                className={`rounded-xl border p-3 flex flex-col min-w-[200px] ${stage.color}`}
              >
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
                  <span className="text-xs font-bold text-slate-200">{stage.label}</span>
                  <span className="text-[10px] bg-slate-800 font-mono px-1.5 py-0.5 rounded text-slate-300 font-semibold">
                    {stageCandidates.length}
                  </span>
                </div>

                <div className="space-y-2 flex-1">
                  {stageCandidates.map((cand) => (
                    <div
                      key={cand.id}
                      className="bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs space-y-2 shadow-sm hover:border-purple-500/50 transition group"
                    >
                      <div className="flex justify-between items-start gap-1">
                        <div className="font-semibold text-slate-100">{cand.fullName}</div>
                        <div className="flex items-center text-amber-400 text-[10px]">
                          <Star className="w-3 h-3 fill-amber-400" />
                          <span className="ml-0.5 font-bold">{cand.score}</span>
                        </div>
                      </div>

                      <div className="text-[10px] text-purple-300 font-medium truncate">
                        {cand.jobTitle}
                      </div>

                      <div className="text-[10px] text-slate-400 space-y-0.5">
                        <div className="flex items-center gap-1">
                          <Mail className="w-2.5 h-2.5" />
                          <span className="truncate">{cand.email}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="w-2.5 h-2.5" />
                          <span>{cand.phone}</span>
                        </div>
                      </div>

                      <p className="text-[10px] text-slate-300 bg-slate-950/60 p-1.5 rounded border border-slate-800/80 leading-snug">
                        {cand.notes}
                      </p>

                      {/* Stage Mover Selector */}
                      <div className="pt-1 flex items-center justify-between border-t border-slate-800/80">
                        <select
                          value={cand.stage}
                          onChange={(e) =>
                            onUpdateCandidateStage(cand.id, e.target.value as Candidate['stage'])
                          }
                          className="bg-slate-800 text-[10px] text-slate-200 border border-slate-700 rounded px-1.5 py-0.5 focus:outline-none"
                        >
                          <option value="POSTULACION">Postulación</option>
                          <option value="REVISION_HV">Filtro HV</option>
                          <option value="ENTREVISTA">Entrevista</option>
                          <option value="PRUEBA_TECNICA">Prueba Técnica</option>
                          <option value="EXAMEN_MEDICO">Examen Médico</option>
                          <option value="CONTRATADO">Contratado</option>
                          <option value="NO_SELECCIONADO">No Seleccionado</option>
                        </select>

                        <button
                          onClick={() => {
                            if (confirm(`¿Eliminar candidato ${cand.fullName}?`)) {
                              onDeleteCandidate(cand.id);
                            }
                          }}
                          className="text-slate-500 hover:text-rose-400 p-0.5"
                          title="Eliminar"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>

                      {cand.stage === 'CONTRATADO' && (
                        <button
                          onClick={() => onHireCandidate(cand)}
                          className="w-full mt-1 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[10px] font-semibold flex items-center justify-center gap-1 transition"
                        >
                          <Sparkles className="w-3 h-3" />
                          <span>Vincular a Empleados</span>
                        </button>
                      )}
                    </div>
                  ))}

                  {stageCandidates.length === 0 && (
                    <div className="h-16 flex items-center justify-center text-[11px] text-slate-500 border border-dashed border-slate-800 rounded-lg">
                      Sin candidatos
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Vacancies Tab View */}
      {activeTab === 'vacantes' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs space-y-3 shadow-sm hover:border-slate-700 transition"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-semibold text-purple-300 uppercase tracking-wider bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800/40">
                    {job.department}
                  </span>
                  <h3 className="font-bold text-slate-100 text-sm mt-1">{job.title}</h3>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                  {job.status}
                </span>
              </div>

              <p className="text-[11px] text-slate-300 leading-relaxed">{job.description}</p>

              <div className="p-2.5 bg-slate-950/60 rounded-lg border border-slate-800 space-y-1 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-400">Rango Salarial:</span>
                  <span className="font-semibold text-emerald-400 font-mono">{job.salaryRange}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Tipo de Contrato:</span>
                  <span className="text-slate-200">{job.contractType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Fecha Cierre:</span>
                  <span className="text-slate-200">{job.closingDate}</span>
                </div>
              </div>

              <div>
                <span className="font-semibold text-slate-300 block mb-1 text-[11px]">
                  Requisitos del Cargo:
                </span>
                <ul className="list-disc list-inside space-y-0.5 text-[11px] text-slate-400">
                  {job.requirements.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Add Candidate */}
      {isCandidateModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-lg p-5 text-xs shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-purple-400" />
                <span>Registrar Nuevo Candidato</span>
              </h3>
              <button
                onClick={() => setIsCandidateModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateCandidate} className="space-y-3.5">
              <div>
                <label className="block text-slate-300 mb-1">Vacante a la que Aplica *</label>
                <select
                  required
                  value={candJobId}
                  onChange={(e) => setCandJobId(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-100"
                >
                  {jobs.map((j) => (
                    <option key={j.id} value={j.id}>
                      {j.title} ({j.department})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Nombre Completo *</label>
                <input
                  type="text"
                  required
                  value={candName}
                  onChange={(e) => setCandName(e.target.value)}
                  placeholder="Ej. Julián David Morales"
                  className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Correo Electrónico *</label>
                  <input
                    type="email"
                    required
                    value={candEmail}
                    onChange={(e) => setCandEmail(e.target.value)}
                    placeholder="julian@correo.com"
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Teléfono Móvil</label>
                  <input
                    type="text"
                    value={candPhone}
                    onChange={(e) => setCandPhone(e.target.value)}
                    placeholder="310 000 0000"
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Ciudad de Residencia</label>
                <input
                  type="text"
                  value={candCity}
                  onChange={(e) => setCandCity(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-100"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Notas Iniciales de Evaluación</label>
                <textarea
                  rows={2}
                  value={candNotes}
                  onChange={(e) => setCandNotes(e.target.value)}
                  placeholder="Perfil profesional, fortalezas detectadas en la HV..."
                  className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-100"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsCandidateModalOpen(false)}
                  className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded font-medium"
                >
                  Agregar Candidato
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Add Job Vacancy */}
      {isJobModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-lg p-5 text-xs shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-purple-400" />
                <span>Publicar Nueva Vacante Laboral</span>
              </h3>
              <button
                onClick={() => setIsJobModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateJob} className="space-y-3.5">
              <div>
                <label className="block text-slate-300 mb-1">Título del Cargo *</label>
                <input
                  type="text"
                  required
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="Ej. Diseñador UI/UX Junior"
                  className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Departamento</label>
                  <input
                    type="text"
                    value={jobDept}
                    onChange={(e) => setJobDept(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Tipo de Contrato</label>
                  <select
                    value={jobContract}
                    onChange={(e) => setJobContract(e.target.value as ContractType)}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-100"
                  >
                    <option value="Término Indefinido">Término Indefinido</option>
                    <option value="Término Fijo">Término Fijo</option>
                    <option value="Aprendizaje SENA">Aprendizaje SENA</option>
                    <option value="Obra o Labor">Obra o Labor</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Rango Salarial Ofrecido</label>
                <input
                  type="text"
                  value={jobSalary}
                  onChange={(e) => setJobSalary(e.target.value)}
                  placeholder="Ej. $2.500.000 - $3.000.000 COP"
                  className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-100"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Requisitos (uno por línea)</label>
                <textarea
                  rows={2}
                  value={jobReqs}
                  onChange={(e) => setJobReqs(e.target.value)}
                  placeholder="Manejo de Figma&#10;1 año de experiencia"
                  className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-100"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Descripción Breve</label>
                <textarea
                  rows={2}
                  value={jobDesc}
                  onChange={(e) => setJobDesc(e.target.value)}
                  placeholder="Misión del cargo en la microempresa..."
                  className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-100"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsJobModalOpen(false)}
                  className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded font-medium"
                >
                  Publicar Vacante
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
