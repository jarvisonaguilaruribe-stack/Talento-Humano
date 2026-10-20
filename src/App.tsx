/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Menu,
  X,
  Users,
  ShieldAlert,
  Building2,
  CheckCircle,
  FileSpreadsheet,
} from 'lucide-react';

import {
  ModuleKey,
  Employee,
  EmployeeDocument,
  FamilyMember,
  PayrollNovelty,
  TrainingPlan,
  JobVacancy,
  Candidate,
  WellnessActivity,
  SstStandard,
  SstIncident,
  SstDotacion,
  ClimateSurvey,
} from './types';

import {
  INITIAL_EMPLOYEES,
  INITIAL_DOCUMENTS,
  INITIAL_FAMILIES,
  INITIAL_NOVELTIES,
  INITIAL_TRAININGS,
  INITIAL_JOBS,
  INITIAL_CANDIDATES,
  INITIAL_WELLNESS,
  INITIAL_SST_STANDARDS,
  INITIAL_SST_INCIDENTS,
  INITIAL_SST_DOTACIONES,
  INITIAL_CLIMATE_SURVEY,
} from './data/mockData';

import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { DashboardModule } from './components/modules/DashboardModule';
import { PersonalModule } from './components/modules/PersonalModule';
import { DocumentosModule } from './components/modules/DocumentosModule';
import { FamiliaModule } from './components/modules/FamiliaModule';
import { NovedadesModule } from './components/modules/NovedadesModule';
import { CapacitacionModule } from './components/modules/CapacitacionModule';
import { ReclutamientoModule } from './components/modules/ReclutamientoModule';
import { BienestarModule } from './components/modules/BienestarModule';
import { SstModule } from './components/modules/SstModule';
import { ClimaModule } from './components/modules/ClimaModule';
import { ArquitecturaModule } from './components/modules/ArquitecturaModule';

