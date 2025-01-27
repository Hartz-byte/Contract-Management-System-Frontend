import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import ContractList from "./components/ContractList";
import ContractUpload from "./components/ContractUpload";
import useWebSocket from "./hooks/useWebSocket";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WebSocketProvider>
        <div className="min-h-screen bg-gray-100">
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <h1 className="text-3xl font-bold text-gray-900 mb-8">
                Contract Management System
              </h1>

              <div className="space-y-8">
                <ContractUpload />
                <ContractList />
              </div>
            </div>
          </div>
        </div>
      </WebSocketProvider>
    </QueryClientProvider>
  );
}

function WebSocketProvider({ children }) {
  useWebSocket();

  return children;
}
