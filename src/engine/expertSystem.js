/**
 * Expert System Engine
 * Menggabungkan: classifier (raw input → nilai intermediate),
 * rules (if-then rule sets), dan forward chaining (inferensi final).
 *
 * Referensi: Rule Set 1, 2, 3 dari dokumen UTS Sistem Pakar Kelompok 4.
 */

// ─── CLASSIFIER ──────────────────────────────────────────────────────────────

const ALAT_UTAMA  = ['tds', 'ph_meter']
const ALAT_PENDUKUNG = ['styrofoam', 'netpot', 'tray', 'rockwool', 'flanel']

/**
 * Klasifikasikan array alat yang dipilih menjadi: lengkap | sebagian | tidak
 * Logic:
 *   - lengkap  : TDS + PH keduanya ada + semua 5 pendukung
 *   - sebagian : TDS + PH keduanya ada + ≥ 3 pendukung
 *   - tidak    : TDS atau PH tidak ada (0 atau 1 dari 2 alat utama)
 *
 * @param {string[]} selectedAlat
 * @returns {'lengkap'|'sebagian'|'tidak'}
 */
const classifyAlat = (selectedAlat) => {
  const hasAllUtama = ALAT_UTAMA.every((a) => selectedAlat.includes(a))
  if (!hasAllUtama) return 'tidak'

  const pendukungCount = ALAT_PENDUKUNG.filter((a) => selectedAlat.includes(a)).length
  if (pendukungCount >= 5) return 'lengkap'
  if (pendukungCount >= 3) return 'sebagian'
  return 'tidak'
}

/**
 * Ekstrak nilai internal dari jawaban soal single-choice.
 * Questions dengan type 'single' sudah menyimpan `value` di option.
 *
 * @param {string|null} selectedOptionId   - id option yang dipilih user
 * @param {import('../data/questions').Option[]} options
 * @returns {string|null}
 */
const extractSingleValue = (selectedOptionId, options) => {
  if (!selectedOptionId) return null
  return options.find((o) => o.id === selectedOptionId)?.value ?? null
}

// ─── RULE SET 2 : Alat dasar + Nutrisi → Fundamental ────────────────────────

/**
 * Rule Set 2 (RS2): menentukan nilai Fundamental
 *
 * B1: alat=lengkap  AND nutrisi=siap  → siap
 * B2: nutrisi=tidak                   → tidak   (regardless alat)
 * B3: alat=sebagian AND nutrisi=siap  → siap
 * B4: alat=tidak    AND nutrisi=siap  → tidak
 *
 * @param {'lengkap'|'sebagian'|'tidak'} alat
 * @param {'siap'|'tidak'} nutrisi
 * @returns {'siap'|'tidak'}
 */
const inferFundamental = (alat, nutrisi) => {
  if (nutrisi === 'tidak') return 'tidak'
  if (alat === 'tidak')    return 'tidak'
  // alat = lengkap atau sebagian, nutrisi = siap
  return 'siap'
}

// ─── RULE SET 3 : pH Air + Cahaya → Parameter Lingkungan ────────────────────

/**
 * Rule Set 3 (RS3): menentukan nilai Parameter Lingkungan
 *
 * B1: ph=sesuai       AND cahaya=cukup → sesuai
 * B2: ph=sesuai       AND cahaya=tidak → tidak
 * B3: ph=tidak_sesuai                  → tidak  (regardless cahaya)
 *
 * @param {'sesuai'|'tidak_sesuai'} ph
 * @param {'cukup'|'tidak'} cahaya
 * @returns {'sesuai'|'tidak'}
 */
const inferParameterLingkungan = (ph, cahaya) => {
  if (ph === 'tidak_sesuai') return 'tidak'
  if (cahaya === 'tidak')    return 'tidak'
  return 'sesuai'
}

// ─── RULE SET 1 : Fundamental + Pestisida + Parameter Lingkungan → Tingkat Kesiapan

