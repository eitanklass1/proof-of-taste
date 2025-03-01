import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { WagmiConfig } from './wagmi';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WagmiConfig>
      <App />
    </WagmiConfig>
  </StrictMode>,
)
