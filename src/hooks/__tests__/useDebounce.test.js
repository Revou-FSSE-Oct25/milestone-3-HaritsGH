import { renderHook, act } from '@testing-library/react'
import { useDebounce } from '../useDebounce'

describe('useDebounce', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('returns the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial value', 500))
    
    expect(result.current).toBe('initial value')
  })

  it('does not update value before delay', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 500 }
      }
    )
    
    // Change the value
    rerender({ value: 'updated', delay: 500 })
    
    // Value should still be the initial one before delay
    expect(result.current).toBe('initial')
  })

  it('updates value after delay', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 500 }
      }
    )
    
    // Change the value
    rerender({ value: 'updated', delay: 500 })
    
    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(500)
    })
    
    expect(result.current).toBe('updated')
  })

  it('resets timer when value changes before delay expires', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 500 }
      }
    )
    
    // Change value first time
    rerender({ value: 'first update', delay: 500 })
    
    // Advance time partially
    act(() => {
      jest.advanceTimersByTime(250)
    })
    
    // Change value again before timer completes
    rerender({ value: 'second update', delay: 500 })
    
    // Advance time for the remaining delay
    act(() => {
      jest.advanceTimersByTime(500)
    })
    
    expect(result.current).toBe('second update')
  })

  it('works with different delay values', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 100 }
      }
    )
    
    rerender({ value: 'updated', delay: 100 })
    
    act(() => {
      jest.advanceTimersByTime(100)
    })
    
    expect(result.current).toBe('updated')
  })

  it('works with zero delay', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 0 }
      }
    )
    
    rerender({ value: 'updated', delay: 0 })
    
    act(() => {
      jest.advanceTimersByTime(0)
    })
    
    expect(result.current).toBe('updated')
  })

  it('works with different data types', () => {
    // Test with numbers
    const { result: numberResult, rerender: numberRerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 1, delay: 100 }
      }
    )
    
    numberRerender({ value: 2, delay: 100 })
    
    act(() => {
      jest.advanceTimersByTime(100)
    })
    
    expect(numberResult.current).toBe(2)
    
    // Test with objects
    const { result: objectResult, rerender: objectRerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: { a: 1 }, delay: 100 }
      }
    )
    
    objectRerender({ value: { a: 2 }, delay: 100 })
    
    act(() => {
      jest.advanceTimersByTime(100)
    })
    
    expect(objectResult.current).toEqual({ a: 2 })
  })

  it('cleans up timer on unmount', () => {
    const { result, rerender, unmount } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 500 }
      }
    )
    
    rerender({ value: 'updated', delay: 500 })
    
    // Unmount before timer completes
    unmount()
    
    // Should not cause any errors and timer should be cleared
    expect(result.current).toBe('initial')
  })

  it('handles rapid value changes correctly', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 500 }
      }
    )
    
    // Rapidly change values
    rerender({ value: 'update 1', delay: 500 })
    rerender({ value: 'update 2', delay: 500 })
    rerender({ value: 'update 3', delay: 500 })
    
    // Only the last value should be set after delay
    act(() => {
      jest.advanceTimersByTime(500)
    })
    
    expect(result.current).toBe('update 3')
  })

  it('handles delay parameter changes', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 500 }
      }
    )
    
    // Change both value and delay
    rerender({ value: 'updated', delay: 200 })
    
    act(() => {
      jest.advanceTimersByTime(200)
    })
    
    expect(result.current).toBe('updated')
  })
})
