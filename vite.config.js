import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
  ],
})

//Open the browser when the server is running
process.env.BROWSER = "chrome";
process.env.BROWSER_ARGS = "--incognito";