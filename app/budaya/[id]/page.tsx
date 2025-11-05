"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Clock,
  MapPin,
  Star,
  Calendar,
  Users,
  BookOpen,
  Share2,
  Heart,
  Camera,
  Music,
  Utensils,
  Palette,
  Languages,
  Globe,
  ChevronRight,
  Play,
  Download,
  ExternalLink,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

const culturalItems = [
  {
    id: 1,
    title: "Tari Reog Ponorogo",
    subtitle: "Kesenian Tari Tradisional",
    description:
      "Tarian tradisional yang menggambarkan kekuatan dan keberanian dengan topeng singa barong yang megah. Merupakan warisan budaya yang telah diakui UNESCO.",
    badge: "Kesenian",
    category: "tari",
    region: "Ponorogo",
    difficulty: "Menengah",
    duration: "45 menit",
    popularity: 95,
    tags: ["tari", "tradisional", "unesco", "ponorogo", "singa barong"],
    lastUpdated: "2024-01-15",
    detailedDescription:
      "Reog Ponorogo adalah kesenian tradisional yang berasal dari Kabupaten Ponorogo, Jawa Timur. Kesenian ini menggabungkan unsur tari, musik, dan teater dalam satu pertunjukan yang memukau. Reog Ponorogo telah diakui oleh UNESCO sebagai Warisan Budaya Takbenda Manusia pada tahun 2015.",
    history:
      "Reog Ponorogo memiliki sejarah yang panjang, diperkirakan sudah ada sejak abad ke-15. Menurut legenda, Reog diciptakan oleh Ki Ageng Kutu, seorang pemberontak dari Kerajaan Majapahit yang mengkritik raja melalui pertunjukan seni.",
    significance:
      "Reog Ponorogo tidak hanya sebagai hiburan, tetapi juga sebagai media pendidikan moral dan spiritual. Setiap gerakan dan karakter dalam Reog memiliki makna filosofis yang mendalam.",
    elements: [
      { name: "Singa Barong", description: "Topeng singa raksasa yang menjadi ikon utama Reog" },
      { name: "Jathil", description: "Penari berkuda yang menggambarkan prajurit" },
      { name: "Klono Sewandono", description: "Raja yang angkuh dan sombong" },
      { name: "Bujangganong", description: "Punakawan yang menghibur" },
    ],
    gallery: [
      "/tari-reog-ponorogo-dengan-topeng-singa-barong.jpg",
      "/penari-jathil-reog-ponorogo.jpg",
      "/pertunjukan-reog-ponorogo-lengkap.jpg",
    ],
    videos: [
      { title: "Pertunjukan Reog Ponorogo Lengkap", duration: "45:30" },
      { title: "Sejarah dan Makna Reog", duration: "12:15" },
    ],
    relatedItems: [4, 8, 6],
  },
  {
    id: 2,
    title: "Batik Malangan",
    subtitle: "Seni Kerajinan Tekstil",
    description:
      "Batik khas Malang dengan motif yang terinspirasi dari alam dan budaya lokal yang unik. Memiliki ciri khas warna-warna cerah dan motif flora fauna.",
    badge: "Kerajinan",
    category: "batik",
    region: "Malang",
    difficulty: "Tinggi",
    duration: "2-3 hari",
    popularity: 88,
    tags: ["batik", "tekstil", "malang", "kerajinan", "motif"],
    lastUpdated: "2024-01-10",
    detailedDescription:
      "Batik Malangan adalah karya seni tekstil tradisional yang berkembang di Kota Malang dan sekitarnya. Batik ini memiliki keunikan tersendiri dengan motif-motif yang terinspirasi dari kekayaan alam dan budaya lokal Malang.",
    history:
      "Batik Malangan mulai berkembang pada awal abad ke-20, dipengaruhi oleh kedatangan para pengrajin batik dari Solo dan Yogyakarta. Seiring waktu, batik Malangan mengembangkan ciri khasnya sendiri.",
    significance:
      "Batik Malangan menjadi identitas budaya Kota Malang dan berkontribusi dalam pelestarian warisan budaya Indonesia. Motif-motifnya mencerminkan kearifan lokal masyarakat Malang.",
    elements: [
      { name: "Motif Singosari", description: "Terinspirasi dari Kerajaan Singosari" },
      { name: "Motif Apel", description: "Mengangkat ikon buah apel khas Malang" },
      { name: "Motif Ijen", description: "Terinspirasi dari keindahan Gunung Ijen" },
      { name: "Motif Tugu", description: "Mengangkat landmark Tugu Malang" },
    ],
    gallery: [
      "/batik-malangan-dengan-motif-apel.jpg",
      "/proses-pembuatan-batik-malangan.jpg",
      "/koleksi-batik-malangan-berbagai-motif.jpg",
    ],
    videos: [
      { title: "Proses Pembuatan Batik Malangan", duration: "25:45" },
      { title: "Filosofi Motif Batik Malangan", duration: "18:20" },
    ],
    relatedItems: [9, 1, 6],
  },
  {
    id: 3,
    title: "Rujak Cingur",
    subtitle: "Kuliner Tradisional Khas",
    description:
      "Makanan khas Surabaya yang terbuat dari sayuran segar dan cingur sapi dengan bumbu petis yang kaya rasa. Hidangan yang mencerminkan keberagaman kuliner Jawa Timur.",
    badge: "Kuliner",
    category: "makanan",
    region: "Surabaya",
    difficulty: "Mudah",
    duration: "30 menit",
    popularity: 92,
    tags: ["kuliner", "surabaya", "rujak", "petis", "tradisional"],
    lastUpdated: "2024-01-12",
    detailedDescription:
      "Rujak Cingur adalah salah satu kuliner ikonik Surabaya yang menggabungkan berbagai sayuran segar dengan cingur (hidung sapi) dan bumbu petis yang khas. Hidangan ini mencerminkan keberagaman dan kreativitas kuliner masyarakat Jawa Timur.",
    history:
      "Rujak Cingur diperkirakan sudah ada sejak zaman kolonial Belanda. Hidangan ini berkembang dari kreativitas masyarakat Surabaya dalam mengolah bahan-bahan lokal menjadi makanan yang lezat dan bergizi.",
    significance:
      "Rujak Cingur bukan hanya makanan, tetapi juga simbol keberagaman dan toleransi masyarakat Surabaya. Hidangan ini menggabungkan berbagai elemen yang berbeda menjadi satu kesatuan yang harmonis.",
    elements: [
      { name: "Cingur", description: "Hidung sapi yang direbus hingga empuk" },
      { name: "Petis", description: "Bumbu khas dari udang atau ikan" },
      { name: "Sayuran Segar", description: "Timun, tauge, tahu, tempe" },
      { name: "Kerupuk", description: "Pelengkap yang menambah tekstur" },
    ],
    gallery: [
      "/rujak-cingur-surabaya-lengkap.jpg",
      "/bahan-bahan-rujak-cingur.jpg",
      "/penjual-rujak-cingur-tradisional.jpg",
    ],
    videos: [
      { title: "Cara Membuat Rujak Cingur Asli", duration: "15:30" },
      { title: "Sejarah Rujak Cingur Surabaya", duration: "8:45" },
    ],
    relatedItems: [7, 5, 1],
  },
  {
    id: 4,
    title: "Wayang Kulit",
    subtitle: "Seni Pertunjukan Klasik",
    description:
      "Pertunjukan tradisional menggunakan boneka kulit dengan cerita epik Jawa yang filosofis. Seni bercerita yang menggabungkan musik, drama, dan filosofi hidup.",
    badge: "Pertunjukan",
    category: "wayang",
    region: "Jawa Timur",
    difficulty: "Tinggi",
    duration: "6-8 jam",
    popularity: 85,
    tags: ["wayang", "pertunjukan", "filosofi", "epik", "tradisional"],
    lastUpdated: "2024-01-08",
    detailedDescription:
      "Wayang Kulit adalah seni pertunjukan tradisional Indonesia yang menggunakan boneka kulit sebagai media bercerita. Di Jawa Timur, wayang kulit memiliki karakteristik dan gaya yang khas, dengan cerita-cerita epik yang sarat makna filosofis.",
    history:
      "Wayang Kulit telah ada sejak abad ke-10 dan berkembang pesat di era Kerajaan Majapahit. Seni ini menjadi media penyebaran agama dan nilai-nilai moral dalam masyarakat Jawa.",
    significance:
      "Wayang Kulit bukan hanya hiburan, tetapi juga media pendidikan, dakwah, dan pelestarian nilai-nilai luhur budaya Jawa. UNESCO telah mengakuinya sebagai Masterpiece of Oral and Intangible Heritage of Humanity.",
    elements: [
      { name: "Dalang", description: "Pemimpin pertunjukan yang mengendalikan semua aspek" },
      { name: "Wayang", description: "Boneka kulit dengan berbagai karakter" },
      { name: "Gamelan", description: "Musik pengiring yang menciptakan suasana" },
      { name: "Kelir", description: "Layar putih tempat bayangan wayang" },
    ],
    gallery: [
      "/pertunjukan-wayang-kulit-dengan-dalang.jpg",
      "/koleksi-wayang-kulit-berbagai-karakter.jpg",
      "/gamelan-pengiring-wayang-kulit.jpg",
    ],
    videos: [
      { title: "Pertunjukan Wayang Kulit Lengkap", duration: "120:00" },
      { title: "Filosofi dan Makna Wayang Kulit", duration: "25:15" },
    ],
    relatedItems: [1, 6, 8],
  },
  {
    id: 5,
    title: "Bahasa Jawa Timuran",
    subtitle: "Bahasa Daerah Khas",
    description:
      "Dialek bahasa Jawa yang khas digunakan di wilayah Jawa Timur dengan logat yang unik dan kosakata yang berbeda dari bahasa Jawa pada umumnya.",
    badge: "Bahasa",
    category: "bahasa",
    region: "Jawa Timur",
    difficulty: "Menengah",
    duration: "Berkelanjutan",
    popularity: 78,
    tags: ["bahasa", "dialek", "komunikasi", "budaya", "jawa timur"],
    lastUpdated: "2024-01-05",
    detailedDescription:
      "Bahasa Jawa Timuran adalah dialek bahasa Jawa yang digunakan di wilayah Jawa Timur. Dialek ini memiliki keunikan dalam logat, intonasi, dan beberapa kosakata yang berbeda dari bahasa Jawa standar.",
    history:
      "Bahasa Jawa Timuran berkembang seiring dengan sejarah dan budaya masyarakat Jawa Timur. Pengaruh dari berbagai kerajaan dan migrasi penduduk membentuk karakteristik unik dialek ini.",
    significance:
      "Bahasa Jawa Timuran merupakan identitas budaya masyarakat Jawa Timur dan menjadi alat komunikasi yang mengikat komunitas. Pelestariannya penting untuk menjaga keberagaman linguistik Indonesia.",
    elements: [
      { name: "Logat Khas", description: "Intonasi dan pelafalan yang berbeda" },
      { name: "Kosakata Unik", description: "Kata-kata yang hanya ada di Jawa Timur" },
      { name: "Tingkat Tutur", description: "Sistem kesopanan dalam berbahasa" },
      { name: "Ungkapan Tradisional", description: "Peribahasa dan ungkapan khas" },
    ],
    gallery: [
      "/peta-sebaran-bahasa-jawa-timuran.jpg",
      "/buku-kamus-bahasa-jawa-timuran.jpg",
      "/masyarakat-berbicara-bahasa-jawa-timuran.jpg",
    ],
    videos: [
      { title: "Pembelajaran Bahasa Jawa Timuran", duration: "30:00" },
      { title: "Keunikan Dialek Jawa Timur", duration: "15:45" },
    ],
    relatedItems: [3, 4, 1],
  },
  {
    id: 6,
    title: "Gamelan Jawa Timuran",
    subtitle: "Musik Tradisional Ensemble",
    description:
      "Ensemble musik tradisional dengan instrumen perunggu khas Jawa Timur yang harmonis. Memiliki karakteristik nada dan ritme yang berbeda dari gamelan daerah lain.",
    badge: "Musik",
    category: "musik",
    region: "Jawa Timur",
    difficulty: "Tinggi",
    duration: "2-3 jam",
    popularity: 82,
    tags: ["gamelan", "musik", "perunggu", "ensemble", "harmoni"],
    lastUpdated: "2024-01-14",
    detailedDescription:
      "Gamelan Jawa Timuran adalah ensemble musik tradisional yang terdiri dari berbagai instrumen perunggu. Gamelan ini memiliki karakteristik nada dan ritme yang khas, berbeda dari gamelan Jawa Tengah atau Yogyakarta.",
    history:
      "Gamelan Jawa Timuran berkembang sejak era Kerajaan Majapahit dan terus mengalami perkembangan hingga sekarang. Setiap daerah di Jawa Timur memiliki variasi dan keunikan tersendiri.",
    significance:
      "Gamelan Jawa Timuran tidak hanya sebagai musik pengiring, tetapi juga sebagai media spiritual dan sosial yang mengikat masyarakat. Musik ini mencerminkan harmoni dan keseimbangan dalam kehidupan.",
    elements: [
      { name: "Gong", description: "Instrumen utama yang memberikan dasar ritme" },
      { name: "Saron", description: "Instrumen melodi dengan bilah perunggu" },
      { name: "Kendang", description: "Instrumen perkusi yang mengatur tempo" },
      { name: "Suling", description: "Instrumen tiup yang memberikan melodi lembut" },
    ],
    gallery: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    videos: [
      { title: "Pertunjukan Gamelan Jawa Timuran", duration: "45:00" },
      { title: "Belajar Memainkan Gamelan", duration: "20:30" },
    ],
    relatedItems: [4, 1, 8],
  },
  {
    id: 7,
    title: "Rawon",
    subtitle: "Kuliner Sup Tradisional",
    description:
      "Sup daging sapi berwarna hitam khas Surabaya dengan rempah kluwek yang kaya rasa. Hidangan yang menjadi ikon kuliner Jawa Timur dengan cita rasa yang unik.",
    badge: "Kuliner",
    category: "makanan",
    region: "Surabaya",
    difficulty: "Menengah",
    duration: "2 jam",
    popularity: 96,
    tags: ["rawon", "sup", "kluwek", "surabaya", "daging sapi"],
    lastUpdated: "2024-01-16",
    detailedDescription:
      "Rawon adalah sup daging sapi berwarna hitam khas Surabaya yang menggunakan kluwek sebagai bumbu utama. Hidangan ini memiliki cita rasa yang khas dan menjadi salah satu ikon kuliner Jawa Timur yang paling terkenal.",
    history:
      "Rawon diperkirakan sudah ada sejak abad ke-16 dan berkembang di wilayah Surabaya. Hidangan ini menjadi populer karena cita rasanya yang unik dan kandungan gizinya yang tinggi.",
    significance:
      "Rawon bukan hanya makanan, tetapi juga bagian dari identitas kuliner Surabaya dan Jawa Timur. Hidangan ini mencerminkan kekayaan rempah-rempah dan kreativitas kuliner masyarakat setempat.",
    elements: [
      { name: "Kluwek", description: "Bumbu utama yang memberikan warna hitam dan rasa khas" },
      { name: "Daging Sapi", description: "Daging sapi yang dimasak hingga empuk" },
      { name: "Rempah-rempah", description: "Campuran rempah yang memberikan aroma harum" },
      { name: "Pelengkap", description: "Tauge, telur asin, kerupuk, dan sambal" },
    ],
    gallery: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    videos: [
      { title: "Cara Membuat Rawon Asli Surabaya", duration: "35:20" },
      { title: "Sejarah dan Filosofi Rawon", duration: "12:40" },
    ],
    relatedItems: [3, 5, 2],
  },
  {
    id: 8,
    title: "Tari Gandrung",
    subtitle: "Kesenian Tari Klasik",
    description:
      "Tarian tradisional Banyuwangi yang menggambarkan keanggunan wanita Jawa Timur. Tarian yang penuh dengan gerakan lemah gemulai dan makna filosofis yang dalam.",
    badge: "Kesenian",
    category: "tari",
    region: "Banyuwangi",
    difficulty: "Menengah",
    duration: "30 menit",
    popularity: 87,
    tags: ["gandrung", "tari", "banyuwangi", "keanggunan", "filosofis"],
    lastUpdated: "2024-01-11",
    detailedDescription:
      "Tari Gandrung adalah tarian tradisional yang berasal dari Banyuwangi, Jawa Timur. Tarian ini menggambarkan keanggunan dan kelembutan wanita Jawa Timur dengan gerakan yang lemah gemulai dan penuh makna.",
    history:
      "Tari Gandrung berkembang sejak abad ke-18 di wilayah Banyuwangi. Tarian ini awalnya merupakan tarian pergaulan yang kemudian berkembang menjadi seni pertunjukan yang lebih formal.",
    significance:
      "Tari Gandrung merupakan simbol keanggunan dan kelembutan wanita Jawa Timur. Tarian ini juga menjadi media ekspresi budaya dan identitas masyarakat Banyuwangi.",
    elements: [
      { name: "Gerakan Lemah Gemulai", description: "Gerakan yang menggambarkan keanggunan wanita" },
      { name: "Kostum Tradisional", description: "Pakaian adat yang indah dan bermakna" },
      { name: "Musik Pengiring", description: "Gamelan yang mengiringi tarian" },
      { name: "Ekspresi Wajah", description: "Mimik yang menggambarkan perasaan" },
    ],
    gallery: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    videos: [
      { title: "Pertunjukan Tari Gandrung Lengkap", duration: "25:15" },
      { title: "Belajar Gerakan Tari Gandrung", duration: "18:30" },
    ],
    relatedItems: [1, 6, 4],
  },
  {
    id: 9,
    title: "Kerajinan Bambu",
    subtitle: "Seni Kerajinan Alam",
    description:
      "Berbagai kerajinan dari bambu yang mencerminkan kreativitas masyarakat Jawa Timur. Mulai dari alat rumah tangga hingga karya seni yang bernilai tinggi.",
    badge: "Kerajinan",
    category: "kerajinan",
    region: "Jawa Timur",
    difficulty: "Menengah",
    duration: "1-2 hari",
    popularity: 75,
    tags: ["bambu", "kerajinan", "alam", "kreativitas", "ramah lingkungan"],
    lastUpdated: "2024-01-09",
    detailedDescription:
      "Kerajinan Bambu adalah seni kerajinan tradisional yang memanfaatkan bambu sebagai bahan utama. Di Jawa Timur, kerajinan bambu berkembang pesat dan menghasilkan berbagai produk yang fungsional dan artistik.",
    history:
      "Kerajinan bambu telah ada sejak zaman nenek moyang dan terus berkembang hingga sekarang. Masyarakat Jawa Timur memanfaatkan kelimpahan bambu di daerah mereka untuk membuat berbagai kerajinan.",
    significance:
      "Kerajinan bambu tidak hanya bernilai ekonomi, tetapi juga ramah lingkungan dan berkelanjutan. Seni ini mencerminkan kearifan lokal dalam memanfaatkan sumber daya alam.",
    elements: [
      { name: "Anyaman", description: "Teknik menganyam bambu menjadi berbagai bentuk" },
      { name: "Ukiran", description: "Seni mengukir bambu dengan motif tradisional" },
      { name: "Konstruksi", description: "Pembuatan struktur dari bambu" },
      { name: "Finishing", description: "Proses akhir untuk mempercantik hasil kerajinan" },
    ],
    gallery: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    videos: [
      { title: "Proses Pembuatan Kerajinan Bambu", duration: "40:20" },
      { title: "Teknik Anyaman Bambu Tradisional", duration: "22:15" },
    ],
    relatedItems: [2, 6, 5],
  },
]

