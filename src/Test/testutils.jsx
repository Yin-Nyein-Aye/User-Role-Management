import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import dataReducer from '../features/data/dataSlice'

export function renderWithProviders(ui, { preloadedState } = {}) {
  const store = configureStore({
    reducer: { data: dataReducer },
    preloadedState,
  })

  const queryClient = new QueryClient()

  return render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        {ui}
      </QueryClientProvider>
    </Provider>
  )
}
