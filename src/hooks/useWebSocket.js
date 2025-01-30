import { useEffect } from "react";
import { io } from "socket.io-client";
import { useQueryClient } from "@tanstack/react-query";

// const SOCKET_URL = "http://localhost:5000";
const SOCKET_URL = import.meta.env.VITE_WS_URL;

export default function useWebSocket() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const socket = io(SOCKET_URL, {
      transports: ["polling"],
      withCredentials: true,
      secure: true,
      reconnection: true,
      reconnectionAttempts: 5,
      timeout: 10000,
    });

    // attempt connection check
    socket.io.on("reconnect_attempt", () => {
      console.log("Attempting to reconnect...");
    });

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
