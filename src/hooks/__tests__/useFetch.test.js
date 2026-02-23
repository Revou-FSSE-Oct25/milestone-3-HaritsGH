import { renderHook } from '@testing-library/react'
import { useFetch } from '../useFetch'

// Mock fetch globally
global.fetch = jest.fn()

describe('useFetch', () => {
  beforeEach(() => {
    fetch.mockClear()
  })

  it('initializes with loading state', () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: 'test' })
    })

    const { result } = renderHook(() => useFetch('https://api.example.com/data'))
    
    expect(result.current.loading).toBe(true)
    expect(result.current.data).toBe(null)
    expect(result.current.errorMessage).toBe(null)
  })

  it('fetches data successfully', async () => {
    const mockData = { id: 1, name: 'Test Data' }
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData
    })

    const { result } = renderHook(() => useFetch('https://api.example.com/data'))
    
    // Wait for the hook to complete
    await new Promise(resolve => setTimeout(resolve, 0))
    
    expect(fetch).toHaveBeenCalledWith('https://api.example.com/data')
    expect(result.current.data).toEqual(mockData)
    expect(result.current.loading).toBe(false)
    expect(result.current.errorMessage).toBe(null)
  })

  it('handles network error', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'))

    const { result } = renderHook(() => useFetch('https://api.example.com/data'))
    
    // Wait for the hook to complete
    await new Promise(resolve => setTimeout(resolve, 0))
    
    expect(result.current.data).toBe(null)
    expect(result.current.loading).toBe(false)
    expect(result.current.errorMessage).toBe('Fetch failed.')
  })

  it('handles HTTP error response', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => ({ error: 'Not found' })
    })

    const { result } = renderHook(() => useFetch('https://api.example.com/data'))
    
    // Wait for the hook to complete
    await new Promise(resolve => setTimeout(resolve, 0))
    
    expect(result.current.data).toBe(null)
    expect(result.current.loading).toBe(false)
    expect(result.current.errorMessage).toBe('Fetch failed.')
  })

  it('refetches when URL changes', async () => {
    const mockData1 = { id: 1, name: 'Data 1' }
    const mockData2 = { id: 2, name: 'Data 2' }
    
    fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockData1
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockData2
      })

    const { result, rerender } = renderHook(
      ({ url }) => useFetch(url),
      {
        initialProps: { url: 'https://api.example.com/data1' }
      }
    )
    
    // Wait for first fetch
    await new Promise(resolve => setTimeout(resolve, 0))
    
    expect(result.current.data).toEqual(mockData1)
    expect(fetch).toHaveBeenCalledWith('https://api.example.com/data1')
    
    // Change URL
    rerender({ url: 'https://api.example.com/data2' })
    
    // Wait for second fetch
    await new Promise(resolve => setTimeout(resolve, 0))
    
    expect(result.current.data).toEqual(mockData2)
    expect(fetch).toHaveBeenCalledWith('https://api.example.com/data2')
  })

  it('sets loading to false after fetch completes (success)', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: 'test' })
    })

    const { result } = renderHook(() => useFetch('https://api.example.com/data'))
    
    // Initially loading
    expect(result.current.loading).toBe(true)
    
    // Wait for fetch to complete
    await new Promise(resolve => setTimeout(resolve, 0))
    
    expect(result.current.loading).toBe(false)
  })

  it('sets loading to false after fetch completes (error)', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'))

    const { result } = renderHook(() => useFetch('https://api.example.com/data'))
    
    // Initially loading
    expect(result.current.loading).toBe(true)
    
    // Wait for fetch to complete
    await new Promise(resolve => setTimeout(resolve, 0))
    
    expect(result.current.loading).toBe(false)
  })

  it('handles empty response', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => null
    })

    const { result } = renderHook(() => useFetch('https://api.example.com/data'))
    
    // Wait for fetch to complete
    await new Promise(resolve => setTimeout(resolve, 0))
    
    expect(result.current.data).toBe(null)
    expect(result.current.loading).toBe(false)
    expect(result.current.errorMessage).toBe(null)
  })

  it('handles JSON parsing error', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => {
        throw new Error('Invalid JSON')
      }
    })

    const { result } = renderHook(() => useFetch('https://api.example.com/data'))
    
    // Wait for fetch to complete
    await new Promise(resolve => setTimeout(resolve, 0))
    
    expect(result.current.data).toBe(null)
    expect(result.current.loading).toBe(false)
    expect(result.current.errorMessage).toBe('Fetch failed.')
  })

  it('does not fetch when URL is empty string', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: 'test' })
    })

    renderHook(() => useFetch(''))
    
    // Wait for any potential fetch
    await new Promise(resolve => setTimeout(resolve, 0))
    
    // Should not have been called since URL is empty
    expect(fetch).not.toHaveBeenCalled()
  })

  it('does not fetch when URL is null', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: 'test' })
    })

    renderHook(() => useFetch(null))
    
    // Wait for any potential fetch
    await new Promise(resolve => setTimeout(resolve, 0))
    
    // Should not have been called since URL is null
    expect(fetch).not.toHaveBeenCalled()
  })
})
