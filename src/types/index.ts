/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ModuleKey =
  | 'dashboard'
  | 'personal'
  | 'documentos'
  | 'familia'
  | 'novedades'
  | 'capacitacion'
  | 'reclutamiento'
  | 'bienestar'
  | 'sst'
  | 'clima'
  | 'arquitectura';

export type ContractType =
  | 'Término Fijo'
  | 'Término Indefinido'
  | 'Obra o Labor'
  | 'Aprendizaje SENA'
  | 'Prestación de Servicios';

export type EmployeeStatus = 'ACTIVO' | 'VACACIONES' | 'INCAPACITADO' | 'RETIRADO';

export interface Employee {
  id: string;
  documentType: 'CC' | 'CE' | 'PPT' | 'TI';
  documentNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  address: string;
  city: string;
  hireDate: string;
  position: string;
  department: string;
  contractType: ContractType;
  baseSalary: number;
  status: EmployeeStatus;
  // Seguridad Social Colombia
  eps: string;
  afp: string; // Fondo de pensiones
  arl: string; // Administradora de Riesgos Laborales
  arlRiskLevel: 1 | 2 | 3 | 4 | 5;
  ccf: string; // Caja de Compensación Familiar
  cesantiasFund: string;
  // Contacto de Emergencia
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelationship: string;
}

export type DocumentType =
  | 'HOJA_VIDA'
  | 'DOCUMENTO_IDENTIDAD'
  | 'CONTRATO_LABORAL'
  | 'EXAMEN_MEDICO_OCUPACIONAL'
  | 'CERTIFICADO_EPS_AFP'
  | 'CERTIFICADO_ACADEMICO'
  | 'CERTIFICADO_BANCARIO'
  | 'RUT'
  | 'OTRO';

export type DocumentStatus = 'VIGENTE' | 'POR_VENCER' | 'VENCIDO' | 'PENDIENTE';

export interface EmployeeDocument {
  id: string;
  employeeId: string;
  employeeName: string;
  type: DocumentType;
  name: string;
  fileName: string;
  fileSize: string;
  uploadDate: string;
  expiryDate?: string;
  status: DocumentStatus;
  notes?: string;
}

export interface FamilyMember {
  id: string;
  employeeId: string;
  employeeName: string;
  fullName: string;
  relationship: 'Hijo(a)' | 'Cónyuge / Compañero(a)' | 'Padre' | 'Madre' | 'Hermano(a)' | 'Otro';
  documentNumber: string;
  birthDate: string;
  isDependent: boolean;
  receivesCCFAllowance: boolean; // Subsidio cuota monetaria de Caja de Compensación
  isEmergencyContact: boolean;
  phone?: string;
  occupation?: string;
}

export interface PayrollNovelty {
  id: string;
  employeeId: string;
  employeeName: string;
  period: string; // ej. "2026-10 (Segunda Quincena)"
  date: string;
  type:
    | 'HORA_EXTRA_DIURNA'
    | 'HORA_EXTRA_NOCTURNA'
    | 'HORA_EXTRA_FESTIVA_DIURNA'
    | 'HORA_EXTRA_FESTIVA_NOCTURNA'
    | 'RECARGO_NOCTURNO'
    | 'RECARGO_DOMINICAL_FESTIVO'
    | 'INCAPACIDAD_GENERAL'
    | 'INCAPACIDAD_LABORAL'
    | 'LICENCIA_MATERNIDAD_PATERNIDAD'
    | 'LICENCIA_NO_REMUNERADA'
    | 'VACACIONES'
    | 'BONIFICACION'
    | 'OTRA_DEDUCCION';
  quantity: number; // Horas para extras, días para incapacidades, etc.
  unitRate: number;
  calculatedAmount: number;
  notes: string;
  status: 'PENDIENTE' | 'APROBADA' | 'LIQUIDADA';
  payer: 'EMPRESA' | 'EPS' | 'ARL' | 'NA';
}

export interface TrainingPlan {
  id: string;
  title: string;
  topic: 'SST_OBLIGATORIA' | 'HABILIDADES_TECNICAS' | 'HABILIDADES_BLANDAS' | 'SEGURIDAD_INFORMACION' | 'CALIDAD_PROCESOS';
  facilitator: string;
  targetAudience: string;
  scheduledDate: string;
  durationHours: number;
  status: 'PROGRAMADA' | 'EN_CURSO' | 'COMPLETADA' | 'CANCELADA';
  location: string;
  objectives: string;
  attendeesCount: number;
  totalTargetEmployees: number;
  effectivenessScore?: number; // 0 - 100%
}

export interface JobVacancy {
  id: string;
  title: string;
  department: string;
  vacanciesCount: number;
  salaryRange: string;
  contractType: ContractType;
  status: 'ABIERTA' | 'EN_PROCESO' | 'CERRADA';
  publishedDate: string;
  closingDate: string;
  requirements: string[];
  description: string;
}

export interface Candidate {
  id: string;
  jobId: string;
  jobTitle: string;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  applicationDate: string;
  stage:
    | 'POSTULACION'
    | 'REVISION_HV'
    | 'ENTREVISTA'
    | 'PRUEBA_TECNICA'
    | 'EXAMEN_MEDICO'
    | 'CONTRATADO'
    | 'NO_SELECCIONADO';
  score: number; // 1-5
  notes: string;
}

export interface WellnessActivity {
  id: string;
  title: string;
  category: 'INTEGRACION' | 'PAUSA_ACTIVA' | 'SALUD_FISICA' | 'RECONOCIMIENTO' | 'DIA_FAMILIA' | 'CUMPLEANOS';
  date: string;
  time: string;
  budgetEstimated: number;
  budgetSpent: number;
  attendeesCount: number;
  description: string;
  status: 'PLANIFICADA' | 'REALIZADA' | 'CANCELADA';
  impactLevel: 'ALTO' | 'MEDIO' | 'MODERADO';
}

export interface SstStandard {
  id: string;
  code: string;
  standardName: string;
  category: string;
  status: 'CUMPLE' | 'EN_PROCESO' | 'NO_CUMPLE';
  evidenceSummary: string;
  percentage: number;
}

export interface SstIncident {
  id: string;
  date: string;
  type: 'ACCIDENTE_TRABAJO' | 'INCIDENTE' | 'ACTO_INSEGURO' | 'CONDICION_INSEGURA';
  employeeId?: string;
  employeeName?: string;
  description: string;
  severity: 'LEVE' | 'MODERADO' | 'GRAVE';
  daysLost: number;
  correctiveActions: string;
  status: 'REPORTADO' | 'INVESTIGACION' | 'CERRADO';
  reportedToArl: boolean;
  furatNumber?: string;
}

export interface SstDotacion {
  id: string;
  employeeId: string;
  employeeName: string;
  period: 'Abril' | 'Agosto' | 'Diciembre';
  year: number;
  deliveryDate: string;
  shoesDelivered: boolean;
  clothesDelivered: boolean;
  receivedSignature: boolean;
  notes: string;
}

export interface ClimateDimension {
  name: string;
  score: number; // 1-100%
  benchmark: number;
  status: 'SATISFACTORIO' | 'EN_ALERTA' | 'CRITICO';
  keyQuestion: string;
}

export interface ClimateSurvey {
  id: string;
  period: string;
  date: string;
  overallScore: number;
  participationRate: number;
  responsesCount: number;
  totalEmployees: number;
  dimensions: ClimateDimension[];
  actionPlans: {
    id: string;
    action: string;
    dimension: string;
    responsible: string;
    deadline: string;
    status: 'PENDIENTE' | 'EN_CURSO' | 'FINALIZADO';
  }[];
}
