/**
 * @typedef {Object} Option
 * @property {string} id      - unique key untuk option ini
 * @property {string} label   - teks yang ditampilkan ke user
 * @property {string} value   - nilai internal untuk engine
 */

/**
 * @typedef {Object} Question
 * @property {string}   id          - identifier soal (alat, nutrisi, ph, cahaya, pestisida)
 * @property {number}   order       - urutan soal (1-5)
 * @property {string}   category    - label kategori
 * @property {string}   question    - teks pertanyaan
 * @property {string}   hint        - sub-teks / petunjuk
 * @property {'single'|'multi'} type - jenis input
 * @property {Option[]} options     - daftar pilihan
 */

/** @type {Question[]} */
export const QUESTIONS = [
  {
    id: 'alat',
    order: 1,
    category: 'Alat Dasar',
    question: 'Alat apa saja yang sudah kamu miliki saat ini?',
    hint: 'Boleh pilih lebih dari satu',
    type: 'multi',
    options: [
      { id: 'tds',        label: 'TDS Meter',          value: 'tds' },
      { id: 'ph_meter',   label: 'PH Meter',           value: 'ph_meter' },
      { id: 'styrofoam',  label: 'Box Styrofoam',      value: 'styrofoam' },
      { id: 'netpot',     label: 'Netpot',             value: 'netpot' },
      { id: 'tray',       label: 'Tray Semai',         value: 'tray' },
      { id: 'rockwool',   label: 'Rockwool / Cocopeat', value: 'rockwool' },
      { id: 'flanel',     label: 'Kain Flanel',        value: 'flanel' },
    ],
  },
  {
    id: 'nutrisi',
    order: 2,
    category: 'Nutrisi',
    question: 'Bagaimana kondisi nutrisi (misalnya AB-Mix) kamu saat ini?',
    hint: 'Pilih satu jawaban',
    type: 'single',
    options: [
      {
        id: 'nutrisi_siap',
        label: 'Punya nutrisi dan tahu cara mencampurnya',
        sublabel: 'Contoh AB-Mix: 5ml A + 5ml B per liter air',
        value: 'siap',
      },
      {
        id: 'nutrisi_punya_tidak_tahu',
        label: 'Punya nutrisi tapi belum tahu cara mencampurnya',
        value: 'tidak',
      },
      {
        id: 'nutrisi_tidak_punya',
        label: 'Belum punya nutrisi sama sekali',
        value: 'tidak',
      },
    ],
  },
  {
    id: 'ph',
    order: 3,
    category: 'pH Air',
    question: 'Berapa kisaran pH air yang kamu gunakan saat ini?',
    hint: 'Pilih satu jawaban',
    type: 'single',
    options: [
      {
        id: 'ph_sesuai',
        label: 'pH 5,5 – 6,5',
        sublabel: 'Diukur dengan alat',
        value: 'sesuai',
      },
      {
        id: 'ph_luar',
        label: 'pH di luar rentang 5,5 – 6,5',
        value: 'tidak_sesuai',
      },
      {
        id: 'ph_belum',
        label: 'Belum pernah mengukur pH air',
        value: 'tidak_sesuai',
      },
    ],
  },
  {
    id: 'cahaya',
    order: 4,
    category: 'Cahaya Matahari',
    question: 'Bagaimana kondisi cahaya matahari di lokasi instalasi hidroponik kamu?',
    hint: 'Pilih satu jawaban',
    type: 'single',
    options: [
      {
        id: 'cahaya_outdoor',
        label: 'Di luar ruangan (outdoor)',
        sublabel: 'Baik beratap maupun tidak beratap',
        value: 'cukup',
      },
      {
        id: 'cahaya_greenhouse',
        label: 'Di dalam greenhouse',
        sublabel: 'Bukan di dalam rumah / gedung',
        value: 'cukup',
      },
      {
        id: 'cahaya_redup',
        label: 'Di dalam ruangan dengan cahaya redup',
        sublabel: 'Rumah / gedung',
        value: 'tidak',
      },
      {
        id: 'cahaya_gelap',
        label: 'Di dalam ruangan tanpa cahaya matahari sama sekali',
        sublabel: 'Rumah / gedung',
        value: 'tidak',
      },
    ],
  },
  {
    id: 'pestisida',
    order: 5,
    category: 'Pengendalian Hama',
    question: 'Jika terjadi serangan hama, apa rencana pengendalian yang kamu siapkan?',
    hint: 'Pilih satu jawaban',
    type: 'single',
    options: [
      {
        id: 'pestisida_pakai',
        label: 'Sudah siapkan pestisida sebagai langkah pengendalian',
        sublabel: 'Kimia atau nabati',
        value: 'pakai',
      },
      {
        id: 'pestisida_tidak',
        label: 'Belum menyiapkan apapun untuk pengendalian hama',
        value: 'tidak',
      },
    ],
  },
]

export const TOTAL_QUESTIONS = QUESTIONS.length