import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        // target: "http://localhost:5000",
        target: "https://contract-management-system-backend.vercel.app",
        changeOrigin: true,
      },
      "/socket.io": {
        // target: "http://localhost:5000",
        target: "https://contract-management-system-backend.vercel.app",
        changeOrigin: true,
        ws: true,
      },
    },
  },
  base: "/",
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
  },
});
