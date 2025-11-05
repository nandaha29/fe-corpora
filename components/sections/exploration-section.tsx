// "use client"

// import { cn } from "@/lib/utils"
// import { Compass, Target } from "lucide-react"
// import { SectionHeader } from "@/components/layout/section-header"
// import { SearchBar } from "@/components/cultural/search-bar"
// import { CategoryFilter } from "@/components/cultural/category-filter"
// import { ViewModeToggle } from "@/components/cultural/view-mode-toggle"
// import { CulturalItemCard } from "@/components/cultural/cultural-item-card"
// import { ParallaxBackground } from "@/components/common/parallax-background"
// import { useCulturalItems } from "@/hooks/use-cultural-items"
// import { useBookmarks } from "@/hooks/use-bookmarks"
// import { useViewMode } from "@/hooks/use-view-mode"
// import { useNavigation } from "@/hooks/use-navigation"
// import { categories } from "@/data/categories"
// import { NoResultsState } from "@/components/cultural/no-results-state"

// export function ExplorationSection() {
//   const { searchQuery, selectedCategory, items, loading, handleSearch, handleCategoryChange, hasFilters, itemCount } =
//     useCulturalItems()

//   const { isBookmarked, toggleBookmark } = useBookmarks()
//   const { viewMode, setViewMode } = useViewMode()
//   const { handleLearnMore } = useNavigation()

//   return (
//     <section id="eksplorasi" className="py-20 bg-muted/30 relative scroll-mt-16" role="main">
//       {/* Background decorations */}
//       <ParallaxBackground speed={0.2} className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-10 left-10 w-32 h-32 opacity-[0.03] animate-float">
//           <svg viewBox="0 0 100 100" className="w-full h-full text-primary">
//             <path d="M50 5 L60 35 L90 35 L68 57 L78 87 L50 70 L22 87 L32 57 L10 35 L40 35 Z" fill="currentColor" />
//           </svg>
//         </div>
//         <div
//           className="absolute bottom-10 right-10 w-28 h-28 opacity-[0.02] rotate-45 animate-float"
//           style={{ animationDelay: "2s" }}
//         >
//           <svg viewBox="0 0 100 100" className="w-full h-full text-amber-600">
//             <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="6" />
//             <circle cx="50" cy="50" r="15" fill="currentColor" />
//           </svg>
//         </div>
//       </ParallaxBackground>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//         {/* Section Header */}
//         <SectionHeader
//           badge={{
//             text: "Eksplorasi Budaya",
//             icon: Compass,
//             variant: "outline",
//           }}
//           secondaryBadge={{
//             text: "Mudah Ditemukan",
//             icon: Target,
//             variant: "outline",
//             className: "bg-emerald-100/50 text-emerald-700 border-emerald-200 hover-lift",
//           }}
//           title="Eksplorasi"
//           subtitle="Budaya Jawa Timur"
//           description="Jelajahi kekayaan budaya Jawa Timur melalui berbagai aspek tradisi yang masih lestari hingga saat ini. Temukan kesenian, kuliner, bahasa, dan warisan budaya lainnya dengan mudah."
//         />

//         {/* Search and Filter Interface */}
//         <div className="max-w-4xl mx-auto mb-12 space-y-6">
//           {/* Search Bar */}
//           <SearchBar
//             value={searchQuery}
//             onChange={handleSearch}
//             placeholder="Cari kesenian, makanan, bahasa, musik, dan aspek budaya lainnya..."
//           />

//           {/* Category Filters */}
//           <CategoryFilter
//             categories={categories}
//             selectedCategory={selectedCategory}
//             onCategoryChange={handleCategoryChange}
//           />

//           {/* View Mode and Results Info */}
//           <div className="flex items-center justify-between">
//             <ViewModeToggle viewMode={viewMode} onViewModeChange={setViewMode} />

//             {/* Search results info */}
//             {hasFilters && (
//               <div className="text-sm text-muted-foreground">
//                 {itemCount > 0
//                   ? `Ditemukan ${itemCount} hasil${searchQuery ? ` untuk "${searchQuery}"` : ""}${
//                       selectedCategory !== "semua"
//                         ? ` dalam kategori ${categories.find((c: { value: string }) => c.value === selectedCategory)?.label}`
//                         : ""
//                     }`
//                   : `Tidak ada hasil${searchQuery ? ` untuk "${searchQuery}"` : ""}${
//                       selectedCategory !== "semua"
//                         ? ` dalam kategori ${categories.find((c: { value: string }) => c.value === selectedCategory)?.label}`
//                         : ""
//                     }`}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Cultural Items Grid */}
//         {loading ? (
//           <div className="flex items-center justify-center py-12">
//             <div className="text-center">
//               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
//               <p className="text-muted-foreground">Loading cultural items...</p>
//             </div>
//           </div>
//         ) : items.length > 0 ? (
//           <div
//             className={cn(
//               "grid gap-6 transition-all duration-500",
//               viewMode === "grid" ? "md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1 max-w-4xl mx-auto",
//             )}
//           >
//             {items.map((item, index) => (
//               <CulturalItemCard
//                 key={item.id}
//                 item={item}
//                 viewMode={viewMode}
//                 isBookmarked={isBookmarked(item.id)}
//                 onBookmarkToggle={toggleBookmark}
//                 onLearnMore={handleLearnMore}
//                 animationDelay={index * 100}
//               />
//             ))}
//           </div>
//         ) : (
//           <NoResultsState
//             searchQuery={searchQuery}
//             selectedCategory={selectedCategory}
//             onClearSearch={() => handleSearch("")}
//             onClearCategory={() => handleCategoryChange("semua")}
//             onSuggestionClick={handleSearch}
//           />
//         )}
//       </div>
//     </section>
//   )
// }
