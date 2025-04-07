import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../../../App';
import styles from '../../../App.css?inline';

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

    const root = ReactDOM.createRoot(mountPoint);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }
} 