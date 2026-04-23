/**
 * Expert System Engine — dengan Certainty Factor (CF)
 *
 * Implementasi sesuai materi Pertemuan 14 (Durkin):
 *   - CF(H, E)              = CF(E) × CF(RULE)
 *   - CF(H, E1 AND E2 ...) = min(CF(Ei)) × CF(RULE)
 *   - CF(H, E1 OR  E2 ...) = max(CF(Ei)) × CF(RULE)
 *
 * Referensi Rule Set: Laporan UTS Sistem Pakar Kelompok 4.
 */

// ─── KONSTANTA ALAT ───────────────────────────────────────────────────────────

const ALAT_UTAMA     = ['tds', 'ph_meter']
const ALAT_PENDUKUNG = ['styrofoam', 'netpot', 'tray', 'rockwool', 'flanel']

// ─── CF RULE (ditetapkan pakar, fix) ─────────────────────────────────────────

const CF_RULE = {
  // Rule Set 2 — Fundamental
  RS2_R1: 1.0, // alat=lengkap  AND nutrisi=siap  → siap   (definitely)
  RS2_R2: 1.0, // nutrisi=tidak                   → tidak  (definitely)
  RS2_R3: 1.0, // alat=sebagian AND nutrisi=siap  → siap   (definitely)
  RS2_R4: 1.0, // alat=tidak    AND nutrisi=siap  → tidak  (definitely)

  // Rule Set 3 — Parameter Lingkungan
  RS3_R1: 1.0, // ph=sesuai AND cahaya=cukup(outdoor)     → sesuai (definitely)
  RS3_R2: 1.0, // ph=sesuai AND cahaya=cukup(greenhouse)  → sesuai (definitely)
  RS3_R3: 1.0, // ph=sesuai AND cahaya=tidak              → tidak  (definitely)
  RS3_R4: 1.0, // ph=tidak_sesuai                         → tidak  (definitely)

  // Rule Set 1 — Tingkat Kesiapan
  RS1_R1: 1.0, // fundamental=siap AND pestisida=pakai AND param=sesuai → sangat_layak
  RS1_R2: 0.6, // fundamental=siap AND param=tidak                      → cukup_layak
  RS1_R3: 0.8, // fundamental=siap AND pestisida=tidak AND param=sesuai → layak
  RS1_R4: 1.0, // fundamental=tidak                                     → tidak_layak
}

// ─── INTERPRETASI CF (tabel Durkin) ──────────────────────────────────────────

/**
 * Konversi nilai CF ke frase interpretasi sesuai tabel Durkin.
 * @param {number} cf
 * @returns {string}
 */
export const interpretCF = (cf) => {
  if (cf >= 1.0)        return 'Definitely'
  if (cf >= 0.8)        return 'Almost Certainly'
  if (cf >= 0.6)        return 'Probably'
  if (cf >= 0.4)        return 'Maybe'
  return 'Definitely Not'
}

// ─── CLASSIFIER — Raw Input → Nilai Internal + CF Evidence ───────────────────

/**
 * Klasifikasikan array alat → { value, cfEvidence }
 *
 * lengkap  → CF 1.0 (definitely)
 * sebagian → CF 0.6 (probably)
 * tidak    → CF 0.0 (definitely not siap)
 *
 * @param {string[]} selectedAlat
 * @returns {{ value: 'lengkap'|'sebagian'|'tidak', cfEvidence: number }}
 */
const classifyAlat = (selectedAlat) => {
  const hasAllUtama = ALAT_UTAMA.every((a) => selectedAlat.includes(a))
  if (!hasAllUtama) return { value: 'tidak', cfEvidence: 0.0 }

  const pendukungCount = ALAT_PENDUKUNG.filter((a) => selectedAlat.includes(a)).length
  if (pendukungCount >= 5) return { value: 'lengkap',  cfEvidence: 1.0 }
  if (pendukungCount >= 3) return { value: 'sebagian', cfEvidence: 0.6 }
  return { value: 'tidak', cfEvidence: 0.0 }
}