export default function App() {
  const [currentModule, setCurrentModule] = useState<ModuleKey>('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Application Data States
  const [employees, setEmployees] = useState<Employee[]>(INITIAL_EMPLOYEES);
  const [documents, setDocuments] = useState<EmployeeDocument[]>(INITIAL_DOCUMENTS);
  const [families, setFamilies] = useState<FamilyMember[]>(INITIAL_FAMILIES);
  const [novelties, setNovelties] = useState<PayrollNovelty[]>(INITIAL_NOVELTIES);
  const [trainings, setTrainings] = useState<TrainingPlan[]>(INITIAL_TRAININGS);
  const [jobs, setJobs] = useState<JobVacancy[]>(INITIAL_JOBS);
  const [candidates, setCandidates] = useState<Candidate[]>(INITIAL_CANDIDATES);
  const [wellness, setWellness] = useState<WellnessActivity[]>(INITIAL_WELLNESS);
  const [sstStandards, setSstStandards] = useState<SstStandard[]>(INITIAL_SST_STANDARDS);
  const [sstIncidents, setSstIncidents] = useState<SstIncident[]>(INITIAL_SST_INCIDENTS);
  const [sstDotaciones, setSstDotaciones] = useState<SstDotacion[]>(INITIAL_SST_DOTACIONES);
  const [climate, setClimate] = useState<ClimateSurvey>(INITIAL_CLIMATE_SURVEY);

  // Handlers: Employees
  const handleAddEmployee = (newEmp: Employee) => {
    setEmployees((prev) => [newEmp, ...prev]);
  };

  const handleUpdateEmployee = (updatedEmp: Employee) => {
    setEmployees((prev) =>
      prev.map((emp) => (emp.id === updatedEmp.id ? updatedEmp : emp))
    );
  };

  const handleDeleteEmployee = (id: string) => {
    setEmployees((prev) => prev.filter((e) => e.id !== id));
  };

  // Handlers: Documents
  const handleAddDocument = (newDoc: EmployeeDocument) => {
    setDocuments((prev) => [newDoc, ...prev]);
  };

  const handleDeleteDocument = (id: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
  };

  // Handlers: Families
  const handleAddFamilyMember = (newMember: FamilyMember) => {
    setFamilies((prev) => [newMember, ...prev]);
  };

  const handleDeleteFamilyMember = (id: string) => {
    setFamilies((prev) => prev.filter((f) => f.id !== id));
  };

  // Handlers: Novelties
  const handleAddNovelty = (newNov: PayrollNovelty) => {
    setNovelties((prev) => [newNov, ...prev]);
  };

  const handleUpdateNoveltyStatus = (id: string, status: PayrollNovelty['status']) => {
    setNovelties((prev) =>
      prev.map((n) => (n.id === id ? { ...n, status } : n))
    );
  };

  const handleDeleteNovelty = (id: string) => {
    setNovelties((prev) => prev.filter((n) => n.id !== id));
  };

  // Handlers: Trainings
  const handleAddTraining = (newTrn: TrainingPlan) => {
    setTrainings((prev) => [newTrn, ...prev]);
  };

  const handleDeleteTraining = (id: string) => {
    setTrainings((prev) => prev.filter((t) => t.id !== id));
  };

  // Handlers: Jobs & Candidates
  const handleAddJob = (newJob: JobVacancy) => {
    setJobs((prev) => [newJob, ...prev]);
  };

  const handleAddCandidate = (newCand: Candidate) => {
    setCandidates((prev) => [newCand, ...prev]);
  };

  const handleUpdateCandidateStage = (id: string, stage: Candidate['stage']) => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === id ? { ...c, stage } : c))
    );
  };

  const handleHireCandidate = (cand: Candidate) => {
    const names = cand.fullName.split(' ');
    const firstName = names[0] || cand.fullName;
    const lastName = names.slice(1).join(' ') || 'Pendiente';

    const newEmp: Employee = {
      id: `emp-${Date.now()}`,
      documentType: 'CC',
      documentNumber: `${Math.floor(Math.random() * 90000000 + 10000000)}`,
      firstName,
      lastName,
      email: cand.email,
      phone: cand.phone,
      birthDate: '1998-05-15',
      address: 'Calle 100 # 15-20',
      city: cand.city,
      hireDate: new Date().toISOString().split('T')[0],
      position: cand.jobTitle,
      department: 'Tecnología',
      contractType: 'Término Indefinido',
      baseSalary: 2800000,
      status: 'ACTIVO',
      eps: 'EPS Sanitas',
      afp: 'Protección S.A.',
      arl: 'Seguros Bolívar',
      arlRiskLevel: 1,
      ccf: 'Compensar',
      cesantiasFund: 'Protección Cesantías',
      emergencyContactName: 'Familiar Contacto',
      emergencyContactPhone: cand.phone,
      emergencyContactRelationship: 'Familiar',
    };

    setEmployees((prev) => [newEmp, ...prev]);
    setCandidates((prev) =>
      prev.map((c) => (c.id === cand.id ? { ...c, stage: 'CONTRATADO' } : c))
    );
    setCurrentModule('personal');
  };

  const handleDeleteCandidate = (id: string) => {
    setCandidates((prev) => prev.filter((c) => c.id !== id));
  };

  // Handlers: Wellness
  const handleAddWellnessActivity = (act: WellnessActivity) => {
    setWellness((prev) => [act, ...prev]);
  };

  const handleDeleteWellnessActivity = (id: string) => {
    setWellness((prev) => prev.filter((w) => w.id !== id));
  };

  // Handlers: SST
  const handleAddIncident = (inc: SstIncident) => {
    setSstIncidents((prev) => [inc, ...prev]);
  };

  const handleDeleteIncident = (id: string) => {
    setSstIncidents((prev) => prev.filter((i) => i.id !== id));
  };

  const handleAddDotacion = (dot: SstDotacion) => {
    setSstDotaciones((prev) => [dot, ...prev]);
  };

  // Handlers: Climate
  const handleAddActionPlan = (plan: ClimateSurvey['actionPlans'][0]) => {
    setClimate((prev) => ({
      ...prev,
      actionPlans: [plan, ...prev.actionPlans],
    }));
  };

  const handleUpdateActionStatus = (
    id: string,
    status: 'PENDIENTE' | 'EN_CURSO' | 'FINALIZADO'
  ) => {
    setClimate((prev) => ({
      ...prev,
      actionPlans: prev.actionPlans.map((a) => (a.id === id ? { ...a, status } : a)),
    }));
  };

  const counts = {
    employees: employees.length,
    documents: documents.length,
    families: families.length,
    novelties: novelties.length,
    trainings: trainings.length,
    jobs: jobs.length,
    wellness: wellness.length,
    sstStandards: sstStandards.length,
    climateSurveys: 1,
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-teal-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        currentModule={currentModule}
        onSelectModule={(mod) => {
          setCurrentModule(mod);
          setIsMobileSidebarOpen(false);
        }}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        employeeCount={employees.length}
      />

      {/* Mobile Menu Toggle Bar */}
      <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 py-2 flex items-center justify-between">
        <button
          onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          className="flex items-center gap-2 text-xs font-semibold text-slate-200 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700"
        >
          {isMobileSidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          <span>Módulos de Gestión</span>
        </button>

        <span className="text-[11px] text-slate-400 capitalize">
          {currentModule.replace('_', ' ')}
        </span>
      </div>

      {/* Main Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <Sidebar
            currentModule={currentModule}
            onSelectModule={(mod) => setCurrentModule(mod)}
            counts={counts}
          />
        </div>

        {/* Mobile Drawer Sidebar */}
        {isMobileSidebarOpen && (
          <div className="fixed inset-0 z-40 md:hidden flex">
            <div
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs"
              onClick={() => setIsMobileSidebarOpen(false)}
            />
            <div className="relative z-50 w-72 bg-slate-900 h-full shadow-2xl flex flex-col">
              <div className="p-3 border-b border-slate-800 flex justify-between items-center">
                <span className="font-bold text-xs text-white">Módulos de Gestión</span>
                <button
                  onClick={() => setIsMobileSidebarOpen(false)}
                  className="p-1 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                <Sidebar
                  currentModule={currentModule}
                  onSelectModule={(mod) => {
                    setCurrentModule(mod);
                    setIsMobileSidebarOpen(false);
                  }}
                  counts={counts}
                />
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Content Workspace */}
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto max-w-7xl mx-auto w-full">
          {currentModule === 'dashboard' && (
            <DashboardModule
              employees={employees}
              documents={documents}
              novelties={novelties}
              trainings={trainings}
              wellness={wellness}
              sstStandards={sstStandards}
              sstIncidents={sstIncidents}
              climate={climate}
              onNavigate={(mod) => setCurrentModule(mod)}
              onQuickNovelty={() => setCurrentModule('novedades')}
              onQuickEmployee={() => setCurrentModule('personal')}
            />
          )}

          {currentModule === 'personal' && (
            <PersonalModule
              employees={employees}
              onAddEmployee={handleAddEmployee}
              onUpdateEmployee={handleUpdateEmployee}
              onDeleteEmployee={handleDeleteEmployee}
              searchTerm={searchTerm}
            />
          )}

          {currentModule === 'documentos' && (
            <DocumentosModule
              documents={documents}
              employees={employees}
              onAddDocument={handleAddDocument}
              onDeleteDocument={handleDeleteDocument}
              searchTerm={searchTerm}
            />
          )}

          {currentModule === 'familia' && (
            <FamiliaModule
              families={families}
              employees={employees}
              onAddFamilyMember={handleAddFamilyMember}
              onDeleteFamilyMember={handleDeleteFamilyMember}
              searchTerm={searchTerm}
            />
          )}

          {currentModule === 'novedades' && (
            <NovedadesModule
              novelties={novelties}
              employees={employees}
              onAddNovelty={handleAddNovelty}
              onUpdateNoveltyStatus={handleUpdateNoveltyStatus}
              onDeleteNovelty={handleDeleteNovelty}
              searchTerm={searchTerm}
            />
          )}

          {currentModule === 'capacitacion' && (
            <CapacitacionModule
              trainings={trainings}
              employees={employees}
              onAddTraining={handleAddTraining}
              onDeleteTraining={handleDeleteTraining}
              searchTerm={searchTerm}
            />
          )}

          {currentModule === 'reclutamiento' && (
            <ReclutamientoModule
              jobs={jobs}
              candidates={candidates}
              onAddJob={handleAddJob}
              onAddCandidate={handleAddCandidate}
              onUpdateCandidateStage={handleUpdateCandidateStage}
              onHireCandidate={handleHireCandidate}
              onDeleteCandidate={handleDeleteCandidate}
              searchTerm={searchTerm}
            />
          )}

          {currentModule === 'bienestar' && (
            <BienestarModule
              wellness={wellness}
              employees={employees}
              onAddActivity={handleAddWellnessActivity}
              onDeleteActivity={handleDeleteWellnessActivity}
              searchTerm={searchTerm}
            />
          )}

          {currentModule === 'sst' && (
            <SstModule
              standards={sstStandards}
              incidents={sstIncidents}
              dotaciones={sstDotaciones}
              employees={employees}
              onAddIncident={handleAddIncident}
              onAddDotacion={handleAddDotacion}
              onDeleteIncident={handleDeleteIncident}
              searchTerm={searchTerm}
            />
          )}

          {currentModule === 'clima' && (
            <ClimaModule
              climate={climate}
              onAddActionPlan={handleAddActionPlan}
              onUpdateActionStatus={handleUpdateActionStatus}
              searchTerm={searchTerm}
            />
          )}

          {currentModule === 'arquitectura' && <ArquitecturaModule />}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800/80 px-4 py-3 text-center text-xs text-slate-400">
        <div className="flex flex-wrap items-center justify-between max-w-7xl mx-auto gap-2 text-[11px]">
          <div className="flex items-center gap-1.5 text-slate-400">
            <Building2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>TalentoPyme Colombia • Solución Modular para Microempresas</span>
          </div>
          <div className="text-slate-400">
            Cumplimiento normativo: Código Sustantivo del Trabajo (CST) • Decreto 1072/15 • Resolución 0312/19 • Ley 2101/21
          </div>
        </div>
      </footer>
    </div>
  );
}
