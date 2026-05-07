import { useState } from 'react'
import './App.css'

function App() {
  const [value, setValue] = useState("");
  const [arr, setArr] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  function addTask() {
    if (editIndex !== null) {
      // Update existing task
      const updatedArr = arr.map((item, index) =>
        index === editIndex ? value : item
      );
      setArr(updatedArr);
      setEditIndex(null);
    } else {
      // Add new task
      setArr([...arr, value]);
    }
    setValue("");
  }

  function deleteTask(idx) {
    let newArr = arr.filter((val, i) => i !== idx);
    setArr(newArr);
  }

  function editTask(idx) {
    setValue(arr[idx]);      // put value in input
    setEditIndex(idx);       // store index
  }

  return (
    <>
      <input
        type='text'
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <button onClick={addTask}>
        {editIndex !== null ? "Update" : "Add"}
      </button>

      <ul>
        {arr.map((val, idx) => {
          return (
            <li key={idx}>
              <p style={{ display: "inline-block", margin: "3px" }}>
                {val}
              </p>

              <button onClick={() => editTask(idx)}>Edit</button>

              <button onClick={() => deleteTask(idx)}>Delete</button>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default App