/**
 * Ambil value + CF Evidence dari jawaban single-choice.
 * CF diambil dari property `cf` di option definition (questions.js).
 *
 * @param {string|null} selectedOptionId
 * @param {import('../data/questions').Option[]} options
 * @returns {{ value: string|null, cfEvidence: number }}
 */
const extractSingleValue = (selectedOptionId, options) => {
  if (!selectedOptionId) return { value: null, cfEvidence: 0.0 }
  const opt = options.find((o) => o.id === selectedOptionId)
  return {
    value:      opt?.value      ?? null,
    cfEvidence: opt?.cf         ?? 0.0,
  }
}

// ─── RULE SET 2 : Alat + Nutrisi → Fundamental ───────────────────────────────

/**
 * RS2 — Menentukan Fundamental beserta CF-nya.
 *
 * Rumus: CF(H, E1 AND E2) = min(CF(Ei)) × CF(RULE)
 *
 * B1: alat=lengkap  AND nutrisi=siap  → siap  | CF_RULE=1.0
 * B2: nutrisi=tidak                   → tidak | CF_RULE=1.0
 * B3: alat=sebagian AND nutrisi=siap  → siap  | CF_RULE=0.8
 * B4: alat=tidak    AND nutrisi=siap  → tidak | CF_RULE=1.0
 *
 * @param {{ value: string, cfEvidence: number }} alat
 * @param {{ value: string, cfEvidence: number }} nutrisi
 * @returns {{ value: 'siap'|'tidak', cf: number, ruleApplied: string }}
 */
const inferFundamental = (alat, nutrisi) => {
  // B2: Nutrisi tidak ada → tidak, apapun alatnya
  if (nutrisi.value === 'tidak') {
    return {
      value:       'tidak',
      cf:          nutrisi.cfEvidence * CF_RULE.RS2_R2, // 0.0 × 1.0 = 0.0 (representasi "tidak")
      cfEvidence:  nutrisi.cfEvidence,
      cfRule:      CF_RULE.RS2_R2,
      ruleApplied: 'RS2-R2',
      formula:     `CF(E) × CF(RULE) = ${nutrisi.cfEvidence} × ${CF_RULE.RS2_R2}`,
    }
  }

  // B4: Alat tidak ada, nutrisi siap → tidak
  if (alat.value === 'tidak') {
    const cfE = Math.min(alat.cfEvidence, nutrisi.cfEvidence)
    return {
      value:       'tidak',
      cf:          cfE * CF_RULE.RS2_R4,
      cfEvidence:  cfE,
      cfRule:      CF_RULE.RS2_R4,
      ruleApplied: 'RS2-R4',
      formula:     `min(${alat.cfEvidence}, ${nutrisi.cfEvidence}) × ${CF_RULE.RS2_R4} = ${cfE} × ${CF_RULE.RS2_R4}`,
    }
  }

  // B1: alat=lengkap AND nutrisi=siap → siap
  if (alat.value === 'lengkap') {
    const cfE = Math.min(alat.cfEvidence, nutrisi.cfEvidence)
    return {
      value:       'siap',
      cf:          +(cfE * CF_RULE.RS2_R1).toFixed(4),
      cfEvidence:  cfE,
      cfRule:      CF_RULE.RS2_R1,
      ruleApplied: 'RS2-R1',
      formula:     `min(${alat.cfEvidence}, ${nutrisi.cfEvidence}) × ${CF_RULE.RS2_R1} = ${cfE} × ${CF_RULE.RS2_R1}`,
    }
  }

  // B3: alat=sebagian AND nutrisi=siap → siap
  const cfE = Math.min(alat.cfEvidence, nutrisi.cfEvidence)
  return {
    value:       'siap',
    cf:          +(cfE * CF_RULE.RS2_R3).toFixed(4),
    cfEvidence:  cfE,
    cfRule:      CF_RULE.RS2_R3,
    ruleApplied: 'RS2-R3',
    formula:     `min(${alat.cfEvidence}, ${nutrisi.cfEvidence}) × ${CF_RULE.RS2_R3} = ${cfE} × ${CF_RULE.RS2_R3}`,
  }
}

