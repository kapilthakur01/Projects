import { useState } from 'react'
import './App.css'

function App() {
  let [count, setCount] = useState(0); // useState -> Hook
  const addValue = ()=>{
    setCount(count+1);                // Automatically update value of count in UI
  }
  const deleteValue = ()=>{
    if(count>0) setCount(count-1);
  }

  return (
    <> 
    <h1>Counter</h1>
    <h2> Count is : {count}</h2>
      <button onClick={addValue}>Increase</button>
      <button onClick={deleteValue}>Decrease</button>
    </>
  )
}

export default App
