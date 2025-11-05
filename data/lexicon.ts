export type LexiconEntry = {
  term: string
  termCode: string
  definition: string
  etimologi?: string
  culturalMeaning?: string
  variants?: string[]
  reference?: string
  note?: string
  availability?: string
  imageId?: string
  transliterasi?: string
  audioFile?: string
}

// Fungsi helper untuk generate term code
function generateTermCode(regionKey: string, term: string): string {
  const regionCode = regionKey.substring(0, 3).toUpperCase()
  const termCode = term.substring(0, 3).toUpperCase()
  const hash = Math.abs(term.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)) % 1000
  return `${regionCode}-${termCode}-${hash.toString().padStart(3, "0")}`
}

export const LEXICON: Record<string, LexiconEntry[]> = {
  arekan: [
    {
      term: "Arek",
      termCode: "arekan",
      definition: "A designation for the speech style and urban coastal identity of Surabaya and its surroundings.",
      etimologi: "Derived from 'arek' (child/young person) in the Arek Javanese dialect.",
      culturalMeaning: "Represents coastal urban egalitarianism and the 'arek Suroboyo' solidarity.",
      variants: ["arek", "arek-an"],
      reference: "Young person/child with the Arek speech style.",
      note: "Frequently appears in everyday expressions and regional songs.",
      availability: "Extensive popular documentation; academic research is available.",
      transliterasi: "Arèk",
      audioFile: "/audio/arekan/arek.mp3",
    },
    {
      term: "Ludruk",
      termCode: generateTermCode("arekan", "Ludruk"),
      definition: "A folk theatre from Surabaya characterized by humorous dialogue and social critique.",
      culturalMeaning: "A space for socio-political expression of the coastal urban community.",
      variants: ["ludrukan"],
      availability: "Performance archives and active community troupes exist.",
      transliterasi: "Ludruk",
      audioFile: "/audio/arekan/ludruk.mp3",
    },
  ],
  madura: [
    {
      term: "Karapan Sapi",
      termCode: generateTermCode("madura", "Karapan Sapi"),
      definition: "A traditional bull racing competition that has become a cultural symbol of Madura.",
      etimologi: "Possibly from 'kerapan' (chase/race) + 'sapi' (bull).",
      culturalMeaning: "A symbol of social, economic, and communal prestige.",
      variants: ["kerapan sapi"],
      reference: "Traditional bull racing.",
      availability: "Plentiful documentaries and media coverage.",
      transliterasi: "Karapan Sapi",
      audioFile: "/audio/madura/karapan-sapi.mp3",
    },
    {
      term: "Pesantren",
      termCode: generateTermCode("madura", "Pesantren"),
      definition: "An Islamic boarding school closely integrated with Madurese community life.",
      transliterasi: "Pesantren",
      audioFile: "/audio/madura/pesantren.mp3",
    },
  ],
  "madura-base": [
    {
      term: "Anyaman",
      termCode: generateTermCode("madura-base", "Anyaman"),
      definition: "Weaving crafts using natural fibers for everyday needs.",
      transliterasi: "Anyaman",
      audioFile: "/audio/madura-base/anyaman.mp3",
    },
  ],
  "madura-bawean": [
    {
      term: "Bawean",
      termCode: generateTermCode("madura-bawean", "Bawean"),
      definition: "An island north of Madura with maritime traditions and a local language.",
      transliterasi: "Bawean",
      audioFile: "/audio/madura-bawean/bawean.mp3",
    },
  ],
  "madura-kangean": [
    {
      term: "Kangean",
      termCode: generateTermCode("madura-kangean", "Kangean"),
      definition: "A northeastern island cluster with a coastal identity and fishing culture.",
      transliterasi: "Kangean",
      audioFile: "/audio/madura-kangean/kangean.mp3",
    },
  ],
  mataraman: [
    {
      term: "Tata Krama",
      termCode: generateTermCode("mataraman", "Tata Krama"),
      definition: "Etiquette and manners that are prominent in Mataraman culture.",
      transliterasi: "Tata Krama",
      audioFile: "/audio/mataraman/tata-krama.mp3",
    },
    {
      term: "Gamelan",
      termCode: generateTermCode("mataraman", "Gamelan"),
      definition: "Traditional Javanese orchestra ensemble.",
      transliterasi: "Gamelan",
      audioFile: "/audio/mataraman/gamelan.mp3",
    },
  ],
  osing: [
    {
      term: "Using/Osing",
      termCode: generateTermCode("osing", "Using/Osing"),
      definition: "The local Banyuwangi ethnic group and language with distinctive traditions.",
      transliterasi: "Using/Osing",
      audioFile: "/audio/osing/using-osing.mp3",
    },
    {
      term: "Gandrung",
      termCode: generateTermCode("osing", "Gandrung"),
      definition: "An iconic Banyuwangi dance performed as an expression of gratitude and joy.",
      transliterasi: "Gandrung",
      audioFile: "/audio/osing/gandrung.mp3",
    },
  ],
  panaragan: [
    {
      term: "Seni Rakyat",
      termCode: generateTermCode("panaragan", "Seni Rakyat"),
      definition: "Community arts that emerge from Panaragan's local traditions.",
      transliterasi: "Seni Rakyat",
      audioFile: "/audio/panaragan/seni-rakyat.mp3",
    },
  ],
  pandalungan: [
    {
      term: "Pandalungan",
      termCode: generateTermCode("pandalungan", "Pandalungan"),
      definition: "A mixed Javanese—Madura identity reflected in dialect and customs.",
      transliterasi: "Pandalungan",
      audioFile: "/audio/pandalungan/pandalungan.mp3",
    },
  ],
  samin: [
    {
      term: "Samin",
      termCode: generateTermCode("samin", "Samin"),
      definition:
        "A community known for an ethic of honesty and simple agrarian life, influenced by Samin Surosentiko teachings.",
      transliterasi: "Samin",
      audioFile: "/audio/samin/samin.mp3",
    },
  ],
  tengger: [
    {
      imageId: "1gCGm9DZrfZOvueXfiQyqI1DO1gTweC3F",
      term: "Pujan",
      termCode: generateTermCode("Tengger", "Pujan"),
      definition:
        "Pujan is a worship ritual of the Tengger community. The name is rooted in the Sanskrit and Old Javanese word 'puja' (meaning 'respect, worship, and prayer'). This ritual is part of the village calendar and is held in a specific month every year. In the past, Pujan took the form of a grand feast at the village priest's house. Today, Pujan is held as a brief prayer and symbolic banquet attended by priests and village officials, with food contributed by the community. The series of Pujan concludes with the distribution of dishes to village leaders and small offerings at sacred sites as a manifestation of the community's spiritual involvement.",
      etimologi:
        "puja (pujO) : (S) kn. pangaji-aji, panêmbah, donga di-[x]: 1 dipêpundhi, dikurmati bangêt (tmr. marang dewa, ent. tmr. kang kinasihan) 2 br. dianakake sarana cipta (sêmadi) dipujakake ak: didongakake, dipujèkake pujan br: dadine (anane) sarana dipuja pêpujan br: 1 sêsêmbahan, kang diaji-aji (dewa) 2 kang kinasih bangêt. Sumber: Bausastra Jawa, Poerwadarminta, 1939, #75.",
      variants: [
        "In classical and krama Javanese (honorifics), puja denotes reverence, prayer, or worship, with related morphological forms such as pujan (the means or outcome of worship) and pêpujan (that which is worshipped or glorified). Among Tengger people, pujan has evolved into a distinctive collective ritual tied to the cycle of time and the village’s social structure, a practice unique to this community and not found elsewhere in Java. While related to selametan or kenduren, pujan differs in its calendar, the role of the village shaman, and the more structured nature of its offerings. In Hindu and Buddhist contexts, puja continues to signify prayer, though without the socio-communal dimension characteristic of Tengger. Over time, pujan has shifted from a large, open-air feast to a more limited, symbolic form of prayer, while still requiring collective contributions. These transformations reflect adaptation to modernity, preserving both its core meaning of divine reverence and the maintenance of sustainable village harmony."
      ],
      
      reference: `“Pujan, From the Sanskrit and Old Javanese term for "worship," Tengger pujan are celebrated in the fourth, eighth, ninth, and twelfth months of the Tengger calendar year; several villages celebrate a fifth pujan in the seventh month, in addition. Once marked by feasting at the village priest's house, pujan today involve a brief invocation and meal at the priest's house. Supported by food contributions from all households in the village, attendance is restricted to village officials and the priest” (Hefner, 1989:112-113).

      "The pujan illustrates this pattern clearly, and also shows to what degree ordinary villagers are drawn into the ceremony... The actual ritual service—a more or less standard invocation of the gods—lasts only about five minutes. The remainder of the evening is devoted to the meal... The pujan circuit is completed the following morning. Trays of cooked food (ater-ater) are sent from the priest’s house to village officials, and small earth offerings are set out by the roadside, cemetery, bridge, and other locations around the village." (Hefner, 1985: 114).

      "Manusia harus mengadakan pujan pada bulan purnama, tilem, galungan, panawangan, kasada, dan kapitu. Jika pujan dilaksanakan, Durga-Kala tidak akan mengganggu manusia. Ketiga Dewa tersebut terus-menerus mengajari manusia cara memuja dan memberikan sesaji kepada Durga-Kala sebagai manifestasi Sang Hyang Widhi." (Sukmawan, 2018:123).`,
      note: "Frequently appears in everyday expressions and regional songs.",
      availability: `https://www.sastra.org/leksikon`,
      transliterasi: "Pujan",
      audioFile: "/audio/tengger/pujan.mp3",
    },
    {
      term: "Tengger",
      termCode: generateTermCode("tengger", "Tengger"),
      definition: "A mountain community with distinctive traditions and beliefs.",
      transliterasi: "Tengger",
      audioFile: "/audio/tengger/tengger.mp3",
    },
  ],
}

// Helper function to get entry with termCode
export function getLexiconEntryByTermCode(termCode: string): LexiconEntry | null {
  for (const entries of Object.values(LEXICON)) {
    const found = entries.find((e) => e.termCode === termCode)
    if (found) return found
  }
  return null
}

// Helper function to get all entries for a region
export function getLexiconByRegion(regionKey: string): LexiconEntry[] {
  return LEXICON[regionKey] || []
}

// Helper function to search entries
export function searchLexicon(query: string): LexiconEntry[] {
  const results: LexiconEntry[] = []
  const lowerQuery = query.toLowerCase()

  for (const entries of Object.values(LEXICON)) {
    for (const entry of entries) {
      if (
        entry.term.toLowerCase().includes(lowerQuery) ||
        entry.definition.toLowerCase().includes(lowerQuery) ||
        entry.termCode.toLowerCase().includes(lowerQuery)
      ) {
        results.push(entry)
      }
    }
  }

  return results
}
