import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateHourlyRate,
  calculateNoveltyAmount,
  checkDotacionEligibility,
  getSstResolutionCategory,
  SMMLV_COLOMBIA_2026,
} from './colombiaHrRules.ts';

test('calculateHourlyRate calculates hourly rate accurately based on monthly standard hours', () => {
  const salary = 2300000;
  const rate = calculateHourlyRate(salary, 230);
  assert.equal(rate, 10000);

  // zero or negative returns 0
  assert.equal(calculateHourlyRate(0), 0);
  assert.equal(calculateHourlyRate(-500), 0);
});

test('calculateNoveltyAmount computes daytime overtime with 25% surcharge', () => {
  const salary = 2300000; // hourly 10000
  const result = calculateNoveltyAmount('HORA_EXTRA_DIURNA', 4, salary, 230);
  // unitRate = 10000 * 1.25 = 12500
  // total = 12500 * 4 = 50000
  assert.equal(result.unitRate, 12500);
  assert.equal(result.amount, 50000);
  assert.equal(result.payer, 'EMPRESA');
});

test('calculateNoveltyAmount computes nighttime overtime with 75% surcharge', () => {
  const salary = 2300000;
  const result = calculateNoveltyAmount('HORA_EXTRA_NOCTURNA', 2, salary, 230);
  // unitRate = 10000 * 1.75 = 17500
  // total = 35000
  assert.equal(result.unitRate, 17500);
  assert.equal(result.amount, 35000);
});

test('calculateNoveltyAmount handles labor/ARL incapacity with 100% pay from ARL', () => {
  const salary = 3000000; // daily = 100,000
  const result = calculateNoveltyAmount('INCAPACIDAD_LABORAL', 5, salary);
  assert.equal(result.unitRate, 100000);
  assert.equal(result.amount, 500000);
  assert.equal(result.payer, 'ARL');
});

test('checkDotacionEligibility correctly approves workers <= 2 SMMLV with 90+ days', () => {
  const eligible = checkDotacionEligibility(SMMLV_COLOMBIA_2026 * 1.5, 120);
  assert.equal(eligible.eligible, true);

  const ineligibleSalary = checkDotacionEligibility(SMMLV_COLOMBIA_2026 * 2.5, 120);
  assert.equal(ineligibleSalary.eligible, false);

  const ineligibleSeniority = checkDotacionEligibility(SMMLV_COLOMBIA_2026, 45);
  assert.equal(ineligibleSeniority.eligible, false);
});

test('getSstResolutionCategory assigns 7 standards and Vigía for microenterprises <= 10 workers in Risk I-III', () => {
  const res = getSstResolutionCategory(8, 2);
  assert.equal(res.totalStandards, 7);
  assert.equal(res.vigiaOrCopasst, 'VIGIA_SST');

  const resBigger = getSstResolutionCategory(25, 2);
  assert.equal(resBigger.totalStandards, 21);
  assert.equal(resBigger.vigiaOrCopasst, 'COPASST');
});
