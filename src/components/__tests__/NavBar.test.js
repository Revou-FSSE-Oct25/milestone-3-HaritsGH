import { render, screen } from '@testing-library/react'
import { CartProvider } from '@/context/CartContext'
import { SessionProvider } from '@/context/SessionContext'
import NavBar from '../NavBar'

// Mock LoginButton and LogoutButton to avoid testing them here
jest.mock('../LoginButton', () => {
  return function MockLoginButton() {
    return <button>Login</button>
  }
})

jest.mock('../LogoutButton', () => {
  return function MockLogoutButton() {
    return <button>Logout</button>
  }
})

const renderWithProviders = (component, session = null) => {
  return render(
    <SessionProvider sessionUser={session}>
      <CartProvider>
        {component}
      </CartProvider>
    </SessionProvider>
  )
}

describe('NavBar', () => {
  it('renders the navigation bar', () => {
    renderWithProviders(<NavBar />)
    
    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()
  })

  it('renders search bar', () => {
    renderWithProviders(<NavBar />)
    
    const searchBar = screen.getByPlaceholderText(/search products/i)
    expect(searchBar).toBeInTheDocument()
  })

  it('shows LoginButton when session is null', () => {
    renderWithProviders(<NavBar />, null)
    
    expect(screen.getByText('Login')).toBeInTheDocument()
  })

  it('shows user info when session exists', () => {
    const mockSession = { name: 'John Doe', priviledge: 'user' }
    renderWithProviders(<NavBar />, mockSession)
    
    expect(screen.getByText(/Hi, John Doe/i)).toBeInTheDocument()
    expect(screen.getByText('Logout')).toBeInTheDocument()
  })

  it('shows View Cart link when session exists', () => {
    const mockSession = { name: 'John Doe' }
    renderWithProviders(<NavBar />, mockSession)
    
    const viewCartLink = screen.getByRole('link', { name: /view cart/i })
    expect(viewCartLink).toBeInTheDocument()
    expect(viewCartLink).toHaveAttribute('href', '/checkout')
  })

  it('shows cart item count when items are in cart', () => {
    const mockSession = { name: 'John Doe' }
    
    // Mock cart with items
    const { rerender } = renderWithProviders(<NavBar />, mockSession)
    
    // Initially cart is empty
    expect(screen.getByRole('link', { name: /view cart/i })).toHaveTextContent('View Cart')
  })

  it('shows Manage Products link for admin users', () => {
    const mockSession = { name: 'Admin User', priviledge: 'admin' }
    renderWithProviders(<NavBar />, mockSession)
    
    const manageLink = screen.getByRole('link', { name: /manage products/i })
    expect(manageLink).toBeInTheDocument()
    expect(manageLink).toHaveAttribute('href', '/manage')
  })

  it('does not show Manage Products link for non-admin users', () => {
    const mockSession = { name: 'Regular User', priviledge: 'user' }
    renderWithProviders(<NavBar />, mockSession)
    
    expect(screen.queryByRole('link', { name: /manage products/i })).not.toBeInTheDocument()
  })

  it('has correct styling classes', () => {
    const { container } = renderWithProviders(<NavBar />)
    
    const nav = container.querySelector('nav')
    expect(nav).toHaveClass('bg-white', 'shadow-md', 'p-4', 'mb-6')
  })

  it('search bar has correct attributes', () => {
    renderWithProviders(<NavBar />)
    
    const searchBar = screen.getByPlaceholderText(/search products/i)
    expect(searchBar).toHaveAttribute('type', 'text')
    expect(searchBar).toHaveClass('border', 'border-gray-300', 'rounded', 'px-2', 'py-1')
  })
})
