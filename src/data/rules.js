// ─── CONSTANTS ────────────────────────────────────────────────────────────────

export const ALAT_UTAMA   = ['tds_meter', 'ph_meter']
export const ALAT_PENDUKUNG = ['styrofoam', 'netpot', 'tray_semai', 'rockwool', 'kain_flanel']

// ─── RESULT METADATA ──────────────────────────────────────────────────────────

export const RESULT_META = {
  sangat_layak: {
    label: 'Sangat Layak',
    color: 'green',
    description: 'Seluruh faktor kesiapan terpenuhi secara optimal. Kamu dapat langsung memulai budidaya dengan keyakinan tinggi.',
    advice: 'Pertahankan semua persiapan ini dan pantau tanaman secara rutin sejak awal.',
  },
  layak: {
    label: 'Layak',
    color: 'teal',
    description: 'Faktor dasar terpenuhi, namun pengendalian hama belum disiapkan. Budidaya dapat dimulai dengan pemantauan lebih intensif.',
    advice: 'Segera siapkan pestisida nabati atau kimia sebagai langkah antisipasi serangan hama.',
  },
  cukup_layak: {
    label: 'Cukup Layak',
    color: 'amber',
    description: 'Faktor dasar terpenuhi, tetapi parameter lingkungan (pH atau cahaya) masih lemah. Disarankan melengkapi kesiapan sebelum memulai.',
    advice: 'Ukur pH air dengan alat dan pastikan lokasi mendapat cahaya matahari yang cukup.',
  },
  tidak_layak: {
    label: 'Tidak Layak',
    color: 'red',
    description: 'Satu atau lebih faktor dasar belum terpenuhi. Kamu belum siap memulai dan perlu melengkapi persiapan secara mendasar.',
    advice: 'Lengkapi alat ukur (TDS Meter + PH Meter) dan pastikan nutrisi tersedia beserta cara pemakaiannya.',
  },
}

// ─── RULE SET 2: alat_dasar + nutrisi → fundamental ──────────────────────────
// R1: alat=lengkap  AND nutrisi=siap  → siap
// R2: nutrisi=tidak                   → tidak  (apapun alatnya)
// R3: alat=sebagian AND nutrisi=siap  → siap
// R4: alat=tidak    AND nutrisi=siap  → tidak

export const RULES_SET2 = [
  {
    id: 'RS2_R1',
    conditions: { alat_dasar: 'lengkap', nutrisi: 'siap' },
    result: 'siap',
  },
  {
    id: 'RS2_R2',
    conditions: { nutrisi: 'tidak' },
    result: 'tidak',
  },
  {
    id: 'RS2_R3',
    conditions: { alat_dasar: 'sebagian', nutrisi: 'siap' },
    result: 'siap',
  },
  {
    id: 'RS2_R4',
    conditions: { alat_dasar: 'tidak', nutrisi: 'siap' },
    result: 'tidak',
  },
]

// ─── RULE SET 3: ph_air + cahaya → param_lingkungan ──────────────────────────
// R1: ph=sesuai      AND cahaya=cukup → sesuai
// R2: ph=sesuai      AND cahaya=tidak → tidak
// R3: ph=tidak_sesuai                 → tidak  (apapun cahayanya)

export const RULES_SET3 = [
  {
    id: 'RS3_R1',
    conditions: { ph_air: 'sesuai', cahaya: 'cukup' },
    result: 'sesuai',
  },
  {
    id: 'RS3_R2',
    conditions: { ph_air: 'sesuai', cahaya: 'tidak' },
    result: 'tidak',
  },
  {
    id: 'RS3_R3',
    conditions: { ph_air: 'tidak_sesuai' },
    result: 'tidak',
  },
]

// ─── RULE SET 1: fundamental + pestisida + param_lingkungan → tingkat kesiapan
// R1: fundamental=siap AND pestisida=pakai AND param=sesuai → sangat_layak
// R2: fundamental=siap AND param=tidak                      → cukup_layak
// R3: fundamental=siap AND pestisida=tidak AND param=sesuai → layak
// R4: fundamental=tidak                                     → tidak_layak

export const RULES_SET1 = [
  {
    id: 'RS1_R1',
    conditions: { fundamental: 'siap', pestisida: 'pakai', param_lingkungan: 'sesuai' },
    result: 'sangat_layak',
  },
  {
    id: 'RS1_R2',
    conditions: { fundamental: 'siap', param_lingkungan: 'tidak' },
    result: 'cukup_layak',
  },
  {
    id: 'RS1_R3',
    conditions: { fundamental: 'siap', pestisida: 'tidak', param_lingkungan: 'sesuai' },
    result: 'layak',
  },
  {
    id: 'RS1_R4',
    conditions: { fundamental: 'tidak' },
    result: 'tidak_layak',
  },
]