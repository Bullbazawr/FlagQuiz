import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './componets/HomePage/Home'
import { QueryClient, QueryClientProvider, } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  },
})


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  </React.StrictMode>
)