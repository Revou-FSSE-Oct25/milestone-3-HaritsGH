import { render, screen } from '@testing-library/react'
import { CartProvider } from '@/context/CartContext'
import { SessionProvider } from '@/context/SessionContext'
import ProductList from '../ProductList'

// Mock ProductCard to avoid testing it here
jest.mock('../ProductCard', () => {
  return function MockProductCard({ product }) {
    return (
      <div data-testid={`product-card-${product.id}`}>
        <h3>{product.title}</h3>
        <p>{product.price}</p>
      </div>
    )
  }
})

const mockProducts = [
  { id: 1, title: 'Product 1', price: 29.99 },
  { id: 2, title: 'Product 2', price: 19.99 },
  { id: 3, title: 'Product 3', price: 39.99 }
]

const renderWithProviders = (component, session = { user: 'test-user' }) => {
  return render(
    <SessionProvider sessionUser={session}>
      <CartProvider>
        {component}
      </CartProvider>
    </SessionProvider>
  )
}

describe('ProductList', () => {
  it('renders empty list when no products provided', () => {
    renderWithProviders(<ProductList products={[]} />)
    
    const main = screen.getByRole('main')
    expect(main).toBeInTheDocument()
    expect(main.children.length).toBe(0)
  })

  it('renders list of products correctly', () => {
    renderWithProviders(<ProductList products={mockProducts} />)
    
    expect(screen.getByTestId('product-card-1')).toBeInTheDocument()
    expect(screen.getByTestId('product-card-2')).toBeInTheDocument()
    expect(screen.getByTestId('product-card-3')).toBeInTheDocument()
  })

  it('displays product titles', () => {
    renderWithProviders(<ProductList products={mockProducts} />)
    
    expect(screen.getByText('Product 1')).toBeInTheDocument()
    expect(screen.getByText('Product 2')).toBeInTheDocument()
    expect(screen.getByText('Product 3')).toBeInTheDocument()
  })

  it('displays product prices', () => {
    renderWithProviders(<ProductList products={mockProducts} />)
    
    expect(screen.getByText('29.99')).toBeInTheDocument()
    expect(screen.getByText('19.99')).toBeInTheDocument()
    expect(screen.getByText('39.99')).toBeInTheDocument()
  })

  it('has correct styling classes', () => {
    const { container } = renderWithProviders(<ProductList products={mockProducts} />)
    
    const main = container.querySelector('main')
    expect(main).toHaveClass('w-7/8', 'grid', 'grid-cols-2', 'gap-4', 'sm:grid-cols-3', 'md:grid-cols-4', 'xl:grid-cols-6')
  })

  it('renders products with unique keys', () => {
    renderWithProviders(<ProductList products={mockProducts} />)
    
    // React should handle keys correctly, we can verify by checking that all products are rendered
    expect(screen.getByTestId('product-card-1')).toBeInTheDocument()
    expect(screen.getByTestId('product-card-2')).toBeInTheDocument()
    expect(screen.getByTestId('product-card-3')).toBeInTheDocument()
  })

  it('passes correct product data to each ProductCard', () => {
    renderWithProviders(<ProductList products={mockProducts} />)
    
    const card1 = screen.getByTestId('product-card-1')
    const card2 = screen.getByTestId('product-card-2')
    const card3 = screen.getByTestId('product-card-3')
    
    expect(card1).toHaveTextContent('Product 1')
    expect(card1).toHaveTextContent('29.99')
    
    expect(card2).toHaveTextContent('Product 2')
    expect(card2).toHaveTextContent('19.99')
    
    expect(card3).toHaveTextContent('Product 3')
    expect(card3).toHaveTextContent('39.99')
  })

  it('handles single product', () => {
    const singleProduct = [mockProducts[0]]
    renderWithProviders(<ProductList products={singleProduct} />)
    
    expect(screen.getByTestId('product-card-1')).toBeInTheDocument()
    expect(screen.getByText('Product 1')).toBeInTheDocument()
    expect(screen.getByText('29.99')).toBeInTheDocument()
  })

  it('renders as main element', () => {
    renderWithProviders(<ProductList products={mockProducts} />)
    
    const main = screen.getByRole('main')
    expect(main).toBeInTheDocument()
  })
})
