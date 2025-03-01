import React from 'react'
import { Input } from "@/components/ui/input"
import { Button } from './ui/button'

function Upload({ isConnected }) {
  return (
    <div className='flex items-center space-x-4 max-w-md mx-auto p-6'>
      <Input type="email" placeholder="Enter URL here..." className="flex-grow" />
      {isConnected ? <Button>Upload</Button> : <Button disabled>Upload</Button>}
      
    </div>
  )
}

export default Upload