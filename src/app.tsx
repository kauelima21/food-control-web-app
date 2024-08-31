import { RouterProvider } from 'react-router-dom'
import './global.css'
import { router } from './routes'
import { Toaster } from 'sonner'
import { ThemeProvider } from './components/theme/theme-provider'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/react-query'

export function App() {
  return (
    <ThemeProvider storageKey="foodcontrol-theme" defaultTheme="dark">
      <Toaster richColors closeButton />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  )
}
