import { render, screen, act } from '@testing-library/react'
import { CartProvider, useCart } from '../CartContext'

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
})

// Test component to use the context
function TestComponent() {
  const { inCartItems, addItem, reduceItem, removeItem, clearCart, totalCartValue } = useCart()
  
  return (
    <div>
      <div data-testid="cart-items-count">{inCartItems.length}</div>
      <div data-testid="total-value">{totalCartValue}</div>
      <button onClick={() => addItem({ id: '1', name: 'Test Product', price: 10 })}>
        Add Item
      </button>
      <button onClick={() => reduceItem('1')}>
        Reduce Item
      </button>
      <button onClick={() => removeItem('1')}>
        Remove Item
      </button>
      <button onClick={() => clearCart()}>
        Clear Cart
      </button>
      <div data-testid="item-1-quantity">
        {inCartItems.find(item => item.id === '1')?.quantity || 0}
      </div>
    </div>
  )
}

describe('CartContext', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear()
    localStorageMock.setItem.mockClear()
    localStorageMock.removeItem.mockClear()
    localStorageMock.clear.mockClear()
    localStorageMock.getItem.mockReturnValue(null)
  })

  it('provides cart context values', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )
    
    expect(screen.getByTestId('cart-items-count')).toHaveTextContent('0')
    expect(screen.getByTestId('total-value')).toHaveTextContent('0')
  })

  it('loads cart from localStorage on mount', () => {
    const mockCart = [
      { id: '1', name: 'Test Product', price: 10, quantity: 2 }
    ]
    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockCart))
    
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )
    
    expect(localStorageMock.getItem).toHaveBeenCalledWith('cartItems')
    expect(screen.getByTestId('cart-items-count')).toHaveTextContent('1')
    expect(screen.getByTestId('total-value')).toHaveTextContent('20')
  })

  it('adds new item to cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )
    
    const addButton = screen.getByText('Add Item')
    act(() => {
      addButton.click()
    })
    
    expect(screen.getByTestId('cart-items-count')).toHaveTextContent('1')
    expect(screen.getByTestId('item-1-quantity')).toHaveTextContent('1')
    expect(screen.getByTestId('total-value')).toHaveTextContent('10')
  })

  it('increments quantity for existing item', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )
    
    const addButton = screen.getByText('Add Item')
    
    // Add item twice
    act(() => {
      addButton.click()
    })
    act(() => {
      addButton.click()
    })
    
    expect(screen.getByTestId('cart-items-count')).toHaveTextContent('1')
    expect(screen.getByTestId('item-1-quantity')).toHaveTextContent('2')
    expect(screen.getByTestId('total-value')).toHaveTextContent('20')
  })

  it('reduces item quantity', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )
    
    const addButton = screen.getByText('Add Item')
    const reduceButton = screen.getByText('Reduce Item')
    
    // Add item twice
    act(() => {
      addButton.click()
    })
    act(() => {
      addButton.click()
    })
    
    // Reduce once
    act(() => {
      reduceButton.click()
    })
    
    expect(screen.getByTestId('item-1-quantity')).toHaveTextContent('1')
    expect(screen.getByTestId('total-value')).toHaveTextContent('10')
  })

  it('removes item when quantity is 1 and reduce is called', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )
    
    const addButton = screen.getByText('Add Item')
    const reduceButton = screen.getByText('Reduce Item')
    
    // Add item once
    act(() => {
      addButton.click()
    })
    
    // Reduce (should remove item)
    act(() => {
      reduceButton.click()
    })
    
    expect(screen.getByTestId('cart-items-count')).toHaveTextContent('0')
    expect(screen.getByTestId('total-value')).toHaveTextContent('0')
  })

  it('removes item completely', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )
    
    const addButton = screen.getByText('Add Item')
    const removeButton = screen.getByText('Remove Item')
    
    // Add item
    act(() => {
      addButton.click()
    })
    
    // Remove item
    act(() => {
      removeButton.click()
    })
    
    expect(screen.getByTestId('cart-items-count')).toHaveTextContent('0')
    expect(screen.getByTestId('total-value')).toHaveTextContent('0')
  })

  it('clears cart completely', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )
    
    const addButton = screen.getByText('Add Item')
    const clearButton = screen.getByText('Clear Cart')
    
    // Add multiple items
    act(() => {
      addButton.click()
    })
    act(() => {
      addButton.click()
    })
    
    // Clear cart
    act(() => {
      clearButton.click()
    })
    
    expect(screen.getByTestId('cart-items-count')).toHaveTextContent('0')
    expect(screen.getByTestId('total-value')).toHaveTextContent('0')
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('cartItems')
  })

  it('saves to localStorage when cart changes', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )
    
    const addButton = screen.getByText('Add Item')
    
    act(() => {
      addButton.click()
    })
    
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'cartItems',
      JSON.stringify([{ id: '1', name: 'Test Product', price: 10, quantity: 1 }])
    )
  })

  it('calculates total cart value correctly', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )
    
    const addButton = screen.getByText('Add Item')
    
    // Add item multiple times
    act(() => {
      addButton.click()
    })
    act(() => {
      addButton.click()
    })
    act(() => {
      addButton.click()
    })
    
    expect(screen.getByTestId('total-value')).toHaveTextContent('30') // 3 * 10
  })

  it('handles multiple different items', () => {
    function MultiItemTestComponent() {
      const { inCartItems, addItem, totalCartValue } = useCart()
      
      return (
        <div>
          <div data-testid="cart-items-count">{inCartItems.length}</div>
          <div data-testid="total-value">{totalCartValue}</div>
          <button onClick={() => addItem({ id: '1', name: 'Product 1', price: 10 })}>
            Add Item 1
          </button>
          <button onClick={() => addItem({ id: '2', name: 'Product 2', price: 20 })}>
            Add Item 2
          </button>
        </div>
      )
    }
    
    render(
      <CartProvider>
        <MultiItemTestComponent />
      </CartProvider>
    )
    
    const addButton1 = screen.getByText('Add Item 1')
    const addButton2 = screen.getByText('Add Item 2')
    
    act(() => {
      addButton1.click()
    })
    act(() => {
      addButton2.click()
    })
    
    expect(screen.getByTestId('cart-items-count')).toHaveTextContent('2')
    expect(screen.getByTestId('total-value')).toHaveTextContent('30')
  })

  it('throws error when useCart is used outside provider', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    
    expect(() => {
      render(<TestComponent />)
    }).toThrow('useCart must used between cart context')
    
    consoleSpy.mockRestore()
  })
})
