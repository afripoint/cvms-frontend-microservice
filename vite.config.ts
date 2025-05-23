import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: true, gzipSize: true }), // Analyze your bundle
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // Ensure shared React instance
      'react': path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom'),
    },
  },
  build: {
    target: "esnext",
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // FIXED: Include icons with React to prevent forwardRef errors
          if (id.includes('node_modules/react') || 
              id.includes('node_modules/react-dom') ||
              id.includes('node_modules/@heroicons') || 
              id.includes('node_modules/lucide-react') || 
              id.includes('node_modules/react-icons')) {
            return 'vendor-react';  // Combined chunk for React and icons
          }
          
          if (id.includes('node_modules/react-router-dom')) {
            return 'vendor-router';
          }
          
          if (id.includes('node_modules/@reduxjs/toolkit') || id.includes('node_modules/react-redux')) {
            return 'vendor-redux';
          }
          
          // HTTP and data fetching
          if (id.includes('node_modules/axios')) {
            return 'vendor-http';
          }
          
          // File processing libraries
          if (id.includes('node_modules/xlsx') || id.includes('node_modules/papaparse')) {
            return 'vendor-file-processing';
          }
          
          // UI utilities
          if (id.includes('node_modules/class-variance-authority') || 
              id.includes('node_modules/clsx') || 
              id.includes('node_modules/tailwind-merge') ||
              id.includes('node_modules/tailwindcss-animate')) {
            return 'vendor-ui-utils';
          }
          
          // App modules chunking - break down by feature
          if (id.includes('/app/modules/auth/')) {
            return 'app-auth';
          }
          
          if (id.includes('/app/modules/cart/')) {
            return 'app-cart';
          }
          
          if (id.includes('/app/modules/report/')) {
            return 'app-report';
          }
          
          if (id.includes('/app/pages/')) {
            return 'app-pages';
          }
          
          // Any other large dependencies can be chunked specifically
          if (id.includes('node_modules/some-large-dependency')) {
            return 'vendor-special';
          }
        }
      }
    },
    chunkSizeWarningLimit: 1000,  // Increase if needed
  },
  // Improve development experience
  server: {
    open: true,
    hmr: true,
  },
  // Add these for better performance
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "@reduxjs/toolkit",
      "react-redux",
      // Include icon libraries for better optimization
      "lucide-react",
      "@heroicons/react",
      "react-icons"
    ],
  },
});