// ─── RULE SET 3 : pH + Cahaya → Parameter Lingkungan ─────────────────────────

/**
 * RS3 — Menentukan Parameter Lingkungan beserta CF-nya.
 *
 * B1: ph=sesuai AND cahaya=cukup(outdoor)    → sesuai | CF_RULE=1.0
 * B2: ph=sesuai AND cahaya=cukup(greenhouse) → sesuai | CF_RULE=1.0
 * B3: ph=sesuai AND cahaya=tidak             → tidak  | CF_RULE=1.0
 * B4: ph=tidak_sesuai                        → tidak  | CF_RULE=1.0
 *
 * @param {{ value: string, cfEvidence: number }} ph
 * @param {{ value: string, cfEvidence: number }} cahaya
 * @returns {{ value: 'sesuai'|'tidak', cf: number, ruleApplied: string }}
 */
const inferParameterLingkungan = (ph, cahaya) => {
  // B4: pH tidak sesuai → langsung tidak
  if (ph.value === 'tidak_sesuai') {
    return {
      value:       'tidak',
      cf:          ph.cfEvidence * CF_RULE.RS3_R4, // 0.0 × 1.0
      cfEvidence:  ph.cfEvidence,
      cfRule:      CF_RULE.RS3_R4,
      ruleApplied: 'RS3-R4',
      formula:     `CF(E) × CF(RULE) = ${ph.cfEvidence} × ${CF_RULE.RS3_R4}`,
    }
  }

  // B3: pH sesuai tapi cahaya tidak
  if (cahaya.value === 'tidak') {
    const cfE = Math.min(ph.cfEvidence, cahaya.cfEvidence)
    return {
      value:       'tidak',
      cf:          +(cfE * CF_RULE.RS3_R3).toFixed(4),
      cfEvidence:  cfE,
      cfRule:      CF_RULE.RS3_R3,
      ruleApplied: 'RS3-R3',
      formula:     `min(${ph.cfEvidence}, ${cahaya.cfEvidence}) × ${CF_RULE.RS3_R3} = ${cfE} × ${CF_RULE.RS3_R3}`,
    }
  }

  // B1 / B2: pH sesuai AND cahaya cukup (outdoor CF=1.0, greenhouse CF=0.8)
  const cfRule = CF_RULE.RS3_R1 // keduanya pakai CF_RULE 1.0
  const cfE    = Math.min(ph.cfEvidence, cahaya.cfEvidence)
  const ruleId = cahaya.cfEvidence === 0.8 ? 'RS3-R2' : 'RS3-R1'
  return {
    value:       'sesuai',
    cf:          +(cfE * cfRule).toFixed(4),
    cfEvidence:  cfE,
    cfRule:      cfRule,
    ruleApplied: ruleId,
    formula:     `min(${ph.cfEvidence}, ${cahaya.cfEvidence}) × ${cfRule} = ${cfE} × ${cfRule}`,
  }
}

// ─── RULE SET 1 : Fundamental + Pestisida + Param → Tingkat Kesiapan ─────────

/**
 * RS1 — Menentukan Tingkat Kesiapan beserta CF-nya.
 *
 * B1: fundamental=siap AND pestisida=pakai AND param=sesuai → sangat_layak | CF_RULE=1.0
 * B2: fundamental=siap AND param=tidak                      → cukup_layak  | CF_RULE=0.6
 * B3: fundamental=siap AND pestisida=tidak AND param=sesuai → layak        | CF_RULE=0.8
 * B4: fundamental=tidak                                     → tidak_layak  | CF_RULE=1.0
 *
 * @param {{ value: string, cf: number }} fundamental
 * @param {{ value: string, cfEvidence: number }} pestisida
 * @param {{ value: string, cf: number }} paramLingkungan
 * @returns {{ tingkatKesiapan: string, cf: number, ruleApplied: string, formula: string }}
 */
