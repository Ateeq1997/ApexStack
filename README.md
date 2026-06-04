# Enterprise SaaS Admin Dashboard

Market-standard admin dashboard built with React, TypeScript, Tailwind CSS, React Router, Zustand, and Recharts.

## Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- React Router
- Zustand with localStorage persistence
- Recharts for analytics visuals

## Features

- Overview dashboard with KPI cards, revenue trend chart, and health indicators
- User management with search, filter, sort, role updates, status toggles, pagination
- User profile details page
- Subscription management with plan cards, billing history, invoice generator UI
- Content management with create/edit/delete, draft and published workflow, editor UI
- Notifications center with alerts and activity logs
- Settings for company profile, API keys panel, security options, and theme switcher
- Loading skeletons and error state UI
- Fully responsive sidebar + topbar enterprise layout

## Run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Project Structure

- src/app: routing
- src/components: layout and reusable UI components
- src/data: seed/mock data
- src/pages: module screens
- src/store: global Zustand store
- src/types: shared TypeScript models
- src/utils: formatting helpers
