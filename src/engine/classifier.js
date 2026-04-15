import { ALAT_UTAMA, ALAT_PENDUKUNG } from '../data/rules.js'

/**
 * Mengklasifikasikan array pilihan alat → 'lengkap' | 'sebagian' | 'tidak'
 *
 * Aturan:
 *  - lengkap  : punya semua 2 alat utama + semua 5 pendukung (7/7)
 *  - sebagian : punya semua 2 alat utama + minimal 3 dari 5 pendukung
 *  - tidak    : salah satu alat utama tidak ada, apapun pendukungnya
 */
export function classifyAlatDasar(selectedAlat = []) {
  const selectedSet = new Set(selectedAlat)

  const hasAllUtama = ALAT_UTAMA.every((a) => selectedSet.has(a))
  if (!hasAllUtama) return 'tidak'

  const pendukungCount = ALAT_PENDUKUNG.filter((a) => selectedSet.has(a)).length

  if (pendukungCount === ALAT_PENDUKUNG.length) return 'lengkap'   // 5/5
  if (pendukungCount >= 3) return 'sebagian'                        // 3 atau 4
  return 'tidak'                                                     // < 3
}

/**
 * Nutrisi sudah langsung berupa nilai dari option (siap / tidak),
 * jadi tidak perlu klasifikasi tambahan — di-pass through.
 */
export function classifyNutrisi(value) {
  return value  // 'siap' | 'tidak'
}

/**
 * pH air dan cahaya juga sudah berupa nilai dari option,
 * di-pass through langsung ke rule engine.
 */
export function classifyPhAir(value) {
  return value  // 'sesuai' | 'tidak_sesuai'
}

export function classifyCahaya(value) {
  return value  // 'cukup' | 'tidak'
}

export function classifyPestisida(value) {
  return value  // 'pakai' | 'tidak'
}