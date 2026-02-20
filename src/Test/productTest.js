import { render, screen } from '@testing-library/react'
import ProductPost from '../pages/Products'

describe('ProductPost Component', () => {
  it('renders product details correctly', () => {
    const product = {
      title: 'Laptop',
      description: 'High performance laptop',
    }

    render(<ProductPost product={product} />)

    expect(screen.getByText('Laptop')).toBeInTheDocument()
    expect(screen.getByText('High performance laptop')).toBeInTheDocument()
    expect(screen.getByText('$1200')).toBeInTheDocument()
  })
})
