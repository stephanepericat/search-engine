'use server'

import { SearchResult } from "@/components/search-results-list"

interface LangSearchWebPage {
  id: string
  name: string
  url: string
  displayUrl: string
  snippet: string
  summary: string
  datePublished: string | null
  dateLastCrawled: string | null
}

interface LangSearchResponse {
  code: number
  log_id: string
  msg: string | null
  data: {
    _type: string
    queryContext: {
      originalQuery: string
    }
    webPages: {
      webSearchUrl: string
      totalEstimatedMatches: number | null
      value: LangSearchWebPage[]
      someResultsRemoved: boolean
    }
  }
}

interface SearchResults {
  results: SearchResult[]
  sidebarData: {
    featuredSnippet?: {
      title: string
      content: string
      source: string
      url: string
    }
    relatedSearches?: Array<{
      query: string
      count: string
    }>
    news?: Array<{
      title: string
      source: string
      time: string
      url: string
    }>
    trending?: string[]
  }
  totalResults: number
  searchTime: number
}

export async function performSearch(query: string, page: number = 1): Promise<SearchResults> {
  try {
    // Validate input
    if (!query || query.trim().length === 0) {
      throw new Error('Search query is required')
    }

    // Get environment variables
    const apiKey = process.env.LANGSEARCH_API_KEY
    const apiDomain = process.env.LANGSEARCH_API_DOMAIN
    const searchEndpoint = process.env.LANGSEARCH_SEARCH_ENDPOINT

    if (!apiKey || !apiDomain || !searchEndpoint) {
      throw new Error('Langsearch API configuration is missing')
    }

    // Calculate pagination parameters
    const resultsPerPage = 10
    const offset = (page - 1) * resultsPerPage

    // Make API request to langsearch
    const response = await fetch(`${apiDomain}${searchEndpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        query: query.trim(),
        limit: resultsPerPage,
        offset: offset,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
    }

    const data: LangSearchResponse = await response.json()

    // Transform langsearch results to match our SearchResult interface
    const transformedResults: SearchResult[] = (data.data.webPages.value || []).map((result, index) => {
      const url = new URL(result.url)
      const domain = url.hostname.replace('www.', '')
      
      return {
        id: `${page}-${index}`,
        title: result.name || result.url || '',
        url: result.url || '',
        description: result.snippet || result.summary || '',
        domain: domain,
        timestamp: result.datePublished || undefined,
        favicon: `/api/favicon?domain=${encodeURIComponent(domain)}`,
        tags: [], // Tags not provided by langsearch API
      }
    })

    // Transform sidebar data (not available in current API response)
    const sidebarData = {
      featuredSnippet: undefined,
      relatedSearches: undefined,
      news: undefined,
      trending: undefined,
    }

    return {
      results: transformedResults,
      sidebarData,
      totalResults: data.data.webPages.totalEstimatedMatches || data.data.webPages.value.length,
      searchTime: 0, // Not provided in current API response
    }

  } catch (error) {
    console.error('Search error:', error)
    
    // Return error structure that matches our expected format
    return {
      results: [],
      sidebarData: {},
      totalResults: 0,
      searchTime: 0,
    }
  }
}

export async function getSearchResults(query: string, page: number = 1): Promise<SearchResults> {
  return performSearch(query, page)
}