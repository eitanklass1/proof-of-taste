import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "@/components/ui/button"
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useDisconnect, useAccount } from 'wagmi';
import Upload from "./components/Upload"


function App() {
  const [count, setCount] = useState(0);
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();

  return (
    <div>
      <div className="fixed top-0 right-0 p-4 flex items-center gap-2">
        <ConnectButton showBalance={false} />
        {isConnected && (
          <Button 
            variant="destructive" 
            size="sm" 
            onClick={() => disconnect()}
          >
            Logout
          </Button>
        )}
      </div>
      
      {/* Rest of your app content */}
      <div className="container mx-auto pt-16">
        {/* Your app content here */}
        <Upload isConnected={isConnected} />
      </div>
    </div>
  );
}

export default App;
