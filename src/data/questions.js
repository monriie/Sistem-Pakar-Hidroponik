export const QUESTIONS = [
  {
    id: 'alat_dasar',
    type: 'multi_select',
    text: 'Alat apa saja yang sudah kamu miliki saat ini?',
    hint: 'Pilih semua yang kamu punya',
    options: [
      { value: 'tds_meter',   label: 'TDS Meter' },
      { value: 'ph_meter',    label: 'PH Meter' },
      { value: 'styrofoam',   label: 'Box Styrofoam' },
      { value: 'netpot',      label: 'Netpot' },
      { value: 'tray_semai',  label: 'Tray Semai' },
      { value: 'rockwool',    label: 'Rockwool / Cocopeat' },
      { value: 'kain_flanel', label: 'Kain Flanel' },
    ],
  },
  {
    id: 'nutrisi',
    type: 'single_select',
    text: 'Bagaimana kondisi nutrisi (AB-Mix atau jenis lainnya) kamu saat ini?',
    hint: 'Pilih satu jawaban',
    options: [
      {
        value: 'siap',
        label: 'Saya punya nutrisi dan tahu cara mencampurnya',
        sublabel: 'contoh: AB-Mix 5ml A + 5ml B per liter air',
      },
      {
        value: 'tidak',
        label: 'Saya punya nutrisi tapi belum tahu cara mencampurnya',
      },
      {
        value: 'tidak',
        label: 'Saya belum punya nutrisi sama sekali',
      },
    ],
  },
  {
    id: 'ph_air',
    type: 'single_select',
    text: 'Berapa kisaran pH air yang kamu gunakan saat ini?',
    hint: 'Pilih satu jawaban',
    options: [
      {
        value: 'sesuai',
        label: 'pH 5,5 – 6,5 dan saya ukur dengan alat',
      },
      {
        value: 'tidak_sesuai',
        label: 'pH di luar rentang 5,5 – 6,5',
      },
      {
        value: 'tidak_sesuai',
        label: 'Saya belum pernah mengukur pH air',
      },
    ],
  },
  {
    id: 'cahaya',
    type: 'single_select',
    text: 'Bagaimana kondisi cahaya matahari di lokasi instalasi hidroponik kamu?',
    hint: 'Pilih satu jawaban',
    options: [
      {
        value: 'cukup',
        label: 'Di luar ruangan (outdoor), beratap maupun tidak',
      },
      {
        value: 'cukup',
        label: 'Di dalam greenhouse (bukan di dalam rumah/gedung)',
      },
      {
        value: 'tidak',
        label: 'Di dalam ruangan (rumah/gedung) dengan cahaya redup',
      },
      {
        value: 'tidak',
        label: 'Di dalam ruangan (rumah/gedung) tanpa cahaya matahari sama sekali',
      },
    ],
  },
  {
    id: 'pestisida',
    type: 'single_select',
    text: 'Jika terjadi serangan hama, apa rencana pengendalian yang kamu siapkan?',
    hint: 'Pilih satu jawaban',
    options: [
      {
        value: 'pakai',
        label: 'Sudah siapkan pestisida (kimia / nabati) sebagai langkah pengendalian',
      },
      {
        value: 'tidak',
        label: 'Belum menyiapkan apapun untuk pengendalian hama',
      },
    ],
  },
]