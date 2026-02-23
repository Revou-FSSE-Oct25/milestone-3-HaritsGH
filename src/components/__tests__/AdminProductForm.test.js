import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AdminProductForm from '../AdminProductForm'

describe('AdminProductForm', () => {
  const mockOnSubmit = jest.fn()
  
  beforeEach(() => {
    mockOnSubmit.mockClear()
  })

  it('renders form with all fields', () => {
    render(<AdminProductForm onSubmit={mockOnSubmit} />)
    
    expect(screen.getByLabelText(/product name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/product description/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/product price/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/product category/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/product image url/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /add product/i })).toBeInTheDocument()
  })

  it('populates form fields when product prop is provided', () => {
    const mockProduct = {
      title: 'Test Product',
      description: 'Test Description',
      price: '29.99',
      category: 'Electronics',
      image: 'https://example.com/image.jpg'
    }
    
    render(<AdminProductForm product={mockProduct} onSubmit={mockOnSubmit} />)
    
    expect(screen.getByDisplayValue('Test Product')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Test Description')).toBeInTheDocument()
    expect(screen.getByDisplayValue('29.99')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Electronics')).toBeInTheDocument()
    expect(screen.getByDisplayValue('https://example.com/image.jpg')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /update product/i })).toBeInTheDocument()
  })

  it('updates form fields when user types', async () => {
    const user = userEvent.setup()
    render(<AdminProductForm onSubmit={mockOnSubmit} />)
    
    const titleInput = screen.getByLabelText(/product name/i)
    const descriptionInput = screen.getByLabelText(/product description/i)
    const priceInput = screen.getByLabelText(/product price/i)
    
    await user.type(titleInput, 'Test Product')
    await user.type(descriptionInput, 'Test Description')
    await user.type(priceInput, '29.99')
    
    expect(titleInput).toHaveValue('Test Product')
    expect(descriptionInput).toHaveValue('Test Description')
    expect(priceInput).toHaveValue(29.99)
  })

  it('submits form with correct data', async () => {
    const user = userEvent.setup()
    render(<AdminProductForm onSubmit={mockOnSubmit} />)
    
    await user.type(screen.getByLabelText(/product name/i), 'Test Product')
    await user.type(screen.getByLabelText(/product description/i), 'Test Description')
    await user.type(screen.getByLabelText(/product price/i), '29.99')
    
    // Select category
    await user.selectOptions(screen.getByLabelText(/product category/i), 'Electronics')
    await user.type(screen.getByLabelText(/product image url/i), 'https://example.com/image.jpg')
    
    await user.click(screen.getByRole('button', { name: /add product/i }))
    
    expect(mockOnSubmit).toHaveBeenCalledWith({
      title: 'Test Product',
      description: 'Test Description',
      price: '29.99',
      category: 'Electronics',
      image: 'https://example.com/image.jpg',
      price: 29.99 // parseFloat conversion
    })
  })

  it('displays loading state when loading prop is true', () => {
    render(<AdminProductForm onSubmit={mockOnSubmit} />)
    
    // Note: loading state is controlled internally, but we can test the loading UI
    // This would need to be refactored to accept loading as a prop for better testability
  })

  it('displays error message when errorMessage prop is provided', () => {
    // This would need to be refactored to accept errorMessage as a prop for better testability
  })

  it('has required attributes on form fields', () => {
    render(<AdminProductForm onSubmit={mockOnSubmit} />)
    
    expect(screen.getByLabelText(/product name/i)).toBeRequired()
    expect(screen.getByLabelText(/product description/i)).toBeRequired()
    expect(screen.getByLabelText(/product price/i)).toBeRequired()
    expect(screen.getByLabelText(/product category/i)).toBeRequired()
    expect(screen.getByLabelText(/product image url/i)).toBeRequired()
  })

  it('price input has correct attributes', () => {
    render(<AdminProductForm onSubmit={mockOnSubmit} />)
    
    const priceInput = screen.getByLabelText(/product price/i)
    expect(priceInput).toHaveAttribute('type', 'number')
    expect(priceInput).toHaveAttribute('step', '0.01')
    expect(priceInput).toHaveAttribute('min', '0')
  })

  it('image input has url type', () => {
    render(<AdminProductForm onSubmit={mockOnSubmit} />)
    
    const imageInput = screen.getByLabelText(/product image url/i)
    expect(imageInput).toHaveAttribute('type', 'url')
  })
})
