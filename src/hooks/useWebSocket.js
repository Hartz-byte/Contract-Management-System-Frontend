import { useEffect } from "react";
import { io } from "socket.io-client";
import { useQueryClient } from "@tanstack/react-query";

// const SOCKET_URL = "http://localhost:5000";
const SOCKET_URL = "https://contract-management-system-backend.vercel.app";

export default function useWebSocket() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const socket = io(SOCKET_URL);

    // connection check
    socket.on("connect", () => {
      console.log("Connected to WebSocket");
    });

    // disconnection check
    socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket");
    });

    // error check
    socket.on("error", (error) => {
      console.error("WebSocket error:", error);
    });

    // create contract
    socket.on("contractCreated", () => {
      queryClient.invalidateQueries("contracts");
    });

    // update contract
    socket.on("contractUpdated", () => {
      queryClient.invalidateQueries("contracts");
    });

    // delete contract
    socket.on("contractDeleted", () => {
      queryClient.invalidateQueries("contracts");
    });

    return () => {
      socket.disconnect();
    };
  }, [queryClient]);
}
