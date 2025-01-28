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

## Supabase Setup (for your own supabase database and credentials or skip this)

1. Create a Supabase Account:

- Go to https://supabase.com
- Sign up for a new account or log in

2. Create a New Project:

- Click "New Project" in the Supabase dashboard
- Choose a name for your project
- Set a secure database password
- Choose your region
- Wait for the project to be created

3. Set Up Database Schema:

- Go to the SQL editor in your Supabase dashboard
- Create the contracts table by running the following SQL:

```js
-- Create contracts table
CREATE TABLE contracts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    contract_id VARCHAR(50) UNIQUE NOT NULL,
    client_name VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'Draft',
    content JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for efficient searching
CREATE INDEX idx_contract_status ON contracts(status);
CREATE INDEX idx_client_name ON contracts(client_name);
CREATE INDEX idx_contract_id ON contracts(contract_id);

-- Create function to update timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updating timestamp
CREATE TRIGGER update_contracts_updated_at
    BEFORE UPDATE ON contracts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
```

4. Get Your API Keys:

- Go to Project Settings > API
- You'll need: Project URL (VITE_SUPABASE_URL) and public key (VITE_SUPABASE_ANON_KEY)

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

3. Create a .env file in the root directory (my supabase credentials):

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
