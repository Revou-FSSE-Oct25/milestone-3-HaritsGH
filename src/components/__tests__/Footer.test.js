import { render, screen } from '@testing-library/react'
import Footer from '../Footer'

describe('Footer', () => {
  it('renders the footer component', () => {
    render(<Footer />)
    
    expect(screen.getByText(/© 2026 Harits Ghiffari Hanif. All rights reserved./i)).toBeInTheDocument()
  })

  it('renders the FAQ link', () => {
    render(<Footer />)
    
    const faqLink = screen.getByRole('link', { name: /faq/i })
    expect(faqLink).toBeInTheDocument()
    expect(faqLink).toHaveAttribute('href', '/faq')
  })

  it('renders the GitHub link', () => {
    const { container } = render(<Footer />)
    
    const githubLink = container.querySelector('a[href="https://github.com/HaritsGH/"]')
    expect(githubLink).toBeInTheDocument()
    expect(githubLink).toHaveAttribute('href', 'https://github.com/HaritsGH/')
    expect(githubLink).toHaveAttribute('target', '_blank')
    expect(githubLink).toHaveAttribute('rel', 'noreferrer noopener')
  })

  it('has correct styling classes', () => {
    const { container } = render(<Footer />)
    
    const footer = container.querySelector('footer')
    expect(footer).toHaveClass('font-bold', 'border-t', 'w-full', 'px-8', 'py-2', 'mt-10', 'flex', 'flex-row', 'justify-between', 'bg-stone-500')
  })

  it('FAQ link has hover and active states', () => {
    render(<Footer />)
    
    const faqLink = screen.getByRole('link', { name: /faq/i })
    expect(faqLink).toHaveClass('underline', 'hover:text-blue-600', 'active:text-red-600')
  })

  it('GitHub link has correct icon class', () => {
    const { container } = render(<Footer />)
    
    const githubLink = container.querySelector('a[href="https://github.com/HaritsGH/"]')
    expect(githubLink).toHaveClass('ri-github-line')
  })
})
