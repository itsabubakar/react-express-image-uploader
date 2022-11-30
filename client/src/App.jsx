import { useState } from 'react'
import DragDropFile from './components/DragDropFile'
import ImageIcon from './icons/ImageIcon'


const App = () => {
  return (
    <main className='bg-[#fafafb] flex justify-center h-screen items-center'>
      <DragDropFile />
    </main>
  )
}
export default App
