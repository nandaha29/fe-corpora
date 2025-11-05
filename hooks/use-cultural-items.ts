// "use client"

// import { useState, useEffect } from "react"
// import { type CulturalItem } from "@/data/cultural-items"

// export function useCulturalItems() {
//   const [searchQuery, setSearchQuery] = useState("")
//   const [selectedCategory, setSelectedCategory] = useState("semua")
//   const [items, setItems] = useState<CulturalItem[]>([])
//   const [loading, setLoading] = useState(false)
//   const [pagination, setPagination] = useState<{
//     currentPage: number;
//     totalPages: number;
//     totalItems: number;
//     hasNext: boolean;
//     hasPrev: boolean;
//   } | null>(null)

//   // Fetch cultural items from backend
//   useEffect(() => {
//     const fetchCulturalItems = async () => {
//       setLoading(true);

//       try {
//         const params = new URLSearchParams();
//         if (searchQuery.trim()) {
//           params.append('search', searchQuery.trim());
//         }
//         if (selectedCategory !== "semua") {
//           params.append('category', selectedCategory);
//         }

//         const response = await fetch(`https://be-corpora.vercel.app/api/v1/public/cultural-items?${params.toString()}`);

//         if (!response.ok) {
//           throw new Error(`HTTP ${response.status}: ${response.statusText}`);
//         }

//         const result = await response.json();

//         if (result.success && result.data) {
//           setItems(result.data.items || []);
//           setPagination(result.data.pagination);
//         } else {
//           setItems([]);
//           setPagination(null);
//         }
//       } catch (error) {
//         console.error('Cultural items fetch error:', error);
//         setItems([]);
//         setPagination(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCulturalItems();
//   }, [searchQuery, selectedCategory]);

//   const handleSearch = (query: string) => {
//     setSearchQuery(query)
//   }

//   const handleCategoryChange = (category: string) => {
//     setSelectedCategory(category)
//   }

//   const clearFilters = () => {
//     setSearchQuery("")
//     setSelectedCategory("semua")
//   }

//   return {
//     // State
//     searchQuery,
//     selectedCategory,
//     items,
//     loading,
//     pagination,

//     // Actions
//     handleSearch,
//     handleCategoryChange,
//     clearFilters,

//     // Computed
//     hasFilters: searchQuery.trim() !== "" || selectedCategory !== "semua",
//     itemCount: pagination?.totalItems || 0,
//     displayItems: items, // For backward compatibility
//   }
// }
