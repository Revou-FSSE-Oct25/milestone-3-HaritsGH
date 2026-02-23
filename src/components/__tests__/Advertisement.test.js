import { render, screen } from '@testing-library/react'
import Advertisement from '../Advertisement'

describe('Advertisement', () => {
  it('renders the advertisement component', () => {
    render(<Advertisement />)
    
    const adContainer = screen.getByText(/PROMO: Diskon 50% hanya sampai tanggal 30 Januari 2025/i)
    expect(adContainer).toBeInTheDocument()
  })

  it('has correct styling classes', () => {
    const { container } = render(<Advertisement />)
    
    const adDiv = container.querySelector('div')
    expect(adDiv).toHaveClass('h-24', 'border', 'w-4/5', 'text-center', 'my-5')
  })

  it('displays the promo text correctly', () => {
    render(<Advertisement />)
    
    expect(screen.getByText(/PROMO:/i)).toBeInTheDocument()
    expect(screen.getByText(/Diskon 50%/i)).toBeInTheDocument()
    expect(screen.getByText(/hanya sampai tanggal 30 Januari 2025/i)).toBeInTheDocument()
  })
})
