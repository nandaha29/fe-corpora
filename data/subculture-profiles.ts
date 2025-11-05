// Centralized subculture profiles data
// Contains demographic information, history, media references, gallery images, and 3D models for all subcultures

export interface GalleryImage {
  url: string
  title: string
  description?: string
  alt: string
}

export interface Model3D {
  sketchfabId: string
  title: string
  description: string
  artifactType: string
  tags: string[]
}

export interface SubcultureProfile {
  displayName: string
  demographics: {
    population: string
    area: string
    density: string
    languages: string[]
  }
  history: string
  highlights: string[]
  video: {
    youtubeId: string
    title: string
    description: string
    duration: string
    tags: string[]
  }
  galleryImages: GalleryImage[]
  model3dArray: Model3D[]
}

export const SUBCULTURE_PROFILES: Record<string, SubcultureProfile> = {
  arekan: {
    displayName: "Arekan",
    demographics: {
      population: "± 5.1M (fiksi)",
      area: "6.200 km²",
      density: "825/km²",
      languages: ["Jawa Arek", "Madura", "Indonesia"],
    },
    history:
      "Berakar dari budaya pesisir perkotaan, Arekan tumbuh dalam kosmopolitanisme pelabuhan dengan seni tutur dan teater rakyat yang kuat.",
    highlights: ["Ludruk dan Remo", "Kuliner pesisir (rujak cingur)", "Ekspresi urban egaliter"],
    video: {
      youtubeId: "dQw4w9WgXcQ",
      title: "Budaya Arekan: Ludruk dan Remo",
      description: "Dokumenter tentang tradisi teater rakyat dan seni tutur Arekan yang dinamis.",
      duration: "12:45",
      tags: ["Ludruk", "Remo", "Teater Rakyat", "Budaya Pesisir"],
    },
    galleryImages: [
      {
        url: "/subculture-gallery-1.jpg",
        title: "Pertunjukan Ludruk Arekan",
        description: "Pertunjukan teater rakyat Ludruk yang dinamis dan menghibur",
        alt: "Pertunjukan Ludruk Arekan dengan kostum tradisional",
      },
      {
        url: "/subculture-gallery-2.jpg",
        title: "Tarian Remo Tradisional",
        description: "Tarian Remo yang menampilkan ekspresi urban dan energi pesisir",
        alt: "Penari Remo dalam kostum tradisional Arekan",
      },
      {
        url: "/subculture-gallery-3.jpg",
        title: "Kuliner Pesisir Arekan",
        description: "Rujak cingur dan hidangan khas pesisir Arekan",
        alt: "Hidangan tradisional rujak cingur Arekan",
      },
            {
        url: "/subculture-gallery-3.jpg",
        title: "Kuliner Pesisir Arekan",
        description: "Rujak cingur dan hidangan khas pesisir Arekan",
        alt: "Hidangan tradisional rujak cingur Arekan",
      },
                  {
        url: "/subculture-gallery-3.jpg",
        title: "Kuliner Pesisir Arekan",
        description: "Rujak cingur dan hidangan khas pesisir Arekan",
        alt: "Hidangan tradisional rujak cingur Arekan",
      },
    ],
    model3dArray: [
      {
        sketchfabId: "3c5c5c5c5c5c5c5c",
        title: "Topeng Ludruk Arekan",
        description: "Model 3D interaktif dari topeng tradisional Ludruk Arekan dengan detail ukiran khas.",
        artifactType: "Topeng Teater",
        tags: ["Topeng", "Ludruk", "Kerajinan", "Teater"],
      },
      {
        sketchfabId: "3c5c5c5c5c5c5c5d",
        title: "Alat Musik Gamelan Arekan",
        description: "Model 3D dari instrumen gamelan tradisional yang digunakan dalam pertunjukan Ludruk.",
        artifactType: "Alat Musik",
        tags: ["Gamelan", "Musik", "Instrumen", "Tradisional"],
      },
      {
        sketchfabId: "3c5c5c5c5c5c5c5e",
        title: "Kostum Remo Arekan",
        description: "Model 3D dari kostum tradisional penari Remo dengan ornamen khas Arekan.",
        artifactType: "Kostum Tarian",
        tags: ["Remo", "Kostum", "Tarian", "Pakaian Tradisional"],
      },
    ],
  },
  madura: {
    displayName: "Madura",
    demographics: {
      population: "± 4.2M (fiksi)",
      area: "5.200 km²",
      density: "808/km²",
      languages: ["Madura", "Indonesia"],
    },
    history: "Tradisi pesantren, maritim, dan jejaring dagang membentuk identitas Madura lintas kepulauan.",
    highlights: ["Karapan Sapi", "Keris dan kriya logam", "Tradisi pesantren"],
    video: {
      youtubeId: "dQw4w9WgXcQ",
      title: "Karapan Sapi Madura",
      description: "Dokumenter tentang tradisi balap sapi yang ikonik di Madura.",
      duration: "15:30",
      tags: ["Karapan Sapi", "Tradisi", "Olahraga Rakyat"],
    },
    galleryImages: [
      {
        url: "/subculture-gallery-1.jpg",
        title: "Karapan Sapi Madura",
        description: "Balap sapi tradisional yang menjadi identitas budaya Madura",
        alt: "Karapan Sapi dengan sapi yang dihiasi tradisional",
      },
      {
        url: "/subculture-gallery-2.jpg",
        title: "Keris Madura Tradisional",
        description: "Keris dengan ukiran khas dan keahlian kriya logam Madura",
        alt: "Keris Madura dengan gagang dan sarung tradisional",
      },
      {
        url: "/subculture-gallery-3.jpg",
        title: "Pesantren Madura",
        description: "Tradisi pesantren yang kuat dalam kehidupan masyarakat Madura",
        alt: "Suasana pesantren tradisional di Madura",
      },
    ],
    model3dArray: [
      {
        sketchfabId: "3c5c5c5c5c5c5c5c",
        title: "Keris Madura",
        description: "Model 3D dari keris tradisional Madura dengan ukiran khas dan detail metalurgi.",
        artifactType: "Senjata Tradisional",
        tags: ["Keris", "Kriya Logam", "Senjata", "Kerajinan"],
      },
      {
        sketchfabId: "3c5c5c5c5c5c5c5f",
        title: "Sadel Karapan Sapi",
        description: "Model 3D dari sadel tradisional yang digunakan dalam Karapan Sapi Madura.",
        artifactType: "Peralatan Karapan",
        tags: ["Karapan Sapi", "Sadel", "Peralatan", "Tradisional"],
      },
    ],
  },
  "madura-base": {
    displayName: "Madura-Base",
    demographics: {
      population: "± 1.1M (fiksi)",
      area: "1.900 km²",
      density: "579/km²",
      languages: ["Madura", "Indonesia"],
    },
    history:
      "Wilayah basis subkultur Madura dengan penguatan praktik keseharian—anyaman, ritual kampung, dan solidaritas komunal.",
    highlights: ["Anyaman & kriya serat", "Kuliner harian", "Ritual kampung"],
    video: {
      youtubeId: "dQw4w9WgXcQ",
      title: "Kehidupan Sehari-hari Madura-Base",
      description: "Dokumenter tentang praktik keseharian dan ritual komunal di Madura-Base.",
      duration: "18:20",
      tags: ["Kehidupan Sehari-hari", "Ritual", "Komunitas"],
    },
    galleryImages: [
      {
        url: "/subculture-gallery-1.jpg",
        title: "Anyaman Tradisional",
        description: "Kerajinan anyaman serat yang merupakan praktik keseharian Madura-Base",
        alt: "Proses pembuatan anyaman serat tradisional",
      },
      {
        url: "/subculture-gallery-2.jpg",
        title: "Ritual Kampung",
        description: "Ritual komunal yang memperkuat solidaritas masyarakat Madura-Base",
        alt: "Acara ritual komunal di kampung Madura-Base",
      },
    ],
    model3dArray: [
      {
        sketchfabId: "3c5c5c5c5c5c5c5c",
        title: "Anyaman Tradisional Madura",
        description: "Model 3D dari kerajinan anyaman serat tradisional Madura dengan teknik khas.",
        artifactType: "Kerajinan Serat",
        tags: ["Anyaman", "Kriya Serat", "Kerajinan", "Tradisional"],
      },
    ],
  },
  "madura-bawean": {
    displayName: "Madura-Bawean",
    demographics: {
      population: "± 70K (fiksi)",
      area: "196 km²",
      density: "357/km²",
      languages: ["Bawean", "Madura", "Indonesia"],
    },
    history: "Subkultur kepulauan dengan tradisi maritim, bahasa lokal, dan musik rakyat yang hidup.",
    highlights: ["Tradisi maritim", "Bahasa lokal", "Kesenian pulau"],
    video: {
      youtubeId: "dQw4w9WgXcQ",
      title: "Budaya Maritim Bawean",
      description: "Dokumenter tentang tradisi maritim dan kesenian pulau Bawean.",
      duration: "14:15",
      tags: ["Maritim", "Pulau", "Kesenian Lokal"],
    },
    galleryImages: [
      {
        url: "/subculture-gallery-1.jpg",
        title: "Perahu Tradisional Bawean",
        description: "Perahu nelayan tradisional yang menjadi simbol maritim Bawean",
        alt: "Perahu tradisional Bawean di laut",
      },
      {
        url: "/subculture-gallery-2.jpg",
        title: "Musik Rakyat Bawean",
        description: "Pertunjukan musik rakyat lokal Bawean",
        alt: "Musisi tradisional Bawean dengan alat musik lokal",
      },
    ],
    model3dArray: [
      {
        sketchfabId: "3c5c5c5c5c5c5c5c",
        title: "Perahu Tradisional Bawean",
        description: "Model 3D dari perahu tradisional Bawean dengan konstruksi maritim khas.",
        artifactType: "Perahu",
        tags: ["Perahu", "Maritim", "Transportasi", "Tradisional"],
      },
    ],
  },
  "madura-kangean": {
    displayName: "Madura-Kangean",
    demographics: {
      population: "± 85K (fiksi)",
      area: "488 km²",
      density: "174/km²",
      languages: ["Madura", "Indonesia"],
    },
    history: "Jejaring pulau-pulau timur dengan identitas pesisir, perikanan, dan perdagangan.",
    highlights: ["Ritus pesisir", "Perikanan", "Kriya lokal"],
    video: {
      youtubeId: "dQw4w9WgXcQ",
      title: "Perikanan Kangean",
      description: "Dokumenter tentang tradisi perikanan dan perdagangan di Kangean.",
      duration: "13:40",
      tags: ["Perikanan", "Perdagangan", "Pesisir"],
    },
    galleryImages: [
      {
        url: "/subculture-gallery-1.jpg",
        title: "Nelayan Kangean",
        description: "Tradisi perikanan yang menjadi mata pencaharian utama Kangean",
        alt: "Nelayan Kangean dengan hasil tangkapan ikan",
      },
      {
        url: "/subculture-gallery-2.jpg",
        title: "Pasar Tradisional Kangean",
        description: "Pasar perdagangan lokal di Kangean",
        alt: "Pasar tradisional dengan hasil laut Kangean",
      },
    ],
    model3dArray: [
      {
        sketchfabId: "3c5c5c5c5c5c5c5c",
        title: "Alat Tangkap Ikan Kangean",
        description: "Model 3D dari alat tangkap ikan tradisional Kangean dengan desain lokal.",
        artifactType: "Alat Perikanan",
        tags: ["Alat Tangkap", "Perikanan", "Tradisional"],
      },
    ],
  },
  mataraman: {
    displayName: "Mataraman",
    demographics: {
      population: "± 3.6M (fiksi)",
      area: "7.300 km²",
      density: "493/km²",
      languages: ["Jawa Mataraman", "Indonesia"],
    },
    history: "Warna kebudayaan Jawa Mataraman—tata krama, gamelan, dan wayang—membentuk lanskap kebudayaan setempat.",
    highlights: ["Gamelan & wayang", "Adab Mataraman", "Seni tutur"],
    video: {
      youtubeId: "dQw4w9WgXcQ",
      title: "Gamelan dan Wayang Mataraman",
      description: "Dokumenter tentang tradisi gamelan dan wayang kulit Mataraman.",
      duration: "20:10",
      tags: ["Gamelan", "Wayang", "Seni Tradisional"],
    },
    galleryImages: [
      {
        url: "/subculture-gallery-1.jpg",
        title: "Pertunjukan Wayang Kulit",
        description: "Pertunjukan wayang kulit Mataraman yang megah dan penuh makna",
        alt: "Pertunjukan wayang kulit dengan layar dan cahaya tradisional",
      },
      {
        url: "/subculture-gallery-2.jpg",
        title: "Orkestra Gamelan",
        description: "Orkestra gamelan Mataraman dalam pertunjukan tradisional",
        alt: "Musisi gamelan Mataraman dalam pertunjukan",
      },
      {
        url: "/subculture-gallery-3.jpg",
        title: "Tata Krama Mataraman",
        description: "Upacara dan tata krama tradisional Mataraman",
        alt: "Upacara adat Mataraman dengan pakaian tradisional",
      },
    ],
    model3dArray: [
      {
        sketchfabId: "3c5c5c5c5c5c5c5c",
        title: "Wayang Kulit Mataraman",
        description: "Model 3D dari wayang kulit tradisional Mataraman dengan detail ukiran halus.",
        artifactType: "Wayang Kulit",
        tags: ["Wayang", "Kulit", "Seni Pertunjukan", "Tradisional"],
      },
      {
        sketchfabId: "3c5c5c5c5c5c5c5g",
        title: "Instrumen Gamelan Mataraman",
        description: "Model 3D dari instrumen gamelan Mataraman dengan akustik khas.",
        artifactType: "Alat Musik",
        tags: ["Gamelan", "Musik", "Instrumen", "Tradisional"],
      },
    ],
  },
  osing: {
    displayName: "Osing (Using)",
    demographics: {
      population: "± 1.1M (fiksi)",
      area: "5.800 km²",
      density: "190/km²",
      languages: ["Osing/Using", "Jawa", "Indonesia"],
    },
    history: "Subkultur Osing mempunyai bahasa, musik, dan tarian khas; identitas kultural kuat di Banyuwangi.",
    highlights: ["Gandrung", "Barong & musik tradisional", "Batik Using"],
    video: {
      youtubeId: "dQw4w9WgXcQ",
      title: "Gandrung dan Barong Osing",
      description: "Dokumenter tentang tarian Gandrung dan Barong tradisional Osing.",
      duration: "16:50",
      tags: ["Gandrung", "Barong", "Tarian Tradisional"],
    },
    galleryImages: [
      {
        url: "/subculture-gallery-1.jpg",
        title: "Tarian Gandrung",
        description: "Tarian Gandrung yang penuh ekspresi dan energi Osing",
        alt: "Penari Gandrung dalam kostum tradisional Osing",
      },
      {
        url: "/subculture-gallery-2.jpg",
        title: "Topeng Barong Osing",
        description: "Topeng Barong dengan desain khas Osing",
        alt: "Topeng Barong Osing dengan warna-warna cerah",
      },
      {
        url: "/subculture-gallery-3.jpg",
        title: "Batik Using",
        description: "Motif batik tradisional Using dari Banyuwangi",
        alt: "Kain batik Using dengan motif tradisional",
      },
    ],
    model3dArray: [
      {
        sketchfabId: "3c5c5c5c5c5c5c5c",
        title: "Topeng Barong Osing",
        description: "Model 3D dari topeng Barong tradisional Osing dengan detail warna dan ukiran.",
        artifactType: "Topeng Tarian",
        tags: ["Topeng", "Barong", "Tarian", "Kerajinan"],
      },
      {
        sketchfabId: "3c5c5c5c5c5c5c5h",
        title: "Kostum Gandrung Osing",
        description: "Model 3D dari kostum tradisional penari Gandrung Osing.",
        artifactType: "Kostum Tarian",
        tags: ["Gandrung", "Kostum", "Tarian", "Pakaian Tradisional"],
      },
    ],
  },
  panaragan: {
    displayName: "Panaragan",
    demographics: {
      population: "± 0.9M (fiksi)",
      area: "4.400 km²",
      density: "205/km²",
      languages: ["Jawa", "Indonesia"],
    },
    history: "Kekuatan seni rakyat dan kerajinan kayu menjadi aksen keseharian Panaragan.",
    highlights: ["Kerajinan kayu", "Seni rakyat", "Upacara lokal"],
    video: {
      youtubeId: "dQw4w9WgXcQ",
      title: "Kerajinan Kayu Panaragan",
      description: "Dokumenter tentang kerajinan kayu dan seni rakyat Panaragan.",
      duration: "11:30",
      tags: ["Kerajinan Kayu", "Seni Rakyat", "Tradisional"],
    },
    galleryImages: [
      {
        url: "/subculture-gallery-1.jpg",
        title: "Ukiran Kayu Panaragan",
        description: "Kerajinan ukiran kayu yang menampilkan keahlian Panaragan",
        alt: "Ukiran kayu tradisional Panaragan dengan detail halus",
      },
      {
        url: "/subculture-gallery-2.jpg",
        title: "Seni Rakyat Panaragan",
        description: "Pertunjukan seni rakyat lokal Panaragan",
        alt: "Pertunjukan seni rakyat tradisional Panaragan",
      },
    ],
    model3dArray: [
      {
        sketchfabId: "3c5c5c5c5c5c5c5c",
        title: "Ukiran Kayu Panaragan",
        description: "Model 3D dari ukiran kayu tradisional Panaragan dengan motif khas.",
        artifactType: "Ukiran Kayu",
        tags: ["Ukiran", "Kayu", "Kerajinan", "Seni"],
      },
    ],
  },
  pandalungan: {
    displayName: "Pandalungan",
    demographics: {
      population: "± 2.2M (fiksi)",
      area: "6.000 km²",
      density: "367/km²",
      languages: ["Jawa", "Madura", "Indonesia"],
    },
    history: "Perpaduan Jawa–Madura melahirkan dialek, kuliner, dan ritus yang khas tapal kuda.",
    highlights: ["Dialek Pandalungan", "Kuliner pesisir", "Tradisi campuran"],
    video: {
      youtubeId: "dQw4w9WgXcQ",
      title: "Budaya Pandalungan",
      description: "Dokumenter tentang perpaduan budaya Jawa-Madura di Pandalungan.",
      duration: "17:25",
      tags: ["Jawa-Madura", "Dialek", "Kuliner"],
    },
    galleryImages: [
      {
        url: "/subculture-gallery-1.jpg",
        title: "Kuliner Pandalungan",
        description: "Hidangan khas Pandalungan yang memadukan cita rasa Jawa dan Madura",
        alt: "Hidangan tradisional Pandalungan",
      },
      {
        url: "/subculture-gallery-2.jpg",
        title: "Upacara Tradisional Pandalungan",
        description: "Upacara adat yang menggabungkan tradisi Jawa dan Madura",
        alt: "Upacara adat Pandalungan",
      },
    ],
    model3dArray: [
      {
        sketchfabId: "3c5c5c5c5c5c5c5c",
        title: "Artefak Pandalungan",
        description: "Model 3D dari artefak budaya Pandalungan yang menggabungkan elemen Jawa-Madura.",
        artifactType: "Artefak Budaya",
        tags: ["Pandalungan", "Budaya", "Tradisional"],
      },
    ],
  },
  samin: {
    displayName: "Samin",
    demographics: {
      population: "± 35K (fiksi)",
      area: "380 km²",
      density: "92/km²",
      languages: ["Jawa", "Indonesia"],
    },
    history: "Komunitas Samin dikenal lewat etika kejujuran, laku sederhana, dan sejarah gerakan sosial.",
    highlights: ["Etika Samin", "Pertanian", "Komunitas mandiri"],
    video: {
      youtubeId: "dQw4w9WgXcQ",
      title: "Komunitas Samin",
      description: "Dokumenter tentang komunitas Samin dan etika kejujuran mereka.",
      duration: "19:15",
      tags: ["Komunitas", "Etika", "Gerakan Sosial"],
    },
    galleryImages: [
      {
        url: "/subculture-gallery-1.jpg",
        title: "Kehidupan Komunitas Samin",
        description: "Kehidupan sehari-hari komunitas Samin yang sederhana dan etis",
        alt: "Anggota komunitas Samin dalam aktivitas sehari-hari",
      },
      {
        url: "/subculture-gallery-2.jpg",
        title: "Pertanian Samin",
        description: "Praktik pertanian tradisional komunitas Samin",
        alt: "Petani Samin di sawah dengan alat tradisional",
      },
    ],
    model3dArray: [
      {
        sketchfabId: "3c5c5c5c5c5c5c5c",
        title: "Alat Pertanian Samin",
        description: "Model 3D dari alat pertanian tradisional Samin dengan desain sederhana.",
        artifactType: "Alat Pertanian",
        tags: ["Pertanian", "Alat Tradisional", "Komunitas"],
      },
    ],
  },
  tengger: {
    displayName: "Tengger",
    demographics: {
      population: "± 110K (fiksi)",
      area: "1.200 km²",
      density: "92/km²",
      languages: ["Jawa Tenggeran", "Indonesia"],
    },
    history: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    highlights: ["Yadnya Kasada", "Pegunungan Bromo", "Pertanian dataran tinggi"],
    video: {
      youtubeId: "dQw4w9WgXcQ",
      title: "Yadnya Kasada Tengger",
      description: "Dokumenter tentang ritus Yadnya Kasada dan tradisi Tengger di Bromo.",
      duration: "22:40",
      tags: ["Yadnya Kasada", "Bromo", "Ritus Tradisional"],
    },
    galleryImages: [
      {
        url: "/subculture-gallery-1.jpg",
        title: "Gunung Bromo Sakral",
        description: "Pemandangan Gunung Bromo yang sakral bagi komunitas Tengger",
        alt: "Gunung Bromo dengan kabut pagi",
      },
      {
        url: "/subculture-gallery-2.jpg",
        title: "Ritus Yadnya Kasada",
        description: "Upacara Yadnya Kasada yang megah di Gunung Bromo",
        alt: "Upacara Yadnya Kasada dengan sesaji di Bromo",
      },
      {
        url: "/subculture-gallery-3.jpg",
        title: "Kehidupan Pegunungan Tengger",
        description: "Kehidupan sehari-hari komunitas Tengger di pegunungan",
        alt: "Rumah tradisional Tengger di pegunungan Bromo",
      },
    ],
    model3dArray: [
      {
        sketchfabId: "e0197431bb6b49c78f9cd53313b94d5d",
        title: "Gunung Bromo",
        description: "Model 3D interaktif dari Gunung Bromo yang sakral bagi Tengger dengan detail topografi.",
        artifactType: "Lanskap Alam",
        tags: ["Bromo", "Gunung", "Lanskap", "Sakral"],
      },
      {
        sketchfabId: "894a54c735a8431197ae9a3d2d61c6b3",
        title: "Candi Peninggalan Tengger",
        description: "Model 3D dari candi peninggalan budaya Tengger di sekitar Bromo.",
        artifactType: "Arsitektur Kuno",
        tags: ["Candi", "Arsitektur", "Peninggalan", "Tradisional"],
      },
    ],
  },
}
