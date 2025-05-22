import type { SWRConfiguration } from 'swr';
import type { IPropertyItem } from 'src/types/property';

import useSWR from 'swr';
import { useMemo } from 'react';

// Importar os dados mock
import { _properties } from 'src/_mock/_property';

// Simular delay de API
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock fetcher que simula uma API
const mockFetcher = async (url: string | [string, any]): Promise<any> => {
  await delay(500); // Simula delay da API

  if (typeof url === 'string') {
    // Lista de propriedades
    if (url.includes('/api/properties') && !url.includes('details') && !url.includes('search')) {
      return { properties: _properties };
    }

    // Estatísticas
    if (url.includes('stats')) {
      return {
        totalProperties: _properties.length,
        availableProperties: _properties.filter(p => p.status === 'Em andamento').length,
        soldProperties: _properties.filter(p => p.status === 'Vendido').length,
        rentedProperties: _properties.filter(p => p.status === 'Alugado').length,
        averagePrice: _properties.reduce((acc, p) => acc + p.value, 0) / _properties.length,
        priceRange: {
          min: Math.min(..._properties.map(p => p.value)),
          max: Math.max(..._properties.map(p => p.value))
        }
      };
    }

    // Filtros
    if (url.includes('filters')) {
      return {
        types: [...new Set(_properties.map(p => p.type))],
        locations: [...new Set(_properties.map(p => p.city))],
        priceRanges: [
          { min: 0, max: 500000, label: 'Até R$ 500.000' },
          { min: 500000, max: 1000000, label: 'R$ 500.000 - R$ 1.000.000' },
          { min: 1000000, max: 2000000, label: 'R$ 1.000.000 - R$ 2.000.000' },
          { min: 2000000, max: 999999999, label: 'Acima de R$ 2.000.000' }
        ],
        amenities: ['Piscina', 'Academia', 'Churrasqueira', 'Playground', 'Salão de Festas']
      };
    }
  }

  // Array com URL e params [url, {params}]
  if (Array.isArray(url)) {
    const [baseUrl, config] = url;

    // Detalhes de uma propriedade específica
    if (baseUrl.includes('details') && config?.params?.propertyId) {
      const property = _properties.find(p => p.id === config.params.propertyId);
      if (!property) {
        throw new Error('Property not found');
      }
      return { property };
    }

    // Busca por query
    if (baseUrl.includes('search') && config?.params?.query) {
      const query = config.params.query.toLowerCase();
      const results = _properties.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.city.toLowerCase().includes(query) ||
        p.type.toLowerCase().includes(query) ||
        p.address.toLowerCase().includes(query)
      );
      return { results };
    }
  }

  throw new Error('URL not found');
};

// ----------------------------------------------------------------------

const swrOptions: SWRConfiguration = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

// ----------------------------------------------------------------------

type PropertiesData = {
  properties: IPropertyItem[];
};

export function useGetProperties() {
  const url = '/api/properties';

  const { data, isLoading, error, isValidating } = useSWR<PropertiesData>(url, mockFetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      properties: data?.properties || [],
      propertiesLoading: isLoading,
      propertiesError: error,
      propertiesValidating: isValidating,
      propertiesEmpty: !isLoading && !isValidating && !data?.properties.length,
    }),
    [data?.properties, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

type PropertyData = {
  property: IPropertyItem;
};

export function useGetProperty(propertyId: string) {
  const url = propertyId ? ['/api/properties/details', { params: { propertyId } }] : '';

  const { data, isLoading, error, isValidating } = useSWR<PropertyData>(url, mockFetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      property: data?.property,
      propertyLoading: isLoading,
      propertyError: error,
      propertyValidating: isValidating,
    }),
    [data?.property, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

type SearchResultsData = {
  results: IPropertyItem[];
};

export function useSearchProperties(query: string) {
  const url = query ? ['/api/properties/search', { params: { query } }] : '';

  const { data, isLoading, error, isValidating } = useSWR<SearchResultsData>(url, mockFetcher, {
    ...swrOptions,
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      searchResults: data?.results || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty: !isLoading && !isValidating && !data?.results.length,
    }),
    [data?.results, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

type PropertyStats = {
  totalProperties: number;
  availableProperties: number;
  soldProperties: number;
  rentedProperties: number;
  averagePrice: number;
  priceRange: {
    min: number;
    max: number;
  };
};

export function useGetPropertyStats() {
  const url = '/api/properties/stats';

  const { data, isLoading, error, isValidating } = useSWR<PropertyStats>(url, mockFetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      stats: data,
      statsLoading: isLoading,
      statsError: error,
      statsValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

type PropertyFiltersData = {
  types: string[];
  locations: string[];
  priceRanges: { min: number; max: number; label: string }[];
  amenities: string[];
};

export function useGetPropertyFilters() {
  const url = '/api/properties/filters';

  const { data, isLoading, error, isValidating } = useSWR<PropertyFiltersData>(url, mockFetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      filters: data,
      filtersLoading: isLoading,
      filtersError: error,
      filtersValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}