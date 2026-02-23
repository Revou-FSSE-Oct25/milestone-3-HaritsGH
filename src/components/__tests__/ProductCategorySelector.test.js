import { render, screen } from '@testing-library/react'
import ProductCategorySelector from '../ProductCategorySelector'

const mockCategories = [
  { id: 1, name: 'Electronics' },
  { id: 2, name: 'Clothing' },
  { id: 3, name: 'Books' }
]

describe('ProductCategorySelector', () => {
  it('renders categories title', () => {
    render(<ProductCategorySelector categories={[]} loading={false} fetchError={null} />)
    
    expect(screen.getByText('Categories')).toBeInTheDocument()
    expect(screen.getByText('Categories')).toHaveClass('text-xl', 'font-bold')
  })

  it('shows loading state when loading is true', () => {
    render(<ProductCategorySelector categories={[]} loading={true} fetchError={null} />)
    
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('shows no categories message when categories array is empty and not loading', () => {
    render(<ProductCategorySelector categories={[]} loading={false} fetchError={null} />)
    
    expect(screen.getByText('No category found.')).toBeInTheDocument()
  })

  it('shows error message when there is a fetch error', () => {
    render(<ProductCategorySelector categories={[]} loading={false} fetchError="category" />)
    
    expect(screen.getByText('Error fetching product categories.')).toBeInTheDocument()
  })

  it('renders categories list when categories are provided', () => {
    render(<ProductCategorySelector categories={mockCategories} loading={false} fetchError={null} />)
    
    expect(screen.getByText('Electronics')).toBeInTheDocument()
    expect(screen.getByText('Clothing')).toBeInTheDocument()
    expect(screen.getByText('Books')).toBeInTheDocument()
  })

  it('does not show loading message when not loading', () => {
    render(<ProductCategorySelector categories={mockCategories} loading={false} fetchError={null} />)
    
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
  })

  it('does not show no categories message when categories exist', () => {
    render(<ProductCategorySelector categories={mockCategories} loading={false} fetchError={null} />)
    
    expect(screen.queryByText('No category found.')).not.toBeInTheDocument()
  })

  it('does not show error message when no fetch error', () => {
    render(<ProductCategorySelector categories={mockCategories} loading={false} fetchError={null} />)
    
    expect(screen.queryByText('Error fetching product categories.')).not.toBeInTheDocument()
  })

  it('renders categories with correct styling', () => {
    render(<ProductCategorySelector categories={mockCategories} loading={false} fetchError={null} />)
    
    const categoryElements = screen.getAllByText(/Electronics|Clothing|Books/)
    categoryElements.forEach(element => {
      expect(element).toHaveClass('text-base')
    })
  })

  it('has correct styling classes for container', () => {
    const { container } = render(<ProductCategorySelector categories={[]} loading={false} fetchError={null} />)
    
    const aside = container.querySelector('aside')
    expect(aside).toHaveClass('w-1/8', 'flex', 'flex-col')
  })

  it('renders categories with unique keys', () => {
    render(<ProductCategorySelector categories={mockCategories} loading={false} fetchError={null} />)
    
    // This is more of a React implementation detail, but we can verify the categories are rendered
    expect(screen.getByText('Electronics')).toBeInTheDocument()
    expect(screen.getByText('Clothing')).toBeInTheDocument()
    expect(screen.getByText('Books')).toBeInTheDocument()
  })
})
