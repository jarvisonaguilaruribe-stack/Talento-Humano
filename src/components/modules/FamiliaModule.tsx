/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  HeartHandshake,
  UserPlus,
  Users,
  Search,
  Filter,
  CheckCircle2,
  Phone,
  AlertCircle,
  Award,
  Sparkles,
  Calendar,
  Baby,
  Trash2,
  Heart,
} from 'lucide-react';
import { Employee, FamilyMember } from '../../types';

interface FamiliaModuleProps {
  families: FamilyMember[];
  employees: Employee[];
  onAddFamilyMember: (member: FamilyMember) => void;
  onDeleteFamilyMember: (id: string) => void;
  searchTerm: string;
}

export const FamiliaModule: React.FC<FamiliaModuleProps> = ({
  families,
  employees,
  onAddFamilyMember,
  onDeleteFamilyMember,
  searchTerm,
}) => {
  const [employeeFilter, setEmployeeFilter] = useState<string>('TODOS');
  const [relationshipFilter, setRelationshipFilter] = useState<string>('TODOS');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form
  const [formEmployeeId, setFormEmployeeId] = useState(employees[0]?.id || '');
  const [formFullName, setFormFullName] = useState('');
  const [formRelationship, setFormRelationship] = useState<FamilyMember['relationship']>('Hijo(a)');
  const [formDocNumber, setFormDocNumber] = useState('');
  const [formBirthDate, setFormBirthDate] = useState('2018-05-10');
  const [formIsDependent, setFormIsDependent] = useState(true);
  const [formReceivesCCF, setFormReceivesCCF] = useState(true);
  const [formIsEmergency, setFormIsEmergency] = useState(false);
  const [formPhone, setFormPhone] = useState('');
  const [formOccupation, setFormOccupation] = useState('');

  const filteredFamilies = families.filter((f) => {
    const matchesSearch =
      `${f.fullName} ${f.employeeName} ${f.relationship} ${f.documentNumber}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    const matchesEmp = employeeFilter === 'TODOS' || f.employeeId === employeeFilter;
    const matchesRel = relationshipFilter === 'TODOS' || f.relationship === relationshipFilter;
    return matchesSearch && matchesEmp && matchesRel;
  });

  const handleOpenAdd = () => {
    setFormEmployeeId(employees[0]?.id || '');
    setFormFullName('');
    setFormRelationship('Hijo(a)');
    setFormDocNumber('');
    setFormBirthDate('2018-05-10');
    setFormIsDependent(true);
    setFormReceivesCCF(true);
    setFormIsEmergency(false);
    setFormPhone('');
    setFormOccupation('');
    setIsModalOpen(true);
  };

  const handleCreateMember = (e: React.FormEvent) => {
    e.preventDefault();
    const emp = employees.find((e) => e.id === formEmployeeId);
    if (!emp || !formFullName) return;

    const newMember: FamilyMember = {
      id: `fam-${Date.now()}`,
      employeeId: emp.id,
      employeeName: `${emp.firstName} ${emp.lastName}`,
      fullName: formFullName,
      relationship: formRelationship,
      documentNumber: formDocNumber,
      birthDate: formBirthDate,
      isDependent: formIsDependent,
      receivesCCFAllowance: formReceivesCCF,
      isEmergencyContact: formIsEmergency,
      phone: formPhone,
      occupation: formOccupation,
    };

    onAddFamilyMember(newMember);
    setIsModalOpen(false);
  };

  const ccfBeneficiariesCount = families.filter((f) => f.receivesCCFAllowance).length;
  const emergencyContactsCount = families.filter((f) => f.isEmergencyContact).length;

  return (
    <div className="space-y-5">
      {/* Module Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900 p-4 rounded-xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h1 className="text-base font-bold text-white">
              Módulo 3: Información Familiar y Beneficiarios
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Registro del núcleo familiar de los colaboradores, gestión de beneficiarios para cuota monetaria
            de Caja de Compensación Familiar (CCF) y contactos de emergencia para SG-SST.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-3.5 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-semibold flex items-center gap-2 transition self-start sm:self-auto shadow-sm"
        >
          <UserPlus className="w-4 h-4" />
          <span>Registrar Familiar</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl flex items-center gap-3">
          <div className="p-2.5 bg-rose-500/10 text-rose-400 rounded-lg">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400">Total Familiares Registrados</div>
            <div className="text-base font-bold text-white">{families.length} personas</div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl flex items-center gap-3">
          <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-lg">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400">Beneficiarios Subsidio CCF</div>
            <div className="text-base font-bold text-emerald-400">
              {ccfBeneficiariesCount} beneficiarios
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl flex items-center gap-3">
          <div className="p-2.5 bg-blue-500/10 text-blue-400 rounded-lg">
            <Phone className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400">Contactos de Emergencia SST</div>
            <div className="text-base font-bold text-blue-400">
              {emergencyContactsCount} registrados
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-3 bg-slate-900/60 p-3 rounded-lg border border-slate-800 text-xs">
        <div className="flex items-center gap-1.5 text-slate-400">
          <Filter className="w-3.5 h-3.5" />
          <span>Filtrar por:</span>
        </div>

        <div className="flex items-center gap-1">
          <span className="text-slate-400">Colaborador:</span>
          <select
            value={employeeFilter}
            onChange={(e) => setEmployeeFilter(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-slate-200 rounded px-2 py-1"
          >
            <option value="TODOS">Todos los colaboradores</option>
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.firstName} {emp.lastName}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-1">
          <span className="text-slate-400">Parentesco:</span>
          <select
            value={relationshipFilter}
            onChange={(e) => setRelationshipFilter(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-slate-200 rounded px-2 py-1"
          >
            <option value="TODOS">Todos</option>
            <option value="Hijo(a)">Hijo(a)</option>
            <option value="Cónyuge / Compañero(a)">Cónyuge / Compañero(a)</option>
            <option value="Madre">Madre</option>
            <option value="Padre">Padre</option>
            <option value="Hermano(a)">Hermano(a)</option>
            <option value="Otro">Otro</option>
          </select>
        </div>
      </div>

      {/* Grid of Family Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredFamilies.map((fam) => (
          <div
            key={fam.id}
            className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs space-y-3 shadow-sm hover:border-slate-700 transition"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center justify-center font-bold">
                  {fam.relationship === 'Hijo(a)' ? (
                    <Baby className="w-4 h-4" />
                  ) : (
                    <Heart className="w-4 h-4" />
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-slate-100 text-xs">{fam.fullName}</h3>
                  <span className="text-[11px] text-rose-300 font-medium">
                    {fam.relationship}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  if (confirm(`¿Eliminar familiar ${fam.fullName}?`)) {
                    onDeleteFamilyMember(fam.id);
                  }
                }}
                className="text-slate-500 hover:text-rose-400 p-1"
                title="Eliminar"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-2.5 bg-slate-950/60 rounded-lg border border-slate-800/80 space-y-1 text-[11px]">
              <div className="flex justify-between">
                <span className="text-slate-400">Titular:</span>
                <span className="font-medium text-slate-200">{fam.employeeName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Documento:</span>
                <span className="font-mono text-slate-300">{fam.documentNumber || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Nacimiento:</span>
                <span className="text-slate-300">{fam.birthDate}</span>
              </div>
              {fam.occupation && (
                <div className="flex justify-between">
                  <span className="text-slate-400">Ocupación:</span>
                  <span className="text-slate-300">{fam.occupation}</span>
                </div>
              )}
              {fam.phone && (
                <div className="flex justify-between">
                  <span className="text-slate-400">Teléfono:</span>
                  <span className="text-slate-300 font-mono">{fam.phone}</span>
                </div>
              )}
            </div>

            {/* Badges for CCF & Emergency */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {fam.receivesCCFAllowance && (
                <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>Subsidio CCF</span>
                </span>
              )}
              {fam.isEmergencyContact && (
                <span className="px-2 py-0.5 rounded text-[10px] bg-blue-500/10 text-blue-300 border border-blue-500/20 font-medium flex items-center gap-1">
                  <Phone className="w-3 h-3 text-blue-400" />
                  <span>Contacto Emergencia</span>
                </span>
              )}
              {fam.isDependent && (
                <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300">
                  Dependiente Económico
                </span>
              )}
            </div>
          </div>
        ))}

        {filteredFamilies.length === 0 && (
          <div className="col-span-full p-8 text-center text-xs text-slate-400 bg-slate-900 border border-slate-800 rounded-xl">
            No se encontraron familiares con los filtros seleccionados.
          </div>
        )}
      </div>

      {/* Modal Add Family Member */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-lg p-5 text-xs shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <HeartHandshake className="w-4 h-4 text-rose-400" />
                <span>Registrar Familiar o Beneficiario</span>
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateMember} className="space-y-3.5">
              <div>
                <label className="block text-slate-300 mb-1">Colaborador Titular *</label>
                <select
                  required
                  value={formEmployeeId}
                  onChange={(e) => setFormEmployeeId(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-100"
                >
                  {employees.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.firstName} {e.lastName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Nombre Completo *</label>
                  <input
                    type="text"
                    required
                    value={formFullName}
                    onChange={(e) => setFormFullName(e.target.value)}
                    placeholder="Ej. Sofía Gómez Ospina"
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Parentesco *</label>
                  <select
                    value={formRelationship}
                    onChange={(e) =>
                      setFormRelationship(e.target.value as FamilyMember['relationship'])
                    }
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-100"
                  >
                    <option value="Hijo(a)">Hijo(a)</option>
                    <option value="Cónyuge / Compañero(a)">Cónyuge / Compañero(a)</option>
                    <option value="Madre">Madre</option>
                    <option value="Padre">Padre</option>
                    <option value="Hermano(a)">Hermano(a)</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Documento de Identidad</label>
                  <input
                    type="text"
                    value={formDocNumber}
                    onChange={(e) => setFormDocNumber(e.target.value)}
                    placeholder="1098..."
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-100 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Fecha de Nacimiento</label>
                  <input
                    type="date"
                    value={formBirthDate}
                    onChange={(e) => setFormBirthDate(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Teléfono Móvil</label>
                  <input
                    type="text"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    placeholder="310 000 0000"
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Ocupación / Escolaridad</label>
                  <input
                    type="text"
                    value={formOccupation}
                    onChange={(e) => setFormOccupation(e.target.value)}
                    placeholder="Estudiante, Empleado..."
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-100"
                  />
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formReceivesCCF}
                    onChange={(e) => setFormReceivesCCF(e.target.checked)}
                    className="rounded text-rose-600 focus:ring-rose-500"
                  />
                  <span className="text-slate-200">
                    Aplica a Subsidio Cuota Monetaria CCF (Caja de Compensación)
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formIsEmergency}
                    onChange={(e) => setFormIsEmergency(e.target.checked)}
                    className="rounded text-rose-600 focus:ring-rose-500"
                  />
                  <span className="text-slate-200">
                    Designar como Contacto Principal de Emergencia (SST)
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formIsDependent}
                    onChange={(e) => setFormIsDependent(e.target.checked)}
                    className="rounded text-rose-600 focus:ring-rose-500"
                  />
                  <span className="text-slate-200">Dependiente Económico del Colaborador</span>
                </label>
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
                  className="px-4 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded font-medium"
                >
                  Guardar Familiar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
