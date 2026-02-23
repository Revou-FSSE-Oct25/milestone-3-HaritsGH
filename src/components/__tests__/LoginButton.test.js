import { render, screen } from '@testing-library/react'
import LoginButton from '../LoginButton'

describe('LoginButton', () => {
  it('renders the login button', () => {
    render(<LoginButton />)
    
    const loginButton = screen.getByRole('link', { name: /login/i })
    expect(loginButton).toBeInTheDocument()
  })

  it('links to the login page', () => {
    render(<LoginButton />)
    
    const loginButton = screen.getByRole('link', { name: /login/i })
    expect(loginButton).toHaveAttribute('href', '/login')
  })

  it('has correct styling classes', () => {
    const { container } = render(<LoginButton />)
    
    const loginButton = container.querySelector('a')
    expect(loginButton).toHaveClass(
      'w-full',
      'mt-2',
      'bg-blue-600',
      'text-white',
      'text-center',
      'py-2',
      'rounded',
      'hover:bg-blue-700',
      'active:bg-blue-800'
    )
  })

  it('displays correct text', () => {
    render(<LoginButton />)
    
    expect(screen.getByText('Login')).toBeInTheDocument()
  })
})
