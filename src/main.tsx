import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { theme } from './ui'
import { ThemeProvider } from '@emotion/react'
import { Provider } from 'react-redux'
import { store } from './store/store'

async function deferRender() {
  if (import.meta.env.DEV) {
    const worker = await import('./mocks/browser')
    worker.default.start()
  }
}

deferRender().then(() => {
    ReactDOM.createRoot(document.getElementById('root')!).render(
      <React.StrictMode>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </Provider>
      </React.StrictMode>,
  )
})
