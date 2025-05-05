// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server:{
//     proxy:{
//       "/api":{
//         target:"https://netflix-clone-1-mhwl.onrender.com",
//       }
//     }
//   }
// })


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://netflix-clone-1-mhwl.onrender.com",
        changeOrigin: true,  // Add this
        secure: false,  // In case of SSL issues
        rewrite:(path)=>path
      }
    }
  }
})
