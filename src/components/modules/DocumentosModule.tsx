/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  FileText,
  UploadCloud,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Download,
  Eye,
  Trash2,
  Plus,
  ShieldCheck,
  FileCheck2,
} from 'lucide-react';
import { Employee, EmployeeDocument, DocumentType, DocumentStatus } from '../../types';

interface DocumentosModuleProps {
  documents: EmployeeDocument[];
  employees: Employee[];
  onAddDocument: (doc: EmployeeDocument) => void;
  onDeleteDocument: (id: string) => void;
  searchTerm: string;
}

export const DocumentosModule: React.FC<DocumentosModuleProps> = ({
  documents,
  employees,
  onAddDocument,
  onDeleteDocument,
  searchTerm,
}) => {
  const [employeeFilter, setEmployeeFilter] = useState<string>('TODOS');
  const [typeFilter, setTypeFilter] = useState<string>('TODOS');
  const [statusFilter, setStatusFilter] = useState<string>('TODOS');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewDoc, setPreviewDoc] = useState<EmployeeDocument | null>(null);

  // New Doc Form
  const [formEmployeeId, setFormEmployeeId] = useState(employees[0]?.id || '');
  const [formType, setFormType] = useState<DocumentType>('CONTRATO_LABORAL');
  const [formName, setFormName] = useState('');
  const [formFileName, setFormFileName] = useState('');
  const [formExpiryDate, setFormExpiryDate] = useState('');
  const [formNotes, setFormNotes] = useState('');

  const filteredDocs = documents.filter((doc) => {
    const matchesSearch =
      `${doc.name} ${doc.employeeName} ${doc.fileName} ${doc.type}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    const matchesEmp = employeeFilter === 'TODOS' || doc.employeeId === employeeFilter;
    const matchesType = typeFilter === 'TODOS' || doc.type === typeFilter;
    const matchesStatus = statusFilter === 'TODOS' || doc.status === statusFilter;
    return matchesSearch && matchesEmp && matchesType && matchesStatus;
  });

  const handleOpenAdd = () => {
    setFormEmployeeId(employees[0]?.id || '');
    setFormType('CONTRATO_LABORAL');
    setFormName('');
    setFormFileName('');
    setFormExpiryDate('');
    setFormNotes('');
    setIsModalOpen(true);
  };

  const handleCreateDocument = (e: React.FormEvent) => {
    e.preventDefault();
    const emp = employees.find((e) => e.id === formEmployeeId);
    if (!emp || !formName) return;

    const newDoc: EmployeeDocument = {
      id: `doc-${Date.now()}`,
      employeeId: emp.id,
      employeeName: `${emp.firstName} ${emp.lastName}`,
      type: formType,
      name: formName,
      fileName: formFileName || `${formName.replace(/\s+/g, '_')}.pdf`,
      fileSize: '1.2 MB',
      uploadDate: new Date().toISOString().split('T')[0],
      expiryDate: formExpiryDate || undefined,
      status: formExpiryDate && new Date(formExpiryDate) < new Date() ? 'VENCIDO' : 'VIGENTE',
      notes: formNotes,
    };

    onAddDocument(newDoc);
    setIsModalOpen(false);
  };

  const docTypeLabels: Record<DocumentType, string> = {
    HOJA_VIDA: 'Hoja de Vida',
    DOCUMENTO_IDENTIDAD: 'Documento de Identidad',
    CONTRATO_LABORAL: 'Contrato Laboral Firmado',
    EXAMEN_MEDICO_OCUPACIONAL: 'Examen Médico Ocupacional',
    CERTIFICADO_EPS_AFP: 'Certificado EPS / AFP',
    CERTIFICADO_ACADEMICO: 'Certificado Académico',
    CERTIFICADO_BANCARIO: 'Certificado Bancario',
    RUT: 'RUT DIAN',
    OTRO: 'Otro Documento',
  };

  return (
    <div className="space-y-5">
      {/* Module Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900 p-4 rounded-xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
              <FileText className="w-5 h-5" />
            </div>
            <h1 className="text-base font-bold text-white">
              Módulo 2: Documentación del Personal
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Expediente digital de colaboradores: contratos laborales, conceptos médicos ocupacionales (SG-SST),
            certificados de seguridad social y soportes requeridos por el Ministerio del Trabajo.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-3.5 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-semibold flex items-center gap-2 transition self-start sm:self-auto shadow-sm"
        >
          <UploadCloud className="w-4 h-4" />
          <span>Cargar Documento</span>
        </button>
      </div>

      {/* Summary KPI row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg flex items-center gap-3">
          <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400">Total Archivos</div>
            <div className="text-base font-bold text-white">{documents.length}</div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg flex items-center gap-3">
          <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400">Documentos Vigentes</div>
            <div className="text-base font-bold text-emerald-400">
              {documents.filter((d) => d.status === 'VIGENTE').length}
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg flex items-center gap-3">
          <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400">Por Vencer (&lt;30 días)</div>
            <div className="text-base font-bold text-amber-400">
              {documents.filter((d) => d.status === 'POR_VENCER').length}
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg flex items-center gap-3">
          <div className="p-2 bg-rose-500/10 text-rose-400 rounded-lg">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400">Vencidos / Críticos</div>
            <div className="text-base font-bold text-rose-400">
              {documents.filter((d) => d.status === 'VENCIDO').length}
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
          <span className="text-slate-400">Tipo:</span>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-slate-200 rounded px-2 py-1"
          >
            <option value="TODOS">Todos los tipos</option>
            {Object.entries(docTypeLabels).map(([key, label]) => (
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
            <option value="TODOS">Todos los estados</option>
            <option value="VIGENTE">Vigente</option>
            <option value="POR_VENCER">Por Vencer</option>
            <option value="VENCIDO">Vencido</option>
          </select>
        </div>
      </div>

      {/* Documents Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/60 text-slate-400 border-b border-slate-800 text-[11px] uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3 font-semibold">Documento / Archivo</th>
                <th className="px-4 py-3 font-semibold">Colaborador</th>
                <th className="px-4 py-3 font-semibold">Tipo Legal</th>
                <th className="px-4 py-3 font-semibold">Carga / Vencimiento</th>
                <th className="px-4 py-3 font-semibold">Estado</th>
                <th className="px-4 py-3 font-semibold text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200">
              {filteredDocs.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-850/60 transition">
                  <td className="px-4 py-3">
                    <div className="font-semibold text-slate-100">{doc.name}</div>
                    <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                      <span>{doc.fileName}</span>
                      <span>•</span>
                      <span>{doc.fileSize}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-300">
                    {doc.employeeName}
                  </td>
                  <td className="px-4 py-3">
                    <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded text-[10px]">
                      {docTypeLabels[doc.type] || doc.type}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-slate-300">Cargado: {doc.uploadDate}</div>
                    {doc.expiryDate && (
                      <div className="text-[11px] text-amber-400 font-medium">
                        Vence: {doc.expiryDate}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${
                        doc.status === 'VIGENTE'
                          ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                          : doc.status === 'POR_VENCER'
                          ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                          : 'bg-rose-500/10 text-rose-300 border border-rose-500/20'
                      }`}
                    >
                      {doc.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setPreviewDoc(doc)}
                        className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded transition"
                        title="Ver detalle del documento"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          alert(`Descargando copia digital: ${doc.fileName}`);
                        }}
                        className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded transition"
                        title="Descargar documento"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`¿Eliminar ${doc.name}?`)) {
                            onDeleteDocument(doc.id);
                          }
                        }}
                        className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 rounded transition"
                        title="Eliminar documento"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredDocs.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-slate-400">
                    No se encontraron documentos con los filtros seleccionados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Upload Document */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-lg p-5 text-xs shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <UploadCloud className="w-4 h-4 text-amber-400" />
                <span>Cargar Documento al Expediente</span>
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateDocument} className="space-y-3.5">
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
                      {e.firstName} {e.lastName} ({e.documentType}: {e.documentNumber})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Tipo de Documento Legal *</label>
                <select
                  value={formType}
                  onChange={(e) => setFormType(e.target.value as DocumentType)}
                  className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-100"
                >
                  {Object.entries(docTypeLabels).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Título / Nombre del Documento *</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="Ej. Examen Médico Ocupacional Periódico 2026"
                  className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Nombre de Archivo Digital</label>
                  <input
                    type="text"
                    value={formFileName}
                    onChange={(e) => setFormFileName(e.target.value)}
                    placeholder="Certificado_Medico_2026.pdf"
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-100 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Fecha de Vencimiento</label>
                  <input
                    type="date"
                    value={formExpiryDate}
                    onChange={(e) => setFormExpiryDate(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Notas / Observaciones de Cumplimiento</label>
                <textarea
                  rows={2}
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  placeholder="Apto sin restricciones emitido por IPS autorizada por MinSalud..."
                  className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-100"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded font-medium"
                >
                  Guardar Documento
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Preview Document */}
      {previewDoc && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-lg p-5 text-xs shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-emerald-400" />
                <span>Expediente Digital: {previewDoc.name}</span>
              </h3>
              <button onClick={() => setPreviewDoc(null)} className="text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-400">Titular:</span>
                  <span className="font-semibold text-slate-100">{previewDoc.employeeName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Clasificación:</span>
                  <span className="text-slate-200">{docTypeLabels[previewDoc.type]}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Nombre de Archivo:</span>
                  <span className="font-mono text-slate-200">{previewDoc.fileName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Fecha de Carga:</span>
                  <span className="text-slate-200">{previewDoc.uploadDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Fecha de Vencimiento:</span>
                  <span className="text-amber-400 font-medium">
                    {previewDoc.expiryDate || 'No vence'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Estado de Vigencia:</span>
                  <span className="font-semibold text-emerald-400">{previewDoc.status}</span>
                </div>
              </div>

              {previewDoc.notes && (
                <div className="p-2.5 bg-slate-800/60 rounded border border-slate-700/60 text-slate-300">
                  <span className="font-medium text-slate-200 block mb-0.5">Observaciones:</span>
                  {previewDoc.notes}
                </div>
              )}

              <div className="pt-2 flex justify-end gap-2">
                <button
                  onClick={() => {
                    alert(`Descargando: ${previewDoc.fileName}`);
                    setPreviewDoc(null);
                  }}
                  className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded font-medium flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Descargar Archivo Digital</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
