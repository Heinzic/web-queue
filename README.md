# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

# Web Queue Component

A web component for appointment booking and management.

## Integration

You can integrate this component in two ways:

### 1. Using the Web Component

Add the following script to your HTML:

```html
<script type="module" src="https://your-domain.com/web-queue.js"></script>
```

Then use the component in your HTML:

```html
<web-queue></web-queue>
```

### 2. Using an iframe

You can also embed the application using an iframe:

```html
<iframe 
  src="https://your-domain.com/queue" 
  style="width: 100%; height: 500px; border: none;"
  title="Appointment Booking"
></iframe>
```

## Styling

The component automatically adapts to its container size. You can specify dimensions in your HTML:

```html
<div style="width: 500px; height: 600px;">
  <web-queue></web-queue>
</div>
```

## Routes

The application uses hash-based routing which is compatible with both iframes and web components:

- Home: `#/`
- Book Appointment: `#/book-appointment`
- Cancel Appointment: `#/cancel-appointment`
