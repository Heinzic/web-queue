import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

async function deferRender() {
  if (import.meta.env.DEV) {
    const worker = await import('./mocks/browser')
    worker.default.start()
  }
}

const queryClient = new QueryClient();

deferRender().then(() => {
    ReactDOM.createRoot(document.getElementById('root')!).render(
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
              <App />
          </Provider>
        </QueryClientProvider>
      </React.StrictMode>,
  )
})
