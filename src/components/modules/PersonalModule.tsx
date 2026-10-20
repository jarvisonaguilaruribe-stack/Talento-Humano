/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Users,
  UserPlus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Briefcase,
  Building,
  Mail,
  Phone,
  Calendar,
  AlertCircle,
  FileBadge,
  Shield,
  Edit2,
  Trash2,
  ExternalLink,
  DollarSign,
  Heart,
} from 'lucide-react';
import { Employee, ContractType, EmployeeStatus } from '../../types';
import {
  checkDotacionEligibility,
  calculateHourlyRate,
  SMMLV_COLOMBIA_2026,
} from '../../utils/colombiaHrRules';

interface PersonalModuleProps {
  employees: Employee[];
  onAddEmployee: (emp: Employee) => void;
  onUpdateEmployee: (emp: Employee) => void;
  onDeleteEmployee: (id: string) => void;
  searchTerm: string;
}

export const PersonalModule: React.FC<PersonalModuleProps> = ({
  employees,
  onAddEmployee,
  onUpdateEmployee,
  onDeleteEmployee,
  searchTerm,
}) => {
  const [statusFilter, setStatusFilter] = useState<string>('TODOS');
  const [deptFilter, setDeptFilter] = useState<string>('TODOS');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(employees[0] || null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  // Form State
  const defaultFormState: Omit<Employee, 'id'> = {
    documentType: 'CC',
    documentNumber: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthDate: '1995-01-01',
    address: '',
    city: 'Bogotá D.C.',
    hireDate: new Date().toISOString().split('T')[0],
    position: '',
    department: 'Tecnología',
    contractType: 'Término Indefinido',
    baseSalary: 2500000,
    status: 'ACTIVO',
    eps: 'EPS Sanitas',
    afp: 'Protección S.A.',
    arl: 'Seguros Bolívar',
    arlRiskLevel: 1,
    ccf: 'Compensar',
    cesantiasFund: 'Protección Cesantías',
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyContactRelationship: 'Familiar',
  };

  const [formData, setFormData] = useState<Omit<Employee, 'id'>>(defaultFormState);

  const departments = ['TODOS', ...Array.from(new Set(employees.map((e) => e.department)))];

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      `${emp.firstName} ${emp.lastName} ${emp.documentNumber} ${emp.position}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'TODOS' || emp.status === statusFilter;
    const matchesDept = deptFilter === 'TODOS' || emp.department === deptFilter;
    return matchesSearch && matchesStatus && matchesDept;
  });

  const handleOpenAdd = () => {
    setEditingEmployee(null);
    setFormData(defaultFormState);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (emp: Employee) => {
    setEditingEmployee(emp);
    setFormData({ ...emp });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.documentNumber) {
      return;
    }

    if (editingEmployee) {
      onUpdateEmployee({
        ...formData,
        id: editingEmployee.id,
      });
      if (selectedEmployee?.id === editingEmployee.id) {
        setSelectedEmployee({ ...formData, id: editingEmployee.id });
      }
    } else {
      const newEmp: Employee = {
        ...formData,
        id: `emp-${Date.now()}`,
      };
      onAddEmployee(newEmp);
      setSelectedEmployee(newEmp);
    }
    setIsModalOpen(false);
  };

  // Helper calculation for days worked
  const getDaysWorked = (hireDateStr: string) => {
    const hire = new Date(hireDateStr);
    const now = new Date('2026-10-19');
    const diff = Math.max(0, Math.floor((now.getTime() - hire.getTime()) / (1000 * 3600 * 24)));
    return diff;
  };

  return (
    <div className="space-y-5">
      {/* Module Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900 p-4 rounded-xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400">
              <Users className="w-5 h-5" />
            </div>
            <h1 className="text-base font-bold text-white">
              Módulo 1: Datos Básicos del Personal
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Registro, contratación laboral conforme al Código Sustantivo del Trabajo (CST) y
            afiliaciones obligatorias al Sistema de Seguridad Social Integral en Colombia.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold flex items-center gap-2 transition self-start sm:self-auto shadow-sm"
        >
          <UserPlus className="w-4 h-4" />
          <span>Nuevo Colaborador</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-wrap items-center gap-3 bg-slate-900/60 p-3 rounded-lg border border-slate-800 text-xs">
        <div className="flex items-center gap-1.5 text-slate-400">
          <Filter className="w-3.5 h-3.5" />
          <span>Filtros:</span>
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-1">
          <span className="text-slate-400">Estado:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-slate-200 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="TODOS">Todos ({employees.length})</option>
            <option value="ACTIVO">Activo</option>
            <option value="VACACIONES">En Vacaciones</option>
            <option value="INCAPACITADO">Incapacitado</option>
            <option value="RETIRADO">Retirado</option>
          </select>
        </div>

        {/* Department Filter */}
        <div className="flex items-center gap-1">
          <span className="text-slate-400">Área:</span>
          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-slate-200 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {departments.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        <div className="ml-auto text-slate-400 text-[11px]">
          Mostrando {filteredEmployees.length} de {employees.length} registros
        </div>
      </div>

      {/* Main Content: Split Master-Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left List (5 cols) */}
        <div className="lg:col-span-5 space-y-2">
          {filteredEmployees.map((emp) => {
            const isSelected = selectedEmployee?.id === emp.id;
            const daysWorked = getDaysWorked(emp.hireDate);
            const dotacion = checkDotacionEligibility(emp.baseSalary, daysWorked);

            return (
              <div
                key={emp.id}
                onClick={() => setSelectedEmployee(emp)}
                className={`p-3.5 rounded-xl border transition cursor-pointer text-xs ${
                  isSelected
                    ? 'bg-blue-950/40 border-blue-500/70 shadow-sm'
                    : 'bg-slate-900 border-slate-800/90 hover:bg-slate-850 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-blue-600/20 text-blue-300 border border-blue-500/30 flex items-center justify-center font-bold text-xs">
                      {emp.firstName[0]}
                      {emp.lastName[0]}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-100">
                        {emp.firstName} {emp.lastName}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {emp.documentType} {emp.documentNumber} • {emp.position}
                      </div>
                    </div>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${
                      emp.status === 'ACTIVO'
                        ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                        : emp.status === 'VACACIONES'
                        ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {emp.status}
                  </span>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-800/70 grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-slate-400">Salario: </span>
                    <span className="font-mono font-medium text-slate-200">
                      ${emp.baseSalary.toLocaleString('es-CO')}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400">Contrato: </span>
                    <span className="text-slate-200 truncate inline-block max-w-[130px]">
                      {emp.contractType}
                    </span>
                  </div>
                </div>

                {dotacion.eligible && (
                  <div className="mt-2 text-[10px] bg-emerald-950/40 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800/40 inline-flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Aplica Dotación Legal (CST Art. 230)</span>
                  </div>
                )}
              </div>
            );
          })}

          {filteredEmployees.length === 0 && (
            <div className="p-8 text-center text-xs text-slate-400 bg-slate-900 border border-slate-800 rounded-xl">
              No se encontraron colaboradores con los criterios seleccionados.
            </div>
          )}
        </div>

        {/* Right Detail Pane (7 cols) */}
        <div className="lg:col-span-7">
          {selectedEmployee ? (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-5">
              {/* Employee Header */}
              <div className="flex flex-wrap items-start justify-between gap-3 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                    {selectedEmployee.firstName[0]}
                    {selectedEmployee.lastName[0]}
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white flex items-center gap-2">
                      <span>
                        {selectedEmployee.firstName} {selectedEmployee.lastName}
                      </span>
                      <span className="text-xs font-normal text-slate-400 font-mono">
                        ({selectedEmployee.documentType}: {selectedEmployee.documentNumber})
                      </span>
                    </h2>
                    <div className="text-xs text-slate-300 flex items-center gap-2 mt-0.5">
                      <span className="text-blue-400 font-medium">
                        {selectedEmployee.position}
                      </span>
                      <span>•</span>
                      <span className="text-slate-400">{selectedEmployee.department}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEdit(selectedEmployee)}
                    className="p-2 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg text-xs flex items-center gap-1.5 transition"
                    title="Editar datos del colaborador"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Editar</span>
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`¿Confirmas eliminar el registro de ${selectedEmployee.firstName} ${selectedEmployee.lastName}?`)) {
                        onDeleteEmployee(selectedEmployee.id);
                        setSelectedEmployee(employees.find(e => e.id !== selectedEmployee.id) || null);
                      }
                    }}
                    className="p-2 text-rose-400 hover:text-rose-300 bg-rose-950/20 hover:bg-rose-950/40 border border-rose-900/30 rounded-lg text-xs transition"
                    title="Eliminar colaborador"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* General & Contract Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-slate-950/50 rounded-lg border border-slate-800 space-y-2">
                  <div className="font-semibold text-slate-200 flex items-center gap-1.5 text-xs">
                    <Briefcase className="w-3.5 h-3.5 text-blue-400" />
                    <span>Condiciones Laborales (CST)</span>
                  </div>
                  <div className="space-y-1 text-slate-300">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Tipo de Contrato:</span>
                      <span className="font-medium text-slate-200">
                        {selectedEmployee.contractType}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Fecha de Ingreso:</span>
                      <span>{selectedEmployee.hireDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Antigüedad:</span>
                      <span>{getDaysWorked(selectedEmployee.hireDate)} días</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Salario Básico:</span>
                      <span className="font-mono text-emerald-400 font-bold">
                        ${selectedEmployee.baseSalary.toLocaleString('es-CO')} COP
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Valor Hora Ordinaria:</span>
                      <span className="font-mono text-slate-200">
                        ${calculateHourlyRate(selectedEmployee.baseSalary).toLocaleString('es-CO')}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-slate-950/50 rounded-lg border border-slate-800 space-y-2">
                  <div className="font-semibold text-slate-200 flex items-center gap-1.5 text-xs">
                    <Mail className="w-3.5 h-3.5 text-blue-400" />
                    <span>Contacto y Ubicación</span>
                  </div>
                  <div className="space-y-1 text-slate-300">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Email:</span>
                      <span className="truncate max-w-[160px] text-slate-200">
                        {selectedEmployee.email}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Teléfono:</span>
                      <span>{selectedEmployee.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Ciudad:</span>
                      <span>{selectedEmployee.city}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Dirección:</span>
                      <span className="truncate max-w-[160px]">{selectedEmployee.address}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Seguridad Social Colombia (PILA) */}
              <div className="p-4 bg-slate-950/70 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-slate-200 flex items-center gap-1.5 text-xs">
                    <Shield className="w-4 h-4 text-emerald-400" />
                    <span>Afiliaciones al Sistema de Seguridad Social Integral (Colombia)</span>
                  </div>
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-300 px-2 py-0.5 rounded font-mono">
                    Planilla PILA Activa
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                    <span className="text-[11px] text-slate-400 block">EPS (Salud):</span>
                    <span className="font-medium text-slate-100">{selectedEmployee.eps}</span>
                  </div>
                  <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                    <span className="text-[11px] text-slate-400 block">AFP (Pensión):</span>
                    <span className="font-medium text-slate-100">{selectedEmployee.afp}</span>
                  </div>
                  <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                    <span className="text-[11px] text-slate-400 block">ARL (Riesgos Laborales):</span>
                    <span className="font-medium text-slate-100">
                      {selectedEmployee.arl} (Nivel {selectedEmployee.arlRiskLevel})
                    </span>
                  </div>
                  <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                    <span className="text-[11px] text-slate-400 block">Caja de Compensación:</span>
                    <span className="font-medium text-slate-100">{selectedEmployee.ccf}</span>
                  </div>
                  <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 sm:col-span-2">
                    <span className="text-[11px] text-slate-400 block">Fondo de Cesantías:</span>
                    <span className="font-medium text-slate-100">
                      {selectedEmployee.cesantiasFund}
                    </span>
                  </div>
                </div>
              </div>

              {/* Emergency Contact & Legal Dotación Eligibility */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-slate-950/50 rounded-lg border border-slate-800">
                  <div className="font-semibold text-slate-200 flex items-center gap-1.5 text-xs mb-2">
                    <Heart className="w-3.5 h-3.5 text-rose-400" />
                    <span>Contacto de Emergencia (SST)</span>
                  </div>
                  <p className="text-slate-200 font-medium">
                    {selectedEmployee.emergencyContactName}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Parentesco: {selectedEmployee.emergencyContactRelationship}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Teléfono: {selectedEmployee.emergencyContactPhone}
                  </p>
                </div>

                <div className="p-3 bg-slate-950/50 rounded-lg border border-slate-800">
                  <div className="font-semibold text-slate-200 flex items-center gap-1.5 text-xs mb-2">
                    <FileBadge className="w-3.5 h-3.5 text-amber-400" />
                    <span>Dotación Legal (CST Art. 230)</span>
                  </div>
                  {(() => {
                    const days = getDaysWorked(selectedEmployee.hireDate);
                    const check = checkDotacionEligibility(selectedEmployee.baseSalary, days);
                    return (
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                              check.eligible
                                ? 'bg-emerald-500/20 text-emerald-300'
                                : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {check.eligible ? 'ELEGIBLE' : 'NO APLICA'}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-300 mt-1 leading-snug">
                          {check.reason}
                        </p>
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-xs text-slate-400 bg-slate-900 border border-slate-800 rounded-xl">
              Selecciona un colaborador de la lista para ver su información integral.
            </div>
          )}
        </div>
      </div>

      {/* Modal Add / Edit Employee */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-5 text-xs shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-400" />
                <span>
                  {editingEmployee ? 'Editar Colaborador' : 'Registrar Nuevo Colaborador'}
                </span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white text-base"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              {/* Row 1: Document */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Tipo Documento</label>
                  <select
                    value={formData.documentType}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        documentType: e.target.value as 'CC' | 'CE' | 'PPT' | 'TI',
                      })
                    }
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-100"
                  >
                    <option value="CC">Cédula de Ciudadanía (CC)</option>
                    <option value="CE">Cédula de Extranjería (CE)</option>
                    <option value="PPT">Permiso por Protección Temporal (PPT)</option>
                    <option value="TI">Tarjeta de Identidad (TI)</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-slate-300 mb-1">Número de Documento *</label>
                  <input
                    type="text"
                    required
                    value={formData.documentNumber}
                    onChange={(e) => setFormData({ ...formData, documentNumber: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-100 font-mono"
                    placeholder="Ej. 1018492041"
                  />
                </div>
              </div>

              {/* Row 2: Names */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Nombres *</label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-100"
                    placeholder="Ej. Carlos Andrés"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Apellidos *</label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-100"
                    placeholder="Ej. Vargas Silva"
                  />
                </div>
              </div>

              {/* Row 3: Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Correo Electrónico</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-100"
                    placeholder="carlos@empresa.com"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Teléfono Móvil</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-100"
                    placeholder="310 123 4567"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Ciudad</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-100"
                  />
                </div>
              </div>

              {/* Row 4: Cargo y Contrato */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Cargo</label>
                  <input
                    type="text"
                    required
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-100"
                    placeholder="Desarrollador Junior"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Departamento / Área</label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Tipo de Contrato CST</label>
                  <select
                    value={formData.contractType}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contractType: e.target.value as ContractType,
                      })
                    }
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-100"
                  >
                    <option value="Término Indefinido">Término Indefinido</option>
                    <option value="Término Fijo">Término Fijo</option>
                    <option value="Obra o Labor">Obra o Labor</option>
                    <option value="Aprendizaje SENA">Aprendizaje SENA</option>
                    <option value="Prestación de Servicios">Prestación de Servicios</option>
                  </select>
                </div>
              </div>

              {/* Row 5: Salario y Fechas */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Salario Base Mensual (COP)</label>
                  <input
                    type="number"
                    min="0"
                    step="50000"
                    required
                    value={formData.baseSalary}
                    onChange={(e) =>
                      setFormData({ ...formData, baseSalary: Number(e.target.value) })
                    }
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-100 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Fecha de Ingreso</label>
                  <input
                    type="date"
                    required
                    value={formData.hireDate}
                    onChange={(e) => setFormData({ ...formData, hireDate: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Estado</label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status: e.target.value as EmployeeStatus,
                      })
                    }
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-100"
                  >
                    <option value="ACTIVO">Activo</option>
                    <option value="VACACIONES">Vacaciones</option>
                    <option value="INCAPACITADO">Incapacitado</option>
                    <option value="RETIRADO">Retirado</option>
                  </select>
                </div>
              </div>

              {/* Row 6: Seguridad Social Colombia */}
              <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800 space-y-2.5">
                <span className="font-semibold text-emerald-400 block text-xs">
                  Seguridad Social Integral (PILA)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-0.5">EPS</label>
                    <input
                      type="text"
                      value={formData.eps}
                      onChange={(e) => setFormData({ ...formData, eps: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 text-slate-100"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-0.5">Fondo Pensión</label>
                    <input
                      type="text"
                      value={formData.afp}
                      onChange={(e) => setFormData({ ...formData, afp: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 text-slate-100"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-0.5">ARL</label>
                    <input
                      type="text"
                      value={formData.arl}
                      onChange={(e) => setFormData({ ...formData, arl: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 text-slate-100"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-0.5">Caja Compensación</label>
                    <input
                      type="text"
                      value={formData.ccf}
                      onChange={(e) => setFormData({ ...formData, ccf: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 text-slate-100"
                    />
                  </div>
                </div>
              </div>

              {/* Row 7: Contacto de Emergencia */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Contacto Emergencia</label>
                  <input
                    type="text"
                    value={formData.emergencyContactName}
                    onChange={(e) =>
                      setFormData({ ...formData, emergencyContactName: e.target.value })
                    }
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-100"
                    placeholder="Nombre familiar"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Teléfono Emergencia</label>
                  <input
                    type="text"
                    value={formData.emergencyContactPhone}
                    onChange={(e) =>
                      setFormData({ ...formData, emergencyContactPhone: e.target.value })
                    }
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-100"
                    placeholder="300 000 0000"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Parentesco</label>
                  <input
                    type="text"
                    value={formData.emergencyContactRelationship}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        emergencyContactRelationship: e.target.value,
                      })
                    }
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-100"
                  />
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded font-medium transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded font-medium transition shadow-sm"
                >
                  {editingEmployee ? 'Guardar Cambios' : 'Registrar Colaborador'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
