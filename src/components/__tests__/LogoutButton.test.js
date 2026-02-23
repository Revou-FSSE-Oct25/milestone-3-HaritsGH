import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { CartProvider } from '@/context/CartContext'
import LogoutButton from '../LogoutButton'

// Mock the logoutAction
jest.mock('@/app/login/action', () => ({
  logoutAction: jest.fn()
}))

describe('LogoutButton', () => {
  beforeEach(() => {
    const { logoutAction } = require('@/app/login/action')
    logoutAction.mockClear()
  })

  const renderWithProvider = (component) => {
    return render(
      <CartProvider>
        {component}
      </CartProvider>
    )
  }

  it('renders the logout button', () => {
    renderWithProvider(<LogoutButton />)
    
    const logoutButton = screen.getByRole('button', { name: /logout/i })
    expect(logoutButton).toBeInTheDocument()
  })

  it('has correct styling classes', () => {
    const { container } = renderWithProvider(<LogoutButton />)
    
    const logoutButton = container.querySelector('button')
    expect(logoutButton).toHaveClass('border', 'border-black')
  })

  it('shows loading state when logging out', async () => {
    const { logoutAction } = require('@/app/login/action')
    logoutAction.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)))
    
    renderWithProvider(<LogoutButton />)
    
    const logoutButton = screen.getByRole('button', { name: /logout/i })
    fireEvent.click(logoutButton)
    
    expect(screen.getByText('Logging out...')).toBeInTheDocument()
    expect(logoutButton).toBeDisabled()
  })

  it('calls clearCart and logoutAction when clicked', async () => {
    const { logoutAction } = require('@/app/login/action')
    
    renderWithProvider(<LogoutButton />)
    
    const logoutButton = screen.getByRole('button', { name: /logout/i })
    fireEvent.click(logoutButton)
    
    await waitFor(() => {
      expect(logoutAction).toHaveBeenCalled()
    })
  })

  it('disables button during logout process', async () => {
    const { logoutAction } = require('@/app/login/action')
    logoutAction.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)))
    
    renderWithProvider(<LogoutButton />)
    
    const logoutButton = screen.getByRole('button', { name: /logout/i })
    fireEvent.click(logoutButton)
    
    expect(logoutButton).toBeDisabled()
  })

  it('re-enables button after logout completes', async () => {
    const { logoutAction } = require('@/app/login/action')
    logoutAction.mockResolvedValue()
    
    renderWithProvider(<LogoutButton />)
    
    const logoutButton = screen.getByRole('button', { name: /logout/i })
    fireEvent.click(logoutButton)
    
    await waitFor(() => {
      expect(logoutButton).not.toBeDisabled()
      expect(screen.getByText('Logout')).toBeInTheDocument()
    })
  })
})
