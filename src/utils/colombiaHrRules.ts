/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Reglas de Negocio de Talento Humano conforme a la legislación laboral colombiana
 * - Código Sustantivo del Trabajo (CST)
 * - Ley 2101 de 2021 (Reducción gradual de jornada laboral)
 * - Resolución 0312 de 2019 (Estándares mínimos SG-SST)
 * - Decreto 1072 de 2015 (Decreto Único Reglamentario del Sector Trabajo)
 */

// Valores de referencia legal Colombia (2026)
export const SMMLV_COLOMBIA_2026 = 1423500; // Salario Mínimo Mensual Legal Vigente
export const AUXILIO_TRANSPORTE_2026 = 162000;
export const HORAS_MES_ESTANDAR_LEY_2101 = 230; // Jornada reducida en transición legal

export type NoveltyType =
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

/**
 * Retorna el valor de una hora ordinaria de trabajo según salario base y divisor legal.
 */
export function calculateHourlyRate(baseSalary: number, monthlyHours = HORAS_MES_ESTANDAR_LEY_2101): number {
  if (baseSalary <= 0 || monthlyHours <= 0) return 0;
  return Math.round((baseSalary / monthlyHours) * 100) / 100;
}

/**
 * Factores de recargo según el Código Sustantivo del Trabajo de Colombia
 */
export const NOVELTY_FACTORS: Record<string, number> = {
  HORA_EXTRA_DIURNA: 1.25, // 25% de recargo
  HORA_EXTRA_NOCTURNA: 1.75, // 75% de recargo
  HORA_EXTRA_FESTIVA_DIURNA: 2.00, // Hora ordinaria + 75% dominical + 25% extra diurna = 200%
  HORA_EXTRA_FESTIVA_NOCTURNA: 2.50, // Hora ordinaria + 75% dominical + 75% extra nocturna = 250%
  RECARGO_NOCTURNO: 0.35, // Recargo del 35% sobre la hora ordinaria
  RECARGO_DOMINICAL_FESTIVO: 0.75, // Recargo del 75% sobre la hora ordinaria
};

/**
 * Calcula el monto a liquidar por una novedad laboral en Colombia.
 */
export function calculateNoveltyAmount(
  type: NoveltyType,
  quantity: number, // horas para extras/recargos, días para incapacidades/vacaciones, valor directo para bonificaciones
  baseSalary: number,
  monthlyHours = HORAS_MES_ESTANDAR_LEY_2101
): {
  amount: number;
  unitRate: number;
  description: string;
  payer: 'EMPRESA' | 'EPS' | 'ARL' | 'NA';
} {
  const hourlyRate = calculateHourlyRate(baseSalary, monthlyHours);
  const dailyRate = Math.round((baseSalary / 30) * 100) / 100;

  switch (type) {
    case 'HORA_EXTRA_DIURNA': {
      const unitRate = Math.round(hourlyRate * NOVELTY_FACTORS.HORA_EXTRA_DIURNA);
      return {
        amount: Math.round(unitRate * quantity),
        unitRate,
        description: `Hora Extra Diurna (+25% CST Art. 168): ${quantity} hr(s)`,
        payer: 'EMPRESA',
      };
    }
    case 'HORA_EXTRA_NOCTURNA': {
      const unitRate = Math.round(hourlyRate * NOVELTY_FACTORS.HORA_EXTRA_NOCTURNA);
      return {
        amount: Math.round(unitRate * quantity),
        unitRate,
        description: `Hora Extra Nocturna (+75% CST Art. 168): ${quantity} hr(s)`,
        payer: 'EMPRESA',
      };
    }
    case 'HORA_EXTRA_FESTIVA_DIURNA': {
      const unitRate = Math.round(hourlyRate * NOVELTY_FACTORS.HORA_EXTRA_FESTIVA_DIURNA);
      return {
        amount: Math.round(unitRate * quantity),
        unitRate,
        description: `Hora Extra Festiva Diurna (+100% CST Art. 168 y 179): ${quantity} hr(s)`,
        payer: 'EMPRESA',
      };
    }
    case 'HORA_EXTRA_FESTIVA_NOCTURNA': {
      const unitRate = Math.round(hourlyRate * NOVELTY_FACTORS.HORA_EXTRA_FESTIVA_NOCTURNA);
      return {
        amount: Math.round(unitRate * quantity),
        unitRate,
        description: `Hora Extra Festiva Nocturna (+150% CST Art. 168 y 179): ${quantity} hr(s)`,
        payer: 'EMPRESA',
      };
    }
    case 'RECARGO_NOCTURNO': {
      const unitRate = Math.round(hourlyRate * NOVELTY_FACTORS.RECARGO_NOCTURNO);
      return {
        amount: Math.round(unitRate * quantity),
        unitRate,
        description: `Recargo Nocturno Ordinario (+35% CST Art. 168): ${quantity} hr(s)`,
        payer: 'EMPRESA',
      };
    }
    case 'RECARGO_DOMINICAL_FESTIVO': {
      const unitRate = Math.round(hourlyRate * NOVELTY_FACTORS.RECARGO_DOMINICAL_FESTIVO);
      return {
        amount: Math.round(unitRate * quantity),
        unitRate,
        description: `Recargo Dominical/Festivo (+75% CST Art. 179): ${quantity} hr(s)`,
        payer: 'EMPRESA',
      };
    }
    case 'INCAPACIDAD_GENERAL': {
      // Días 1 y 2 asume la empresa al 66.67% (no inferior a salario mínimo proporcional)
      // Día 3 en adelante asume la EPS al 66.67%
      const minDailyWage = SMMLV_COLOMBIA_2026 / 30;
      const calculatedDaily = Math.max(dailyRate * (2 / 3), minDailyWage);
      const unitRate = Math.round(calculatedDaily);
      const amount = Math.round(unitRate * quantity);
      const payer = quantity <= 2 ? 'EMPRESA' : 'EPS';
      return {
        amount,
        unitRate,
        description: `Incapacidad Enfermedad General (${quantity} días al 66.67%)`,
        payer,
      };
    }
    case 'INCAPACIDAD_LABORAL': {
      // Cubierta 100% por la ARL desde el día 1
      const unitRate = dailyRate;
      return {
        amount: Math.round(unitRate * quantity),
        unitRate,
        description: `Incapacidad Accidente o Enfermedad Laboral (100% cubierto por ARL): ${quantity} días`,
        payer: 'ARL',
      };
    }
    case 'VACACIONES': {
      // 15 días hábiles remunerados por año trabajado
      const unitRate = dailyRate;
      return {
        amount: Math.round(unitRate * quantity),
        unitRate,
        description: `Descanso Remunerado de Vacaciones: ${quantity} día(s)`,
        payer: 'EMPRESA',
      };
    }
    case 'LICENCIA_MATERNIDAD_PATERNIDAD': {
      // Remunerada 100% por la EPS
      const unitRate = dailyRate;
      return {
        amount: Math.round(unitRate * quantity),
        unitRate,
        description: `Licencia de Maternidad / Paternidad (100% recobro EPS): ${quantity} días`,
        payer: 'EPS',
      };
    }
    case 'LICENCIA_NO_REMUNERADA': {
      return {
        amount: 0,
        unitRate: 0,
        description: `Licencia no remunerada (${quantity} días - suspensión del contrato)`,
        payer: 'NA',
      };
    }
    case 'BONIFICACION': {
      return {
        amount: Math.round(quantity),
        unitRate: Math.round(quantity),
        description: 'Bonificación o Auxilio no constitutivo de salario',
        payer: 'EMPRESA',
      };
    }
    case 'OTRA_DEDUCCION': {
      return {
        amount: -Math.abs(Math.round(quantity)),
        unitRate: -Math.abs(Math.round(quantity)),
        description: 'Deducción de nómina (libranza, préstamo, etc.)',
        payer: 'EMPRESA',
      };
    }
    default:
      return {
        amount: 0,
        unitRate: 0,
        description: 'Novedad no clasificada',
        payer: 'NA',
      };
  }
}

