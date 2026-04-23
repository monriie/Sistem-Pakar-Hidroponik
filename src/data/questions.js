/**
 * @typedef {Object} Option
 * @property {string} id      - unique key untuk option ini
 * @property {string} label   - teks yang ditampilkan ke user
 * @property {string} value   - nilai internal untuk engine
 * @property {number} cf      - CF Evidence dari jawaban ini (0.0 – 1.0)
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
      // CF per alat tidak dipakai langsung — CF Evidence dihitung dari classifyAlat()
      // di expertSystem.js berdasarkan kombinasi semua alat yang dipilih.
      { id: 'tds',       label: 'TDS Meter',           value: 'tds',       cf: 1.0 },
      { id: 'ph_meter',  label: 'PH Meter',            value: 'ph_meter',  cf: 1.0 },
      { id: 'styrofoam', label: 'Box Styrofoam',       value: 'styrofoam', cf: 1.0 },
      { id: 'netpot',    label: 'Netpot',              value: 'netpot',    cf: 1.0 },
      { id: 'tray',      label: 'Tray Semai',          value: 'tray',      cf: 1.0 },
      { id: 'rockwool',  label: 'Rockwool / Cocopeat', value: 'rockwool',  cf: 1.0 },
      { id: 'flanel',    label: 'Kain Flanel',         value: 'flanel',    cf: 1.0 },
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
        cf: 1.0, // definitely siap — punya + paham takaran
      },
      {
        id: 'nutrisi_punya_tidak_tahu',
        label: 'Punya nutrisi tapi belum tahu cara mencampurnya',
        value: 'tidak',
        cf: 0.2, // definitely tidak — punya stok tapi tidak bisa dipakai benar
      },
      {
        id: 'nutrisi_tidak_punya',
        label: 'Belum punya nutrisi sama sekali',
        value: 'tidak',
        cf: 0.0, // definitely tidak — tidak ada sama sekali
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
        cf: 1.0, // definitely sesuai — faktual dan terukur
      },
      {
        id: 'ph_luar',
        label: 'pH di luar rentang 5,5 – 6,5',
        value: 'tidak_sesuai',
        cf: 0.4, // definitely tidak sesuai — sudah tahu salah
      },
      {
        id: 'ph_belum',
        label: 'Belum pernah mengukur pH air',
        value: 'tidak_sesuai',
        cf: 0.0, // definitely tidak — tidak terkontrol = tidak sesuai
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
        cf: 1.0, // definitely cukup — cahaya matahari langsung/tidak langsung penuh
      },
      {
        id: 'cahaya_greenhouse',
        label: 'Di dalam greenhouse',
        sublabel: 'Bukan di dalam rumah / gedung',
        value: 'cukup',
        cf: 0.9, // almost certainly cukup — greenhouse bisa ada filter cahaya ringan
      },
      {
        id: 'cahaya_redup',
        label: 'Di dalam ruangan dengan cahaya redup',
        sublabel: 'Rumah / gedung',
        value: 'tidak',
        cf: 0.4, // almost certainly tidak — jelas tidak cukup
      },
      {
        id: 'cahaya_gelap',
        label: 'Di dalam ruangan tanpa cahaya matahari sama sekali',
        sublabel: 'Rumah / gedung',
        value: 'tidak',
        cf: 0.0, // definitely tidak — nol cahaya
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
        cf: 1.0, // definitely siap — ada langkah nyata
      },
      {
        id: 'pestisida_tidak',
        label: 'Belum menyiapkan apapun untuk pengendalian hama',
        value: 'tidak',
        cf: 0.0, // definitely tidak — tidak ada persiapan sama sekali
      },
    ],
  },
]

export const TOTAL_QUESTIONS = QUESTIONS.length