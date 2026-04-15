import { RULES_SET1, RULES_SET2, RULES_SET3 } from '../data/rules.js'
import {
  classifyAlatDasar,
  classifyNutrisi,
  classifyPhAir,
  classifyCahaya,
  classifyPestisida,
} from './classifier.js'

/**
 * Mencocokkan satu rule terhadap working memory.
 * Rule cocok jika SEMUA key di conditions ada di wm dan nilainya sama.
 */
function matchRule(rule, workingMemory) {
  return Object.entries(rule.conditions).every(
    ([key, val]) => workingMemory[key] === val
  )
}

/**
 * Menjalankan satu rule set terhadap working memory.
 * Return result dari rule pertama yang cocok (urutan array = prioritas).
 * Return null jika tidak ada rule yang cocok.
 */
function runRuleSet(rules, workingMemory) {
  for (const rule of rules) {
    if (matchRule(rule, workingMemory)) {
      return { result: rule.result, firedRule: rule.id }
    }
  }
  return null
}

/**
 * Main forward chaining engine.
 *
 * @param {Object} rawAnswers - jawaban mentah dari user
 *   {
 *     alat_dasar : string[],   // array of selected tool values
 *     nutrisi    : string,     // 'siap' | 'tidak'
 *     ph_air     : string,     // 'sesuai' | 'tidak_sesuai'
 *     cahaya     : string,     // 'cukup' | 'tidak'
 *     pestisida  : string,     // 'pakai' | 'tidak'
 *   }
 *
 * @returns {Object}
 *   {
 *     tingkat_kesiapan : string,   // 'sangat_layak' | 'layak' | 'cukup_layak' | 'tidak_layak'
 *     trace            : Object,   // untuk debugging / transparansi ke user
 *   }
 */
export function evaluate(rawAnswers) {
  // ── Step 1: Klasifikasikan input mentah ─────────────────────────────────────
  const classified = {
    alat_dasar : classifyAlatDasar(rawAnswers.alat_dasar),
    nutrisi    : classifyNutrisi(rawAnswers.nutrisi),
    ph_air     : classifyPhAir(rawAnswers.ph_air),
    cahaya     : classifyCahaya(rawAnswers.cahaya),
    pestisida  : classifyPestisida(rawAnswers.pestisida),
  }

  // ── Step 2: Working memory awal ─────────────────────────────────────────────
  const wm = { ...classified }

  // ── Step 3: Rule Set 2 → derive fundamental ─────────────────────────────────
  const rs2 = runRuleSet(RULES_SET2, wm)
  if (!rs2) throw new Error('Rule Set 2: tidak ada rule yang cocok. Cek data input.')
  wm.fundamental = rs2.result

  // ── Step 4: Rule Set 3 → derive param_lingkungan ────────────────────────────
  const rs3 = runRuleSet(RULES_SET3, wm)
  if (!rs3) throw new Error('Rule Set 3: tidak ada rule yang cocok. Cek data input.')
  wm.param_lingkungan = rs3.result

  // ── Step 5: Rule Set 1 → derive tingkat_kesiapan ────────────────────────────
  const rs1 = runRuleSet(RULES_SET1, wm)
  if (!rs1) throw new Error('Rule Set 1: tidak ada rule yang cocok. Cek data input.')

  // ── Step 6: Return hasil + trace ────────────────────────────────────────────
  return {
    tingkat_kesiapan: rs1.result,
    trace: {
      input_classified : classified,
      fundamental      : { value: wm.fundamental,       firedRule: rs2.firedRule },
      param_lingkungan : { value: wm.param_lingkungan,  firedRule: rs3.firedRule },
      tingkat_kesiapan : { value: rs1.result,           firedRule: rs1.firedRule },
    },
  }
}