import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import AppLayout from './AppLayout'

const queryClient = new QueryClient()
describe('AppLayout', () => {
  test('renders Applayout component', () => {
    render(<>
      <QueryClientProvider client={queryClient}>
        <AppLayout title="Programs">
          <>Layout</>
        </AppLayout>
        ,
      </QueryClientProvider>
           </>)

    expect(screen.getByTestId('AppLayout-logo')).toHaveClass('logo')
  })
})
