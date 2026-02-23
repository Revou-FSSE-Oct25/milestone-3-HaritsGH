import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import { CartProvider } from '@/context/CartContext'
import { SessionProvider } from '@/context/SessionContext'
import AddToCartButton from '../AddToCartButton'

// Mock product
const mockProduct = {
  id: 1,
  title: 'Test Product',
  price: 29.99,
  image: 'test-image.jpg'
}

// Helper function to render component with providers
const renderWithProviders = (component, session = { user: 'test-user' }) => {
  return render(
    <SessionProvider sessionUser={session}>
      <CartProvider>
        {component}
      </CartProvider>
    </SessionProvider>
  )
}

describe('AddToCartButton', () => {
  it('renders nothing when session is null', () => {
    const { container } = renderWithProviders(
      <AddToCartButton product={mockProduct} />,
      null
    )
    expect(container.firstChild).toBeNull()
  })

  it('renders Add to Cart button when session exists', () => {
    renderWithProviders(<AddToCartButton product={mockProduct} />)
    
    const button = screen.getByRole('button', { name: /add to cart/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('bg-blue-600')
  })

  it('adds item to cart when button is clicked', async () => {
    renderWithProviders(<AddToCartButton product={mockProduct} />)
    
    const button = screen.getByRole('button', { name: /add to cart/i })
    fireEvent.click(button)
    
    // Button should show "Added" state
    await waitFor(() => {
      expect(button).toHaveTextContent('Added')
      expect(button).toHaveClass('bg-green-600')
      expect(button).toBeDisabled()
    })
  })

  it('resets to original state after 2 seconds', async () => {
    jest.useFakeTimers()
    
    renderWithProviders(<AddToCartButton product={mockProduct} />)
    
    const button = screen.getByRole('button', { name: /add to cart/i })
    fireEvent.click(button)
    
    // Should be in "Added" state
    expect(button).toHaveTextContent('Added')
    expect(button).toBeDisabled()
    
    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(2000)
    })
    
    await waitFor(() => {
      expect(button).toHaveTextContent('Add to Cart')
      expect(button).not.toBeDisabled()
    })
    
    jest.useRealTimers()
  })

  it('does not crash when product is null', () => {
    renderWithProviders(<AddToCartButton product={null} />)
    
    const button = screen.getByRole('button', { name: /add to cart/i })
    fireEvent.click(button)
    
    // Should not add anything and should not crash
    expect(button).toHaveTextContent('Add to Cart')
  })
})
