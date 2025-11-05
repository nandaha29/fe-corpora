// // data/regions-complete.ts
// export interface RegionProfile {
//   id: string
//   displayName: string
//   description: string
//   color: string
//   demographics: {
//     population: string
//     area: string
//     density: string
//     languages: string[]
//   }
//   identity: string
//   history: string
//   significance: string
//   highlights: string[]
//   coordinates: { x: number; y: number }
//   culturalElements: string[]
//   rating?: number
//   visitors?: string
//   video: {
//     youtubeId: string
//     title: string
//     description: string
//     duration: string
//     tags: string[]
//   }
//   model3d: {
//     sketchfabId: string
//     title: string
//     description: string
//     artifactType: string
//     tags: string[]
//   }
//   culturalItems: Array<{
//     id: string
//     title: string
//     category: "Tradition" | "Artifact" | "Event"
//     description: string
//     image?: string
//     tags: string[]
//     duration?: string
//     popularity?: number
//   }>
// }

// export const REGIONS: Record<string, RegionProfile> = {
//   arekan: {
//     id: "arekan",
//     displayName: "Arekan",
//     description: "Urban coastal subculture with egalitarian and expressive Arek traditions.",
//     color: "#2563eb",
//     demographics: {
//       population: "± 5.1M (fictional)",
//       area: "6,200 km²",
//       density: "825/km²",
//       languages: ["Jawa Arek", "Madura", "Indonesia"],
//     },
//     identity: "Known for coastal urban culture with strong theatrical and folk arts traditions.",
//     history: "Rooted in cosmopolitan port city culture, Arekan grew with strong narrative arts and folk theater.",
//     significance: "A cultural and social expression hub for coastal urban communities.",
//     highlights: ["Ludruk dan Remo", "Kuliner pesisir (rujak cingur)", "Ekspresi urban egaliter"],
//     coordinates: { x: 65, y: 45 },
//     culturalElements: ["Dialek Arek", "Remo", "Ludruk", "Rujak Cingur"],
//     rating: 4.7,
//     video: {
//       youtubeId: "dQw4w9WgXcQ",
//       title: "Arekan Culture: Urban Heritage & Traditions",
//       description: "Explore the vibrant urban culture of Arekan...",
//       duration: "12:45",
//       tags: ["Ludruk", "Remo Dance", "Urban Culture"],
//     },
//     model3d: {
//       sketchfabId: "3c5c5c5c5c5c5c5c",
//       title: "Arekan Traditional Mask & Costume",
//       description: "Interactive 3D model showcasing traditional Arekan theatrical masks...",
//       artifactType: "Theatrical Mask & Costume",
//       tags: ["Mask", "Costume", "Theater"],
//     },
//     culturalItems: [
//       {
//         id: "tari-remo",
//         title: "Remo Dance",
//         category: "Tradition",
//         description: "A dance symbolizing bravery and pride in Surabaya.",
//         tags: ["tradition", "dance", "surabaya"],
//         duration: "45 minutes",
//         popularity: 4.8,
//       },
//     ],
//   },
//   // ... (lengkapi untuk semua region)
// }

// // Helper functions
// export function getRegionProfile(id: string): RegionProfile | undefined {
//   return REGIONS[id]
// }

// export function getAllRegions(): RegionProfile[] {
//   return Object.values(REGIONS)
// }

// export function getRegionsByCoordinates(): Array<{region: RegionProfile, coords: {x: number, y: number}}> {
//   return Object.values(REGIONS).map(r => ({
//     region: r,
//     coords: r.coordinates
//   }))
// }