const iconMap = {
  tari: Music,
  makanan: Utensils,
  batik: Palette,
  musik: Music,
  bahasa: Languages,
  kerajinan: Palette,
  wayang: Globe,
}

export default function CulturalDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [item, setItem] = useState(null)
  const [activeTab, setActiveTab] = useState("overview")
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  useEffect(() => {
    const itemId = Number.parseInt(params.id as string)
    const foundItem = culturalItems.find((item) => item.id === itemId)
    setItem(foundItem)
  }, [params.id])

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Culture not found</h2>
          <Button onClick={() => router.push("/")} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    )
  }

  const IconComponent = iconMap[item.category] || Globe
  const relatedItems = culturalItems.filter((relatedItem) => item.relatedItems?.includes(relatedItem.id))

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button
              variant="ghost"
              onClick={() => router.push("/")}
              className="flex items-center gap-2 hover:bg-primary/10"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsBookmarked(!isBookmarked)}
                className="hover:bg-primary/10"
              >
                <Heart className={`w-4 h-4 ${isBookmarked ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
              <Button variant="ghost" size="sm" className="hover:bg-primary/10">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-primary/5 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center">
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <Badge variant="secondary" className="text-sm">
                  {item.badge}
                </Badge>
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">{item.title}</h1>

              <p className="text-xl text-muted-foreground mb-6 text-pretty">{item.subtitle}</p>

              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  {item.region}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  {item.duration}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  {item.popularity}% Popularity
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  {item.lastUpdated}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {item.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={item.gallery?.[activeImageIndex] || `/placeholder.svg?height=400&width=600&query=${item.title}`}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                {/* Image Navigation */}
                {item.gallery && item.gallery.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {item.gallery.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === activeImageIndex ? "bg-white" : "bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-wrap gap-2 mb-8 border-b border-border">
          {[
            { id: "overview", label: "Overview", icon: BookOpen },
            { id: "history", label: "History", icon: Clock },
            { id: "elements", label: "Elements", icon: Users },
            { id: "gallery", label: "Gallery", icon: Camera },
            { id: "videos", label: "Videos", icon: Play },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-t-lg transition-all ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "overview" && (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Description</h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">{item.description}</p>
                    <p className="text-muted-foreground leading-relaxed">{item.detailedDescription}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Meaning and Significance</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.significance}</p>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Detailed Information</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Category</span>
                        <Badge variant="secondary">{item.badge}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Region</span>
                        <span className="font-medium">{item.region}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Difficulty</span>
                        <span className="font-medium">{item.difficulty}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Duration</span>
                        <span className="font-medium">{item.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Popularity</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{item.popularity}%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                      <Button className="w-full bg-transparent" variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Download Guide
                      </Button>
                      <Button className="w-full bg-transparent" variant="outline">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Learn More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "history" && (
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">History and Origin</h3>
                <p className="text-muted-foreground leading-relaxed">{item.history}</p>
              </CardContent>
            </Card>
          )}

          {activeTab === "elements" && (
            <div className="grid md:grid-cols-2 gap-6">
              {item.elements?.map((element, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <h4 className="text-lg font-semibold mb-2">{element.name}</h4>
                    <p className="text-muted-foreground">{element.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {activeTab === "gallery" && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {item.gallery?.map((image, index) => (
                <div key={index} className="aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${item.title} - Image ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          )}

          {activeTab === "videos" && (
            <div className="grid md:grid-cols-2 gap-6">
              {item.videos?.map((video, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center">
                      <Play className="w-12 h-12 text-muted-foreground" />
                    </div>
                    <h4 className="font-semibold mb-2">{video.title}</h4>
                    <p className="text-sm text-muted-foreground">Durasi: {video.duration}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Related Items */}
      {relatedItems.length > 0 && (
        <div className="bg-muted/30 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-2xl font-bold mb-8">Budaya Terkait</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedItems.map((relatedItem) => {
                const RelatedIcon = iconMap[relatedItem.category] || Globe
                return (
                  <Card key={relatedItem.id} className="group cursor-pointer hover:shadow-lg transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-lg flex items-center justify-center">
                          <RelatedIcon className="w-5 h-5 text-white" />
                        </div>
                        <Badge variant="secondary">{relatedItem.badge}</Badge>
                      </div>
                      <h4 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                        {relatedItem.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{relatedItem.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          {relatedItem.region}
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
