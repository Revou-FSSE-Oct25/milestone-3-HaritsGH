import { render, screen } from '@testing-library/react'
import { CartProvider } from '@/context/CartContext'
import { SessionProvider } from '@/context/SessionContext'
import ProductCard from '../ProductCard'

// Mock AddToCartButton to avoid testing it here
jest.mock('../AddToCartButton', () => {
  return function MockAddToCartButton({ product }) {
    return <button>Add to Cart</button>
  }
})

// Mock Next.js Image component
jest.mock('next/image', () => {
  return function MockImage({ src, alt, ...props }) {
    return <img src={src} alt={alt} {...props} />
  }
})

const mockProduct = {
  id: 1,
  title: 'Test Product',
  price: 29.99,
  image: 'test-image.jpg',
  category: 'Electronics'
}

const renderWithProviders = (component, session = { user: 'test-user' }) => {
  return render(
    <SessionProvider sessionUser={session}>
      <CartProvider>
        {component}
      </CartProvider>
    </SessionProvider>
  )
}

describe('ProductCard', () => {
  it('renders product information correctly', () => {
    renderWithProviders(<ProductCard product={mockProduct} />)
    
    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('Electronics')).toBeInTheDocument()
    expect(screen.getByText('$ 29.99')).toBeInTheDocument()
  })

  it('renders product image', () => {
    renderWithProviders(<ProductCard product={mockProduct} />)
    
    const image = screen.getByRole('img')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', 'test-image.jpg')
  })

  it('renders Add to Cart button', () => {
    renderWithProviders(<ProductCard product={mockProduct} />)
    
    expect(screen.getByText('Add to Cart')).toBeInTheDocument()
  })

  it('renders Details link with correct href', () => {
    renderWithProviders(<ProductCard product={mockProduct} />)
    
    const detailsLink = screen.getByRole('link', { name: /details/i })
    expect(detailsLink).toBeInTheDocument()
    expect(detailsLink).toHaveAttribute('href', '/product/1')
  })

  it('has correct styling classes', () => {
    const { container } = renderWithProviders(<ProductCard product={mockProduct} />)
    
    const article = container.querySelector('article')
    expect(article).toHaveClass('h-full', 'rounded-lg', 'border', 'shadow-sm', 'overflow-hidden', 'flex', 'flex-col', 'bg-stone-300')
  })

  it('displays price with correct format', () => {
    renderWithProviders(<ProductCard product={mockProduct} />)
    
    const priceElement = screen.getByText('$ 29.99')
    expect(priceElement).toHaveClass('self-end', 'text-2xl', 'pr-4')
  })

  it('displays category with correct styling', () => {
    renderWithProviders(<ProductCard product={mockProduct} />)
    
    const categoryElement = screen.getByText('Electronics')
    expect(categoryElement).toHaveClass('font-xs', 'text-gray-500', 'mt-4')
  })

  it('displays title with correct styling', () => {
    renderWithProviders(<ProductCard product={mockProduct} />)
    
    const titleElement = screen.getByText('Test Product')
    expect(titleElement).toHaveClass('font-bold')
  })

  it('Details link has correct styling classes', () => {
    const { container } = renderWithProviders(<ProductCard product={mockProduct} />)
    
    const detailsLink = container.querySelector('a[href="/product/1"]')
    expect(detailsLink).toHaveClass('w-full', 'mt-2', 'bg-blue-600', 'text-white', 'text-center', 'py-2', 'rounded', 'hover:bg-blue-700', 'active:bg-blue-800')
  })

  it('renders nothing when product is null', () => {
    const { container } = renderWithProviders(<ProductCard product={null} />)
    
    // Should render null (empty container)
    expect(container.firstChild).toBeNull()
  })
})
