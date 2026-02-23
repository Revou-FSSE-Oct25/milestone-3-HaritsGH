import { render, screen } from '@testing-library/react'
import Header from '../Header'

describe('Header', () => {
  it('renders the header with RevoShop text', () => {
    render(<Header />)
    
    const headerText = screen.getByRole('heading', { name: /revoshop/i })
    expect(headerText).toBeInTheDocument()
    expect(headerText).toHaveTextContent('RevoShop')
  })

  it('renders as a link to home page', () => {
    render(<Header />)
    
    const link = screen.getByRole('link', { name: /revoshop/i })
    expect(link).toHaveAttribute('href', '/')
  })

  it('has correct styling classes', () => {
    const { container } = render(<Header />)
    
    const heading = container.querySelector('h1')
    expect(heading).toHaveClass('text-4xl', 'flex', 'font-extrabold', 'my-5')
  })

  it('wraps heading in a Link component', () => {
    const { container } = render(<Header />)
    
    const link = container.querySelector('a')
    const heading = container.querySelector('h1')
    
    expect(link).toContainElement(heading)
  })
})