const inferTingkatKesiapan = (fundamental, pestisida, paramLingkungan) => {
  // B4: Fundamental tidak → tidak layak
  if (fundamental.value === 'tidak') {
    return {
      tingkatKesiapan: 'tidak_layak',
      cf:              +(fundamental.cf * CF_RULE.RS1_R4).toFixed(4),
      cfEvidence:      fundamental.cf,
      cfRule:          CF_RULE.RS1_R4,
      ruleApplied:     'RS1-R4',
      formula:         `CF(fundamental) × CF(RULE) = ${fundamental.cf} × ${CF_RULE.RS1_R4}`,
    }
  }

  // B2: Fundamental siap tapi param tidak → cukup layak
  if (paramLingkungan.value === 'tidak') {
    const cfE = Math.min(fundamental.cf, paramLingkungan.cf)
    return {
      tingkatKesiapan: 'cukup_layak',
      cf:              +(cfE * CF_RULE.RS1_R2).toFixed(4),
      cfEvidence:      cfE,
      cfRule:          CF_RULE.RS1_R2,
      ruleApplied:     'RS1-R2',
      formula:         `min(${fundamental.cf}, ${paramLingkungan.cf}) × ${CF_RULE.RS1_R2} = ${cfE} × ${CF_RULE.RS1_R2}`,
    }
  }

  // B1: Semua optimal + pestisida pakai → sangat layak
  if (pestisida.value === 'pakai') {
    const cfE = Math.min(fundamental.cf, pestisida.cfEvidence, paramLingkungan.cf)
    return {
      tingkatKesiapan: 'sangat_layak',
      cf:              +(cfE * CF_RULE.RS1_R1).toFixed(4),
      cfEvidence:      cfE,
      cfRule:          CF_RULE.RS1_R1,
      ruleApplied:     'RS1-R1',
      formula:         `min(${fundamental.cf}, ${pestisida.cfEvidence}, ${paramLingkungan.cf}) × ${CF_RULE.RS1_R1} = ${cfE} × ${CF_RULE.RS1_R1}`,
    }
  }

  // B3: Fundamental siap, param sesuai, pestisida tidak → layak
  const cfE = Math.min(fundamental.cf, paramLingkungan.cf)
  return {
    tingkatKesiapan: 'layak',
    cf:              +(cfE * CF_RULE.RS1_R3).toFixed(4),
    cfEvidence:      cfE,
    cfRule:          CF_RULE.RS1_R3,
    ruleApplied:     'RS1-R3',
    formula:         `min(${fundamental.cf}, ${paramLingkungan.cf}) × ${CF_RULE.RS1_R3} = ${cfE} × ${CF_RULE.RS1_R3}`,
  }
}

// ─── FORWARD CHAINING ENTRYPOINT ─────────────────────────────────────────────

/**
 * @typedef {Object} RawAnswers
 * @property {string[]}    alat      - array id alat yang dipilih (multi)
 * @property {string|null} nutrisi   - id option nutrisi
 * @property {string|null} ph        - id option pH
 * @property {string|null} cahaya    - id option cahaya
 * @property {string|null} pestisida - id option pestisida
 */

/**
 * @typedef {Object} EvaluationResult
 * @property {'sangat_layak'|'layak'|'cukup_layak'|'tidak_layak'} tingkatKesiapan
 * @property {number}  cfFinal            - CF konklusi akhir (0.0 – 1.0)
 * @property {string}  cfInterpretasi     - frase Durkin untuk cfFinal
 * @property {string}  ruleApplied        - rule yang firing di RS1
 * @property {string}  formula            - formula kalkulasi RS1
 * @property {Object}  rs2                - trace RS2 (fundamental)
 * @property {Object}  rs3                - trace RS3 (parameter lingkungan)
 * @property {'siap'|'tidak'}             fundamental
 * @property {'sesuai'|'tidak'}           parameterLingkungan
 * @property {'lengkap'|'sebagian'|'tidak'} classifiedAlat
 * @property {'siap'|'tidak'}             classifiedNutrisi
 * @property {'sesuai'|'tidak_sesuai'}    classifiedPh
 * @property {'cukup'|'tidak'}            classifiedCahaya
 * @property {'pakai'|'tidak'}            classifiedPestisida
 * @property {number}  cfAlat
 * @property {number}  cfNutrisi
 * @property {number}  cfPh
 * @property {number}  cfCahaya
 * @property {number}  cfPestisida
 */

