# Contract Management System - Frontend (Vite + React)

A modern web application for managing contracts built with React, Vite, and Tailwind CSS. The system allows users to upload, view, edit, and manage contracts with real-time updates through WebSocket integration.

## Features

- Upload contract data in text or JSON format
- View and manage contract listings with status indicators
- Search and filter contracts
- Real-time contract status updates
- Responsive design for all devices

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- Socket.IO Client
- React Query
- React Hook Form

## Prerequisites

- Node.js 18.x or higher
- npm or yarn
- Modern web browser

## Getting Started

1. Clone the repository:

```js
git clone https://github.com/yourusername/contract-management-frontend.git
cd contract-management-frontend
```

2. Install dependencies:

```js
npm install
# or
yarn install
```

3. Create a .env file in the root directory:

```js
VITE_API_URL=http://localhost:5000/api
VITE_WS_URL=http://localhost:5000
VITE_SUPABASE_URL=https://onxpboirptzumzbfryxp.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ueHBib2lycHR6dW16YmZyeXhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc5NjExNTQsImV4cCI6MjA1MzUzNzE1NH0.3L8NOuiqN2WSH-DHqGzMm2OMZGQMrGufZ6P6XCeVnKI
```

4. Start the development server:

```js
npm run dev
# or
yarn dev
```

The application will be available at http://localhost:5173
