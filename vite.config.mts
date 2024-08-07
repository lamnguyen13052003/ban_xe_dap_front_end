import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
        hmr: {
            overlay: false,  // Tắt overlay lỗi HMR để dễ dàng phát hiện lỗi trong console
        }
    },
    build: {
        chunkSizeWarningLimit: 10000,
    }
})
