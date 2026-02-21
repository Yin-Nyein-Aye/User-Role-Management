import { screen } from '@testing-library/react'
import Products from '../pages/Products'
import { renderWithProviders } from './testutils'

// Mock your custom hook
vi.mock('../hooks/usePaginatedQuery', () => ({
  usePaginatedQuery: () => ({
    data: {
      products: [
        { id: 1, title: 'Bread', description: 'Fresh bread' },
        { id: 2, title: 'Cake', description: 'Delicious cake' },
      ],
      total: 2,
    },
    isLoading: false,
    isError: false,
    error: null,
  }),
}))

test('renders products list', () => {
  renderWithProviders(<Products />)

  expect(screen.getByText('Bread')).toBeInTheDocument()
  expect(screen.getByText('Cake')).toBeInTheDocument()
})
