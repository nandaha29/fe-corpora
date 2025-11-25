// Backend API URL - Public endpoints
export const API_BASE_URL =
  (process.env.NEXT_PUBLIC_API_URL || "https://be-corpora.vercel.app/api/v1") + "/public/";
  // (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1") + "/public/";


// Backend API URL - Search endpoints
export const API_SEARCH_URL =
  process.env.NEXT_PUBLIC_API_SEARCH_URL || "https://be-corpora.vercel.app/api/v1/search/";
  // process.env.NEXT_PUBLIC_API_SEARCH_URL || "http://localhost:8000/api/v1/search/";
