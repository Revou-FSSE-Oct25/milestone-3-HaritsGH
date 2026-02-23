import { render, screen } from '@testing-library/react'
import { SessionProvider, useSessionContext } from '../SessionContext'

// Test component to use the context
function TestComponent() {
  const session = useSessionContext()
  
  return (
    <div>
      <div data-testid="session-data">
        {session ? JSON.stringify(session) : 'null'}
      </div>
    </div>
  )
}

describe('SessionContext', () => {
  it('provides session data to children', () => {
    const mockSession = { user: 'test-user', name: 'John Doe' }
    
    render(
      <SessionProvider sessionUser={mockSession}>
        <TestComponent />
      </SessionProvider>
    )
    
    expect(screen.getByTestId('session-data')).toHaveTextContent(JSON.stringify(mockSession))
  })

  it('provides null when no session is provided', () => {
    render(
      <SessionProvider sessionUser={null}>
        <TestComponent />
      </SessionProvider>
    )
    
    expect(screen.getByTestId('session-data')).toHaveTextContent('null')
  })

  it('throws error when sessionUser is undefined', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    
    expect(() => {
      render(
        <SessionProvider sessionUser={undefined}>
          <TestComponent />
        </SessionProvider>
      )
    }).toThrow('useSessionContext must be used within a SessionProvider')
    
    consoleSpy.mockRestore()
  })

  it('provides empty object when empty object is provided', () => {
    render(
      <SessionProvider sessionUser={{}}>
        <TestComponent />
      </SessionProvider>
    )
    
    expect(screen.getByTestId('session-data')).toHaveTextContent('{}')
  })

  it('provides complex session object', () => {
    const complexSession = {
      user: 'admin',
      name: 'Admin User',
      priviledge: 'admin',
      email: 'admin@example.com',
      id: 123
    }
    
    render(
      <SessionProvider sessionUser={complexSession}>
        <TestComponent />
      </SessionProvider>
    )
    
    expect(screen.getByTestId('session-data')).toHaveTextContent(JSON.stringify(complexSession))
  })

  it('updates session when sessionUser prop changes', () => {
    const { rerender } = render(
      <SessionProvider sessionUser={{ user: 'user1' }}>
        <TestComponent />
      </SessionProvider>
    )
    
    expect(screen.getByTestId('session-data')).toHaveTextContent(JSON.stringify({ user: 'user1' }))
    
    rerender(
      <SessionProvider sessionUser={{ user: 'user2' }}>
        <TestComponent />
      </SessionProvider>
    )
    
    expect(screen.getByTestId('session-data')).toHaveTextContent(JSON.stringify({ user: 'user2' }))
  })

  it('renders children correctly', () => {
    const mockSession = { user: 'test-user' }
    
    render(
      <SessionProvider sessionUser={mockSession}>
        <div data-testid="child-component">Child Content</div>
      </SessionProvider>
    )
    
    expect(screen.getByTestId('child-component')).toBeInTheDocument()
    expect(screen.getByTestId('child-component')).toHaveTextContent('Child Content')
  })

  it('works with multiple children', () => {
    const mockSession = { user: 'test-user' }
    
    render(
      <SessionProvider sessionUser={mockSession}>
        <div data-testid="child-1">Child 1</div>
        <div data-testid="child-2">Child 2</div>
        <div data-testid="child-3">Child 3</div>
      </SessionProvider>
    )
    
    expect(screen.getByTestId('child-1')).toBeInTheDocument()
    expect(screen.getByTestId('child-2')).toBeInTheDocument()
    expect(screen.getByTestId('child-3')).toBeInTheDocument()
  })

  it('throws error when useSessionContext is used outside provider', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    
    expect(() => {
      render(<TestComponent />)
    }).toThrow('useSessionContext must be used within a SessionProvider')
    
    consoleSpy.mockRestore()
  })

  it('nested providers use nearest provider value', () => {
    const outerSession = { user: 'outer-user' }
    const innerSession = { user: 'inner-user' }
    
    render(
      <SessionProvider sessionUser={outerSession}>
        <TestComponent />
        <SessionProvider sessionUser={innerSession}>
          <div data-testid="inner-component">
            <TestComponent />
          </div>
        </SessionProvider>
      </SessionProvider>
    )
    
    // The outer TestComponent should get outer session
    const outerComponents = screen.getAllByTestId('session-data')
    expect(outerComponents[0]).toHaveTextContent(JSON.stringify(outerSession))
    
    // The inner TestComponent should get inner session
    expect(outerComponents[1]).toHaveTextContent(JSON.stringify(innerSession))
  })
})
