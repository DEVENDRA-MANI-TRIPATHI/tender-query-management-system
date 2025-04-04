import { useState } from 'react'
import './App.css'
import ChatBox from './components/Chatbox'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='bg-gray-900 min-h-screen'>
      <div className='flex items-center justify-center'>
        <h1 className='text-blue-400 text-2xl p-1'>Tender Query management System</h1>
      </div>
      <ChatBox/>
    </div>
  )
}

export default App
