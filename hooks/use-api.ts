import useSWR from 'swr';
import { API_BASE_URL } from '@/lib/config';

// Fetcher function untuk SWR
const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    const error = new Error('Failed to fetch');
    (error as any).status = res.status;
    throw error;
  }
  const json = await res.json();
  if (!json.success) {
    const error = new Error(json.message || 'Failed to fetch');
    (error as any).status = res.status;
    throw error;
  }
  return json.data;
};

// Landing data hook
export function useLandingData() {
  return useSWR(`${API_BASE_URL}landing`, fetcher);
}

// Subcultures hook dengan query parameters
export function useSubcultures(query?: string, page?: number, limit?: number) {
  const params = new URLSearchParams();
  if (query?.trim()) params.append('search', query.trim());
  if (page) params.append('page', page.toString());
  if (limit) params.append('limit', limit.toString());
  
  const key = `${API_BASE_URL}subcultures${params.toString() ? `?${params}` : ''}`;
  
  // Custom fetcher untuk handle response dengan pagination
  const customFetcher = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) {
      const error = new Error('Failed to fetch');
      (error as any).status = res.status;
      throw error;
    }
    const json = await res.json();
    if (!json.success) {
      const error = new Error(json.message || 'Failed to fetch');
      (error as any).status = res.status;
      throw error;
    }
    // Return both data and pagination if available
    return {
      data: json.data || [],
      pagination: json.pagination || null,
    };
  };
  
  return useSWR(key, customFetcher);
}

// All lexicons hook dengan filtering dan search
export function useLexicons(
  regionFilter?: string,
  searchQuery?: string,
  page?: number,
  limit?: number
) {
  const params = new URLSearchParams();
  if (regionFilter && regionFilter !== 'all') {
    params.append('regionFilter', regionFilter);
  }
  if (searchQuery?.trim()) {
    params.append('searchQuery', searchQuery.trim());
  }
  if (page) {
    params.append('page', page.toString());
  }
  if (limit) {
    params.append('limit', limit.toString());
  }
  
  const key = `${API_BASE_URL}lexicons${params.toString() ? `?${params}` : ''}`;
  
  // Custom fetcher untuk handle response dengan pagination
  const customFetcher = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) {
      const error = new Error('Failed to fetch');
      (error as any).status = res.status;
      throw error;
    }
    const json = await res.json();
    if (!json.success) {
      const error = new Error(json.message || 'Failed to fetch');
      (error as any).status = res.status;
      throw error;
    }
    // Return both data and pagination if available
    // API returns pagination info at root level (total, page, limit, totalPages)
    // Check if pagination exists in nested object first, then check root level
    const pagination = json.pagination || (json.total !== undefined ? {
      totalItems: json.total,
      currentPage: json.page,
      limit: json.limit,
      totalPages: json.totalPages,
    } : null);
    
    // Debug: log pagination info
    if (pagination) {
      console.log('📄 API Pagination:', {
        totalItems: pagination.totalItems,
        currentPage: pagination.currentPage,
        limit: pagination.limit,
        totalPages: pagination.totalPages,
        rawResponse: { total: json.total, page: json.page, limit: json.limit, totalPages: json.totalPages }
      });
    }
    
    return {
      data: json.data || [],
      pagination: pagination,
    };
  };
  
  return useSWR(key, customFetcher);
}

// Lexicon detail hook - accepts term/slug/ID as identifier
// Endpoint: GET /api/v1/public/lexicons/:identifier
export function useLexiconDetail(identifier: string | number | null | undefined) {
  return useSWR(
    identifier ? `${API_BASE_URL}lexicons/${identifier}` : null,
    fetcher
  );
}

// Alias for backward compatibility - use useLexiconDetail instead
// Lexicon detail by ID (for translations)
export function useLexiconDetailById(lexiconId: number | string | null | undefined) {
  return useLexiconDetail(lexiconId);
}

// Region/Subculture detail hook
export function useRegionDetail(regionId: string | null | undefined, type: 'subculture' | 'region' = 'subculture') {
  const endpoint = type === 'subculture' 
    ? `${API_BASE_URL}subcultures/${regionId}`
    : `${API_BASE_URL}regions/${regionId}`;
  
  return useSWR(regionId ? endpoint : null, fetcher);
}

// References hook
export function useReferences() {
  return useSWR(`${API_BASE_URL}references`, fetcher);
}

// Domain search hook - Mencari lexicons dalam domain tertentu
export function useDomainSearch(
  domainId: number | string | null | undefined,
  query?: string,
  page?: number,
  limit?: number
) {
  const params = new URLSearchParams();
  if (query?.trim()) {
    params.append('query', query.trim());
  }
  if (page) {
    params.append('page', page.toString());
  }
  if (limit) {
    params.append('limit', limit.toString());
  }
  
  const key = domainId 
    ? `${API_BASE_URL}domains/${domainId}/search${params.toString() ? `?${params}` : ''}`
    : null;
  
  // Custom fetcher untuk handle response dengan pagination
  const customFetcher = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) {
      const error = new Error('Failed to fetch');
      (error as any).status = res.status;
      throw error;
    }
    const json = await res.json();
    if (!json.success) {
      const error = new Error(json.message || 'Failed to fetch');
      (error as any).status = res.status;
      throw error;
    }
    // Return both data and pagination if available
    // API returns pagination info at root level (total, page, limit, totalPages)
    const pagination = json.pagination || (json.total !== undefined ? {
      totalItems: json.total,
      currentPage: json.page,
      limit: json.limit,
      totalPages: json.totalPages,
    } : null);
    
    return {
      data: json.data || [],
      pagination: pagination,
    };
  };
  
  return useSWR(key, customFetcher);
}

// Helper untuk fetch multiple lexicon details (for translations)
export function useMultipleLexiconDetails(ids: (number | string)[]) {
  // SWR tidak support multiple keys langsung, jadi kita gunakan Promise.all
  // Tapi untuk optimasi, kita bisa cache individual calls
  const keys = ids.map(id => `${API_BASE_URL}lexicons/${id}`);
  
  // Note: SWR tidak punya built-in untuk multiple keys
  // Kita akan handle ini di component level dengan Promise.all
  // atau gunakan useSWR untuk setiap ID secara individual
  
  return null; // Placeholder - akan di-handle di component
}