/**
 * Jalankan forward chaining dari jawaban mentah → hasil evaluasi lengkap dengan CF.
 *
 * @param {RawAnswers} rawAnswers
 * @param {import('../data/questions').Question[]} questions
 * @returns {EvaluationResult}
 */
export const runExpertSystem = (rawAnswers, questions) => {
  const getOptions = (qId) => questions.find((q) => q.id === qId)?.options ?? []

  // ── Step 1: Classify raw inputs → value + CF Evidence ──
  const alatResult      = classifyAlat(rawAnswers.alat ?? [])
  const nutrisiResult   = extractSingleValue(rawAnswers.nutrisi,   getOptions('nutrisi'))
  const phResult        = extractSingleValue(rawAnswers.ph,        getOptions('ph'))
  const cahayaResult    = extractSingleValue(rawAnswers.cahaya,    getOptions('cahaya'))
  const pestisidaResult = extractSingleValue(rawAnswers.pestisida, getOptions('pestisida'))

  // ── Step 2: RS2 — Fundamental ──
  const rs2 = inferFundamental(alatResult, nutrisiResult)

  // ── Step 3: RS3 — Parameter Lingkungan ──
  const rs3 = inferParameterLingkungan(phResult, cahayaResult)

  // Bungkus hasil RS2 & RS3 sebagai input ke RS1
  const fundamentalInput    = { value: rs2.value, cf: rs2.cf }
  const paramLingkunganInput = { value: rs3.value, cf: rs3.cf }

  // ── Step 4: RS1 — Tingkat Kesiapan ──
  const rs1 = inferTingkatKesiapan(fundamentalInput, pestisidaResult, paramLingkunganInput)

  return {
    // Konklusi akhir
    tingkatKesiapan:  rs1.tingkatKesiapan,
    cfFinal:          rs1.cf,
    cfInterpretasi:   interpretCF(rs1.cf),
    ruleApplied:      rs1.ruleApplied,
    formula:          rs1.formula,

    // Trace per rule set (untuk breakdown di UI)
    rs2: {
      ruleApplied: rs2.ruleApplied,
      value:       rs2.value,
      cf:          rs2.cf,
      cfEvidence:  rs2.cfEvidence,
      cfRule:      rs2.cfRule,
      formula:     rs2.formula,
    },
    rs3: {
      ruleApplied: rs3.ruleApplied,
      value:       rs3.value,
      cf:          rs3.cf,
      cfEvidence:  rs3.cfEvidence,
      cfRule:      rs3.cfRule,
      formula:     rs3.formula,
    },

    // Intermediate values
    fundamental:        rs2.value,
    parameterLingkungan: rs3.value,

    // Classified inputs
    classifiedAlat:      alatResult.value,
    classifiedNutrisi:   nutrisiResult.value,
    classifiedPh:        phResult.value,
    classifiedCahaya:    cahayaResult.value,
    classifiedPestisida: pestisidaResult.value,

    // CF Evidence per faktor (untuk FactorList jika dibutuhkan)
    cfAlat:      alatResult.cfEvidence,
    cfNutrisi:   nutrisiResult.cfEvidence,
    cfPh:        phResult.cfEvidence,
    cfCahaya:    cahayaResult.cfEvidence,
    cfPestisida: pestisidaResult.cfEvidence,
  }
}