/**
 * Valida si un empleado tiene derecho legal a dotación de calzado y vestido de labor.
 * Código Sustantivo del Trabajo - Artículo 230:
 * - Salario base hasta 2 SMMLV
 * - Antigüedad mínima de 3 meses (90 días)
 */
export function checkDotacionEligibility(
  baseSalary: number,
  daysWorked: number
): { eligible: boolean; reason: string } {
  const maxSalaryThreshold = 2 * SMMLV_COLOMBIA_2026;
  if (baseSalary > maxSalaryThreshold) {
    return {
      eligible: false,
      reason: `Salario ($${baseSalary.toLocaleString('es-CO')}) supera el tope legal de 2 SMMLV ($${maxSalaryThreshold.toLocaleString('es-CO')}).`,
    };
  }
  if (daysWorked < 90) {
    return {
      eligible: false,
      reason: `Antigüedad (${daysWorked} días) inferior a los 3 meses requeridos por ley.`,
    };
  }
  return {
    eligible: true,
    reason: `Cumple requisitos legales (Salario <= 2 SMMLV y antigüedad >= 90 días). Corresponde entrega cuatrimestral (Abril, Agosto, Diciembre).`,
  };
}

/**
 * Determina el régimen de Estándares Mínimos de SG-SST según Resolución 0312 de 2019
 */
export function getSstResolutionCategory(employeeCount: number, riskLevel: number): {
  category: string;
  totalStandards: number;
  vigiaOrCopasst: 'VIGIA_SST' | 'COPASST';
  description: string;
} {
  if (employeeCount <= 10 && riskLevel <= 3) {
    return {
      category: 'Microempresa (<= 10 trabajadores en Riesgo I, II o III)',
      totalStandards: 7,
      vigiaOrCopasst: 'VIGIA_SST',
      description: 'Aplica los 7 Estándares Mínimos obligatorios. Debe contar con un Vigía de Seguridad y Salud en el Trabajo elegido por los trabajadores.',
    };
  }
  if (employeeCount <= 50 && riskLevel <= 3) {
    return {
      category: 'Pequeña empresa (11 a 50 trabajadores en Riesgo I, II o III)',
      totalStandards: 21,
      vigiaOrCopasst: 'COPASST',
      description: 'Aplica 21 Estándares Mínimos. Requiere conformar Comité Paritario de Seguridad y Salud en el Trabajo (COPASST).',
    };
  }
  return {
    category: 'Empresa en Riesgo IV/V o más de 50 trabajadores',
    totalStandards: 60,
    vigiaOrCopasst: 'COPASST',
    description: 'Aplica los 60 Estándares Mínimos completos de la Resolución 0312.',
  };
}