/**
 * Rule Set 1 (RS1): menentukan Tingkat Kesiapan akhir
 *
 * B1: fundamental=siap  AND pestisida=pakai AND param=sesuai → sangat_layak
 * B2: fundamental=siap  AND param=tidak                      → cukup_layak
 * B3: fundamental=siap  AND pestisida=tidak AND param=sesuai → layak
 * B4: fundamental=tidak (pestisida apapun)                   → tidak_layak
 *
 * @param {'siap'|'tidak'} fundamental
 * @param {'pakai'|'tidak'} pestisida
 * @param {'sesuai'|'tidak'} paramLingkungan
 * @returns {'sangat_layak'|'layak'|'cukup_layak'|'tidak_layak'}
 */
const inferTingkatKesiapan = (fundamental, pestisida, paramLingkungan) => {
  if (fundamental === 'tidak') return 'tidak_layak'
  if (paramLingkungan === 'tidak') return 'cukup_layak'
  if (pestisida === 'pakai') return 'sangat_layak'
  return 'layak'
}

// ─── FORWARD CHAINING ENTRYPOINT ─────────────────────────────────────────────

/**
 * @typedef {Object} RawAnswers
 * @property {string[]}     alat      - array id alat yang dipilih (multi)
 * @property {string|null}  nutrisi   - id option nutrisi yang dipilih
 * @property {string|null}  ph        - id option pH yang dipilih
 * @property {string|null}  cahaya    - id option cahaya yang dipilih
 * @property {string|null}  pestisida - id option pestisida yang dipilih
 */

/**
 * @typedef {Object} EvaluationResult
 * @property {'sangat_layak'|'layak'|'cukup_layak'|'tidak_layak'} tingkatKesiapan
 * @property {'siap'|'tidak'}           fundamental
 * @property {'sesuai'|'tidak'}         parameterLingkungan
 * @property {'lengkap'|'sebagian'|'tidak'} classifiedAlat
 * @property {'siap'|'tidak'}           classifiedNutrisi
 * @property {'sesuai'|'tidak_sesuai'}  classifiedPh
 * @property {'cukup'|'tidak'}          classifiedCahaya
 * @property {'pakai'|'tidak'}          classifiedPestisida
 */

/**
 * Jalankan forward chaining dari jawaban mentah user → hasil evaluasi lengkap.
 *
 * @param {RawAnswers} rawAnswers
 * @param {import('../data/questions').Question[]} questions  - untuk resolve option values
 * @returns {EvaluationResult}
 */
export const runExpertSystem = (rawAnswers, questions) => {
  const getOptions = (qId) => questions.find((q) => q.id === qId)?.options ?? []

  // ── Classify raw inputs ──
  const classifiedAlat      = classifyAlat(rawAnswers.alat ?? [])
  const classifiedNutrisi   = extractSingleValue(rawAnswers.nutrisi,   getOptions('nutrisi'))
  const classifiedPh        = extractSingleValue(rawAnswers.ph,        getOptions('ph'))
  const classifiedCahaya    = extractSingleValue(rawAnswers.cahaya,    getOptions('cahaya'))
  const classifiedPestisida = extractSingleValue(rawAnswers.pestisida, getOptions('pestisida'))

  // ── RS2: intermediate ──
  const fundamental = inferFundamental(classifiedAlat, classifiedNutrisi)

  // ── RS3: intermediate ──
  const parameterLingkungan = inferParameterLingkungan(classifiedPh, classifiedCahaya)

  // ── RS1: final output ──
  const tingkatKesiapan = inferTingkatKesiapan(fundamental, classifiedPestisida, parameterLingkungan)

  return {
    tingkatKesiapan,
    fundamental,
    parameterLingkungan,
    classifiedAlat,
    classifiedNutrisi,
    classifiedPh,
    classifiedCahaya,
    classifiedPestisida,
  }
}