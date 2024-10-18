import React, { useEffect, useState } from 'react'
import axios from 'axios'


const App = () => {
  const [jokes, setJokes] = useState([])
  
  useEffect(() => {
    axios.get('/api/jokes')
      .then(res => setJokes(res.data))
      .catch(err => console.log(err))
  }, [])

  return (
    <div>
      <h1>Jokes</h1>
      {jokes.map((joke, index) => (
        <div key={index}>
          <p><strong>Setup:</strong> {joke.setup}</p>
          <p><strong>Punchline:</strong> {joke.punchline}</p>
        </div>
      ))}
    </div>
  )
}
export default App