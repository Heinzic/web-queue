import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../../../App';
import styles from '../../../App.css?inline';
import { Provider } from 'react-redux';
import { store } from '../../../store/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export class WebQueueComponentBase extends HTMLElement {
  protected shadow: ShadowRoot;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    this.setupStyles();
    this.renderReactApp();
  }

  private setupStyles() {
    const styleSheet = new CSSStyleSheet();
    styleSheet.replaceSync(styles);
    this.shadow.adoptedStyleSheets = [styleSheet];
  }

  private renderReactApp() {
    const mountPoint = document.createElement('div');
    this.shadow.appendChild(mountPoint);

    const queryClient = new QueryClient();
    const root = ReactDOM.createRoot(mountPoint);
    root.render(
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <App />
          </Provider>
        </QueryClientProvider>
      </React.StrictMode>
    );
  }
} 