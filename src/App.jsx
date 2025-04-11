import { useState, useEffect } from 'react'
import './App.css'

function App() {

  /* ---PULL FROM GAMES DATA API--- */
  const [gamesData, setGamesData] = useState({results:[]}); // Pull of all data in the Games API array
  
  useEffect(() => {
    const getData = async () => {
      const response = await fetch(`http://localhost:3060/api/games`) // Update to AWS Server link after initialization
      const JSONdata = await response.json()
      setGamesData(JSONdata || [])
      console.log(JSONdata.results) // Shows Games Data fields in array to pull from 
    }
    getData()
  }, [])

  return (
    <>
    {/* Code showing the Games API first set of 20 results*/}
    <h1>RAWG Games API</h1>
    {gamesData.results.map((game) => (
      <h1 key={game.id}>{game.name}</h1>
    ))}
    </>
  )
}

export default App
