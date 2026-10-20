/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Cpu,
  Database,
  Layers,
  Shield,
  FileCode,
  GitBranch,
  BookOpen,
  CheckCircle2,
  Server,
  Cloud,
  Lock,
  ArrowRight,
  Boxes,
  HelpCircle,
  Award,
} from 'lucide-react';

export const ArquitecturaModule: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'conceptual' | 'arquitectura' | 'mer' | 'marcoLegal' | 'escalabilidad'>('conceptual');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 p-6 rounded-xl border border-teal-500/30 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-500/20 text-teal-300 border border-teal-500/40 mb-2">
              <Cpu className="w-3.5 h-3.5" />
              <span>Documento de Ingeniería de Software & Arquitectura de Sistemas</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
              Diseño Conceptual y Estructura de la Aplicación Web Modular
            </h1>
            <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Propuesta técnica integral formulada por un Ingeniero de Sistemas especialista en
              gestión del talento humano para microempresas en Colombia. Arquitectura modular desacoplada,
              Modelo Entidad-Relación (MER), cumplimiento legal CST/SST y hoja de ruta tecnológica escalable.
            </p>
          </div>

          <div className="shrink-0 bg-slate-950/80 p-3 rounded-lg border border-teal-700/40 text-xs space-y-1">
            <span className="text-slate-400 block text-[11px]">Enfoque de Negocio:</span>
            <div className="font-bold text-teal-300">Microempresa Colombiana</div>
            <div className="text-[11px] text-slate-300">≤ 10 trabajadores • Costo optimizado</div>
          </div>
        </div>
      </div>

      {/* Navigation Pills */}
      <div className="flex flex-wrap items-center gap-2 bg-slate-900/80 p-2 rounded-xl border border-slate-800 text-xs">
        <button
          onClick={() => setActiveSection('conceptual')}
          className={`px-3 py-2 rounded-lg font-medium transition flex items-center gap-1.5 ${
            activeSection === 'conceptual'
              ? 'bg-teal-600 text-white shadow-sm'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
          }`}
        >
          <Boxes className="w-3.5 h-3.5" />
          <span>1. Diseño Conceptual & Módulos</span>
        </button>

        <button
          onClick={() => setActiveSection('arquitectura')}
          className={`px-3 py-2 rounded-lg font-medium transition flex items-center gap-1.5 ${
            activeSection === 'arquitectura'
              ? 'bg-teal-600 text-white shadow-sm'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>2. Arquitectura de Software</span>
        </button>

        <button
          onClick={() => setActiveSection('mer')}
          className={`px-3 py-2 rounded-lg font-medium transition flex items-center gap-1.5 ${
            activeSection === 'mer'
              ? 'bg-teal-600 text-white shadow-sm'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
          }`}
        >
          <Database className="w-3.5 h-3.5" />
          <span>3. Modelo de Datos (MER)</span>
        </button>

        <button
          onClick={() => setActiveSection('marcoLegal')}
          className={`px-3 py-2 rounded-lg font-medium transition flex items-center gap-1.5 ${
            activeSection === 'marcoLegal'
              ? 'bg-teal-600 text-white shadow-sm'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
          }`}
        >
          <Shield className="w-3.5 h-3.5" />
          <span>4. Marco Legal Colombiano</span>
        </button>

        <button
          onClick={() => setActiveSection('escalabilidad')}
          className={`px-3 py-2 rounded-lg font-medium transition flex items-center gap-1.5 ${
            activeSection === 'escalabilidad'
              ? 'bg-teal-600 text-white shadow-sm'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
          }`}
        >
          <Cloud className="w-3.5 h-3.5" />
          <span>5. Escalabilidad & Despliegue</span>
        </button>
      </div>

      {/* SECTION 1: DISEÑO CONCEPTUAL */}
      {activeSection === 'conceptual' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Boxes className="w-5 h-5 text-teal-400" />
              <span>Visión del Producto & Necesidades de la Microempresa en Colombia</span>
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Las microempresas en Colombia (definidas según el Decreto 957 de 2019 por ingresos o de 1 a 10 trabajadores)
              enfrentan un desafío crítico: la legislación laboral y de seguridad social es tan rigurosa como la de una
              gran corporación, pero disponen de recursos administrativos, tecnológicos y presupuestales mínimos.
              Frecuentemente el dueño o un asistente administrativo gestiona las contrataciones, nómina y SST en hojas
              de cálculo dispersas o carpetas físicas, arriesgando multas del Ministerio del Trabajo o la UGPP.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
                <span className="font-bold text-teal-400 text-xs">Simplicidad e Intuición</span>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Curva de aprendizaje cero para personal no especializado. Cálculos automáticos de horas extras y recargos
                  evitando fórmulas manuales complejas.
                </p>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
                <span className="font-bold text-teal-400 text-xs">Arquitectura Modular Desacoplada</span>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Cada uno de los 9 procesos opera como un módulo autocontenido. La microempresa puede iniciar usando solo
                  personal y novedades, e ir habilitando capacitación o clima según madure.
                </p>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
                <span className="font-bold text-teal-400 text-xs">Cumplimiento Legal Blindado</span>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Reglas de negocio basadas en el Código Sustantivo del Trabajo, jornada legal reducida (Ley 2101) y los
                  7 Estándares Mínimos obligatorios del SG-SST (Resolución 0312 de 2019).
                </p>
              </div>
            </div>
          </div>

          {/* 9 Modules Matrix */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-white">Desglose Conceptual de los 9 Módulos Funcionales</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              {[
                {
                  id: '1',
                  name: 'Datos Básicos del Personal',
                  color: 'text-blue-400',
                  desc: 'Maestro de empleados, tipos de contrato CST (Fijo, Indefinido, Obra, Aprendizaje, Servicios), afiliación PILA (EPS, AFP, ARL I-V, CCF).',
                },
                {
                  id: '2',
                  name: 'Documentación del Personal',
                  color: 'text-amber-400',
                  desc: 'Expediente digital, alertas de vigencia de exámenes médicos ocupacionales y contratos laborales según Decreto 1072.',
                },
                {
                  id: '3',
                  name: 'Información Familiar',
                  color: 'text-rose-400',
                  desc: 'Registro de cónyuges e hijos dependientes, validación de subsidio cuota monetaria CCF y contactos de emergencia para SST.',
                },
                {
                  id: '4',
                  name: 'Novedades de Nómina',
                  color: 'text-emerald-400',
                  desc: 'Liquidador automatizado: HED (+25%), HEN (+75%), festivas (+100%/+150%), recargos nocturnos (+35%), incapacidades EPS/ARL con base en Ley 2101 (divisor 230).',
                },
                {
                  id: '5',
                  name: 'Capacitación (Plan PIC)',
                  color: 'text-indigo-400',
                  desc: 'Cronograma anual de capacitaciones obligatorias de SG-SST (primeros auxilios, evacuación) y técnicas, horas acumuladas y eficacia.',
                },
                {
                  id: '6',
                  name: 'Reclutamiento y Selección',
                  color: 'text-purple-400',
                  desc: 'Publicación de vacantes, embudo Kanban de candidatos, examen médico osteomuscular de ingreso y contratación directa.',
                },
                {
                  id: '7',
                  name: 'Bienestar Laboral',
                  color: 'text-pink-400',
                  desc: 'Pausas activas con la ARL, Día de la Familia (Ley 1857 de 2017), cumpleaños, reconocimientos y presupuesto ejecutado.',
                },
                {
                  id: '8',
                  name: 'SG-SST (Res. 0312 de 2019)',
                  color: 'text-orange-400',
                  desc: 'Evaluación de los 7 estándares para ≤10 trabajadores en riesgo I-II-III, gestión del Vigía de SST, reporte de incidentes/FURAT y dotación CST Art. 230.',
                },
                {
                  id: '9',
                  name: 'Clima Organizacional',
                  color: 'text-teal-400',
                  desc: 'Medición periódica por dimensiones (liderazgo, ergonomía, compensación), comparación contra benchmark y planes de acción.',
                },
              ].map((m) => (
                <div key={m.id} className="p-3 bg-slate-950/70 border border-slate-800 rounded-lg space-y-1">
                  <span className={`font-bold ${m.color} text-xs block`}>
                    Módulo {m.id}: {m.name}
                  </span>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: ARQUITECTURA DE SOFTWARE */}
      {activeSection === 'arquitectura' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-teal-400" />
              <span>Arquitectura Modular por Capas (Clean & Modular Architecture)</span>
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Para garantizar que una microempresa no dependa de un servidor dedicado costoso ni de mantenimiento complejo,
              se adoptó un patrón de <strong>Monolito Modular / Single Page Application con Backend Serverless</strong>.
              Esto permite costo $0 de cómputo en periodos de inactividad, escalando automáticamente cuando se requiere.
            </p>

            {/* Visual Diagram */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3 font-mono text-xs">
              <div className="p-3 bg-slate-900 rounded-lg border border-blue-500/30 text-blue-300">
                <div className="font-bold flex items-center justify-between">
                  <span>1. CAPA DE PRESENTACIÓN (CLIENTE SPA - REACT 19 + TYPESCRIPT + TAILWIND)</span>
                  <span className="text-[10px] bg-blue-950 px-2 py-0.5 rounded text-blue-200">Browser / PWA</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Componentes desacoplados por módulo: Personal, Nómina, SST, Clima. Interfaz accesible, responsiva para móviles.
                </div>
              </div>

              <div className="flex justify-center text-teal-400 font-bold">↓ Eventos & Invocaciones REST / RPC ↓</div>

              <div className="p-3 bg-slate-900 rounded-lg border border-teal-500/30 text-teal-300">
                <div className="font-bold flex items-center justify-between">
                  <span>2. CAPA DE LÓGICA DE NEGOCIO & REGLAS LABORALES (COLOMBIA CST / SST ENGINE)</span>
                  <span className="text-[10px] bg-teal-950 px-2 py-0.5 rounded text-teal-200">Pure Functions / Handlers</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  • Liquidador CST: cálculo de horas extras con factores 1.25, 1.75, 2.0, 2.5 y divisor 230 (Ley 2101).<br />
                  • Evaluador de Dotación: CST Art. 230 (&lt;= 2 SMMLV y &gt;90 días).<br />
                  • Motor de Estándares Mínimos: Resolución 0312 para &lt;= 10 empleados.
                </div>
              </div>

              <div className="flex justify-center text-emerald-400 font-bold">↓ Persistencia Transaccional ↓</div>

              <div className="p-3 bg-slate-900 rounded-lg border border-emerald-500/30 text-emerald-300">
                <div className="font-bold flex items-center justify-between">
                  <span>3. CAPA DE DATOS (POSTGRESQL / SQLITE / FIRESTORE)</span>
                  <span className="text-[10px] bg-emerald-950 px-2 py-0.5 rounded text-emerald-200">ACID Relational Storage</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Tablas normalizadas en 3FN con claves foráneas, índices por documento de identidad y auditoría de cambios.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: MODELO ENTIDAD-RELACIÓN (MER) */}
      {activeSection === 'mer' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Database className="w-5 h-5 text-teal-400" />
              <span>Modelo Entidad-Relación (MER) y Diccionario de Datos</span>
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              El diseño relacional pivota sobre la entidad <strong>Empleado</strong> con relaciones 1:N fuertemente
              tipadas para garantizar la integridad referencial y evitar la duplicación de datos.
            </p>

            {/* Relational Table Breakdown */}
            <div className="space-y-4 text-xs">
              {/* Empleado */}
              <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="font-bold text-blue-400 text-sm font-mono">TABLA: Empleado</span>
                  <span className="text-[11px] text-slate-400">Entidad Maestra Central</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 mt-2 text-[11px] font-mono text-slate-300">
                  <div><strong>id (PK):</strong> VARCHAR(36)</div>
                  <div><strong>tipo_documento:</strong> ENUM(CC,CE,PPT)</div>
                  <div><strong>numero_doc:</strong> VARCHAR(20) [UNIQUE]</div>
                  <div><strong>salario_base:</strong> NUMERIC(12,2)</div>
                  <div><strong>tipo_contrato:</strong> VARCHAR(50)</div>
                  <div><strong>eps / afp / arl:</strong> VARCHAR(80)</div>
                  <div><strong>riesgo_arl:</strong> INTEGER(1..5)</div>
                  <div><strong>estado:</strong> ENUM(ACTIVO,VAC,INC)</div>
                </div>
              </div>

              {/* DocumentoEmpleado */}
              <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="font-bold text-amber-400 text-sm font-mono">TABLA: DocumentoEmpleado (1:N Empleado)</span>
                  <span className="text-[11px] text-slate-400">Expediente Digital</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 mt-2 text-[11px] font-mono text-slate-300">
                  <div><strong>id (PK):</strong> VARCHAR(36)</div>
                  <div><strong>empleado_id (FK):</strong> VARCHAR(36)</div>
                  <div><strong>tipo_doc:</strong> ENUM(CONTRATO,MEDICO,HV)</div>
                  <div><strong>fecha_vencimiento:</strong> DATE NULL</div>
                  <div><strong>estado:</strong> ENUM(VIGENTE,VENCIDO)</div>
                  <div><strong>archivo_url:</strong> TEXT</div>
                </div>
              </div>

              {/* NovedadNomina */}
              <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="font-bold text-emerald-400 text-sm font-mono">TABLA: NovedadNomina (1:N Empleado)</span>
                  <span className="text-[11px] text-slate-400">Transaccional Nómina CST</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 mt-2 text-[11px] font-mono text-slate-300">
                  <div><strong>id (PK):</strong> VARCHAR(36)</div>
                  <div><strong>empleado_id (FK):</strong> VARCHAR(36)</div>
                  <div><strong>tipo_novedad:</strong> ENUM(HED,HEN,RN,INC)</div>
                  <div><strong>cantidad:</strong> NUMERIC(6,2)</div>
                  <div><strong>tarifa_unitaria:</strong> NUMERIC(12,2)</div>
                  <div><strong>monto_total:</strong> NUMERIC(12,2)</div>
                  <div><strong>asume:</strong> ENUM(EMPRESA,EPS,ARL)</div>
                  <div><strong>periodo:</strong> VARCHAR(30)</div>
                </div>
              </div>

              {/* InformacionFamiliar */}
              <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="font-bold text-rose-400 text-sm font-mono">TABLA: InformacionFamiliar (1:N Empleado)</span>
                  <span className="text-[11px] text-slate-400">Beneficiarios y Seguridad</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 mt-2 text-[11px] font-mono text-slate-300">
                  <div><strong>id (PK):</strong> VARCHAR(36)</div>
                  <div><strong>empleado_id (FK):</strong> VARCHAR(36)</div>
                  <div><strong>parentesco:</strong> ENUM(HIJO,CONYUGE...)</div>
                  <div><strong>aplica_subsidio_ccf:</strong> BOOLEAN</div>
                  <div><strong>es_contacto_emergencia:</strong> BOOLEAN</div>
                  <div><strong>telefono:</strong> VARCHAR(20)</div>
                </div>
              </div>

              {/* IncidenteSST */}
              <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="font-bold text-orange-400 text-sm font-mono">TABLA: IncidenteSST (1:N Empleado opcional)</span>
                  <span className="text-[11px] text-slate-400">SG-SST & FURAT</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 mt-2 text-[11px] font-mono text-slate-300">
                  <div><strong>id (PK):</strong> VARCHAR(36)</div>
                  <div><strong>tipo:</strong> ENUM(ACCIDENTE,INCIDENTE)</div>
                  <div><strong>dias_perdidos:</strong> INTEGER</div>
                  <div><strong>reportado_arl:</strong> BOOLEAN</div>
                  <div><strong>furat_numero:</strong> VARCHAR(50) NULL</div>
                  <div><strong>acciones_correctivas:</strong> TEXT</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: MARCO LEGAL */}
      {activeSection === 'marcoLegal' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-teal-400" />
              <span>Marco Legal y Normativo de Talento Humano en Colombia</span>
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              La aplicación incorpora las siguientes leyes y resoluciones vigentes en su núcleo de cálculo y lógica:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
                <span className="font-bold text-emerald-400 block text-xs">
                  1. Código Sustantivo del Trabajo (CST)
                </span>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  • <strong>Art. 168:</strong> Tasas de recargo para trabajo nocturno (+35%), horas extras diurnas (+25%) y nocturnas (+75%).<br />
                  • <strong>Art. 179:</strong> Remuneración del trabajo en domingos y festivos con un recargo del 75%.<br />
                  • <strong>Art. 230:</strong> Dotación de calzado y vestido de labor para salarios hasta 2 SMMLV con antigüedad &gt; 3 meses (entregas en abril, agosto y diciembre).
                </p>
              </div>

              <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
                <span className="font-bold text-emerald-400 block text-xs">
                  2. Ley 2101 de 2021 (Reducción de Jornada Laboral)
                </span>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Reduce gradualmente la jornada ordinaria máxima semanal de 48 a 42 horas sin disminuir el salario.<br />
                  Ajusta el divisor de cálculo de la hora ordinaria (de 240 a 230 horas mensuales en la fase intermedia de 46 horas/semana), incrementando el valor proporcional de las horas extras.
                </p>
              </div>

              <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
                <span className="font-bold text-emerald-400 block text-xs">
                  3. Resolución 0312 de 2019 (Estándares Mínimos SG-SST)
                </span>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Diseñado para no asfixiar a las microempresas: exige solo <strong>7 Estándares Mínimos</strong> para empresas con ≤ 10 colaboradores clasificadas en riesgo I, II o III, en lugar de los 60 estándares de las grandes empresas, y permite designar un <strong>Vigía de SST</strong> en vez de un COPASST completo.
                </p>
              </div>

              <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
                <span className="font-bold text-emerald-400 block text-xs">
                  4. Ley 1857 de 2017 & Ley 1581 de 2012
                </span>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  • <strong>Ley 1857:</strong> Obliga a otorgar una jornada semestral remunerada a los trabajadores para compartir con su núcleo familiar (Día de la Familia).<br />
                  • <strong>Ley 1581 (Habeas Data):</strong> Protección estricta de datos personales y sensibles (hojas de vida, información de salud y composición familiar).
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 5: ESCALABILIDAD & DESPLIEGUE */}
      {activeSection === 'escalabilidad' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Cloud className="w-5 h-5 text-teal-400" />
              <span>Hoja de Ruta de Escalabilidad & Costos Operativos para la Microempresa</span>
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              La viabilidad técnica de una solución web para microempresas depende de mantener costos fijos cercanos a cero
              y facilitar la transición digital sin inversiones exorbitantes en licencias.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
                <div className="font-bold text-teal-300 text-xs">Fase 1: Digitalización Básica (Actual)</div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  • Control unificado de los 9 procesos en un único portal web.<br />
                  • Base de datos transaccional con respaldo en la nube.<br />
                  • Costo mensual estimado: <strong>$0 USD (Free Tier Serverless)</strong>.
                </p>
              </div>

              <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
                <div className="font-bold text-blue-300 text-xs">Fase 2: Conectores Automáticos (Mediano Plazo)</div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  • Conexión mediante API REST con proveedores de Nómina Electrónica autorizados por la DIAN.<br />
                  • Generación de archivo plano estructurado para pago de PILA (SOI, Aportes en Línea, MiPlanilla).<br />
                  • Notificaciones de vencimiento vía WhatsApp / Correo electrónico.
                </p>
              </div>

              <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
                <div className="font-bold text-purple-300 text-xs">Fase 3: Autoservicio Móvil del Empleado (PWA)</div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  • Portal del empleado para consultar desprendibles de pago, solicitar vacaciones y reportar actos inseguros desde el celular.<br />
                  • Firma digital biométrica en el dispositivo móvil para contratos y dotación.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
