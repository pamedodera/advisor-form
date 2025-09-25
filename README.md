# Advisor Form

A modern React TypeScript application for building advisor forms, built with your complete UI kit and design system from ui-kit-v1.

## 🚀 Project Overview

This project combines the robust setup from **clio-landing-page** with all the battle-tested UI components from **ui-kit-v1**, creating a perfect foundation for building sophisticated form interfaces.

## ✅ What's Included

### Core Stack
- **React 19** with TypeScript for modern development
- **Vite 7** for lightning-fast development and builds
- **Tailwind CSS v4** with custom design system
- **React Router** for navigation
- **ESLint** for code quality

### UI Components (35+ components)
- **Form Components**: Button, Input, Select, Textarea, Checkbox, RadioGroup, Switch
- **Layout Components**: Layout, Sidebar, Tabs, Breadcrumbs
- **Feedback Components**: Toast, Dialog, Popover, InlineBanner, InlineMessage, Tooltip
- **Display Components**: Badge, Tag, Loader, Disclosure
- **Data Components**: DefinitionList, DefinitionItem, DefinitionDetail

### Design System
- **Inter Font** with optimized loading
- **Custom Color Palette**: Night Sky Blue, Neutral, Red, Dark Blue, Blue, Green, Yellow
- **Typography Utilities**: H1-H6, body text, labels, buttons, links
- **Spacing System**: Custom spacing tokens (0-16)
- **Border Radius**: From sm (2px) to full (9999px)
- **Focus Styles**: Accessible focus rings with proper contrast

### Assets
- **59 SVG Icons** ready to use with SVGR
- **Accessible Components** with proper ARIA labels
- **Error Boundaries** for robust error handling

## 🛠️ Development

### Prerequisites
- Node.js 18+
- npm

### Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint

# Preview production build
npm run preview
```

### Development Server
The development server runs on `http://localhost:5173` with hot module replacement (HMR) enabled.

## 📁 Project Structure

```
src/
├── components/           # UI components from ui-kit-v1
│   ├── types/           # Component type definitions
│   ├── molecules/       # Complex composed components
│   ├── Button.tsx       # Enhanced with children support
│   ├── Input.tsx        # Form input component
│   ├── Layout.tsx       # Page layout wrapper
│   └── ...             # 30+ other components
├── assets/
│   └── icons/          # 59 SVG icons
├── pages/              # Page components
│   └── HomePage.tsx    # Welcome page
├── types/              # TypeScript type definitions
└── index.css           # Design system styles
```

## 🎨 Using the Design System

### Colors
The design system includes semantic color tokens:

```tsx
// Primary actions
bg-dark-blue-0 text-white

// Secondary actions
bg-white border-night-sky-blue-3 text-night-sky-blue-dark-4

// Success states
bg-green-0 text-white

// Error states
bg-red-0 text-white
```

### Typography
Use semantic typography classes:

```tsx
<h1 className="typography-h1">Main Heading</h1>
<p className="typography-body-text">Body text</p>
<span className="typography-label">Form label</span>
```

### Components
All components are fully typed and accessible:

```tsx
import Button from './components/Button'
import Input from './components/Input'
import Dialog from './components/Dialog'

// Button with multiple variants
<Button appearance="primary" size="large">
  Submit Form
</Button>

// Form input with validation
<Input
  label="Email Address"
  type="email"
  placeholder="Enter your email"
  required
/>
```

## 🧪 Next Steps

This foundation is ready for:
- Multi-step form workflows
- Form validation and state management
- Data collection and submission
- Integration with APIs
- Advanced form patterns

## 📋 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎯 Built With

- React 19.1.1
- TypeScript 5.8.3
- Vite 7.1.7
- Tailwind CSS 4.1.13
- React Router DOM 6.30.1
- Headless UI 2.2.8

---

Ready to build amazing advisor forms! 🚀
