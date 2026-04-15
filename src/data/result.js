/**
 * Metadata untuk setiap tingkat kesiapan hasil evaluasi.
 * Menggabungkan results.js + recommendations.js menjadi satu sumber kebenaran.
 */

export const READINESS_LEVELS = {
  sangat_layak: {
    key: 'sangat_layak',
    label: 'Sangat Layak',
    emoji: '🌱',
    colorClass: 'text-emerald-600',
    badgeVariant: 'success',
    bgClass: 'bg-emerald-50 border-emerald-200',
    description:
      'Seluruh faktor kesiapan terpenuhi secara optimal. Kamu dapat langsung memulai budidaya dengan keyakinan tinggi. Pastikan tetap memantau pH air dan nutrisi secara rutin.',
  },
  layak: {
    key: 'layak',
    label: 'Layak',
    colorClass: 'text-teal-600',
    badgeVariant: 'info',
    bgClass: 'bg-teal-50 border-teal-200',
    description:
      'Faktor dasar terpenuhi, namun terdapat satu faktor pendukung yang belum optimal. Budidaya dapat dimulai dengan pemantauan lebih intensif.',
  },
  cukup_layak: {
    key: 'cukup_layak',
    label: 'Cukup Layak',
    colorClass: 'text-amber-600',
    badgeVariant: 'warning',
    bgClass: 'bg-amber-50 border-amber-200',
    description:
      'Faktor dasar terpenuhi, tetapi kualitas persiapan masih lemah. Disarankan melengkapi kesiapan sebelum memulai agar hasil lebih optimal.',
  },
  tidak_layak: {
    key: 'tidak_layak',
    label: 'Belum Layak',
    colorClass: 'text-rose-600',
    badgeVariant: 'destructive',
    bgClass: 'bg-rose-50 border-rose-200',
    description:
      'Satu atau lebih faktor dasar belum terpenuhi. Lengkapi persiapan secara mendasar terlebih dahulu sebelum memulai budidaya.',
  },
}

/**
 * Label & status display per faktor berdasarkan nilai internal.
 * Digunakan oleh ResultCard untuk menampilkan rincian faktor.
 */
export const FACTOR_META = {
  alat: {
    label: 'Alat Dasar',
    display: {
      lengkap:  { label: 'Lengkap',   statusClass: 'text-emerald-600', dot: 'bg-emerald-500' },
      sebagian: { label: 'Sebagian',  statusClass: 'text-amber-600',   dot: 'bg-amber-500'   },
      tidak:    { label: 'Tidak Ada', statusClass: 'text-rose-600',    dot: 'bg-rose-500'    },
    },
    recommendations: {
      sebagian: 'Lengkapi alat utama: pastikan kamu memiliki TDS Meter dan PH Meter. Tambahkan minimal 3 alat pendukung (Box Styrofoam, Netpot, Tray Semai, Rockwool/Cocopeat, atau Kain Flanel).',
      tidak:    'Alat belum mencukupi. Prioritaskan pengadaan TDS Meter dan PH Meter sebagai alat utama pengukuran sebelum memulai budidaya.',
    },
  },
  nutrisi: {
    label: 'Nutrisi',
    display: {
      siap:  { label: 'Siap',   statusClass: 'text-emerald-600', dot: 'bg-emerald-500' },
      tidak: { label: 'Belum Siap', statusClass: 'text-rose-600',    dot: 'bg-rose-500'    },
    },
    recommendations: {
      tidak: 'Siapkan nutrisi hidroponik (AB-Mix atau jenis lain, organik/anorganik). Pelajari takaran pencampuran yang tepat — untuk AB-Mix: 5ml larutan A + 5ml larutan B per 1 liter air.',
    },
  },
  ph: {
    label: 'pH Air',
    display: {
      sesuai:       { label: 'Sesuai',       statusClass: 'text-emerald-600', dot: 'bg-emerald-500' },
      tidak_sesuai: { label: 'Tidak Sesuai', statusClass: 'text-rose-600',    dot: 'bg-rose-500'    },
    },
    recommendations: {
      tidak_sesuai: 'Jaga pH air pada rentang 5,5–6,5 menggunakan pH meter. pH di luar rentang ini menyebabkan akar busuk, batang busuk, dan daun menguning. Gunakan pH Up / pH Down untuk koreksi.',
    },
  },
  cahaya: {
    label: 'Cahaya Matahari',
    display: {
      cukup: { label: 'Cukup',    statusClass: 'text-emerald-600', dot: 'bg-emerald-500' },
      tidak:  { label: 'Kurang',  statusClass: 'text-rose-600',    dot: 'bg-rose-500'    },
    },
    recommendations: {
      tidak: 'Pindahkan instalasi ke lokasi yang mendapat sinar matahari langsung atau tidak langsung yang memadai. Lokasi outdoor atau greenhouse sangat disarankan. Tanaman kekurangan cahaya akan tumbuh kurus dan tidak produktif.',
    },
  },
  pestisida: {
    label: 'Pengendalian Hama',
    display: {
      pakai: { label: 'Siap',       statusClass: 'text-emerald-600', dot: 'bg-emerald-500' },
      tidak:  { label: 'Belum Siap', statusClass: 'text-amber-600',   dot: 'bg-amber-500'   },
    },
    recommendations: {
      tidak: 'Siapkan pestisida nabati atau kimia sebagai langkah antisipasi hama (kutu daun, jamur, dll). Penanganan dini jauh lebih efektif dan hemat dibanding menunggu serangan meluas.',
    },
  },
}