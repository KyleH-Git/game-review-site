import { useState, useEffect } from 'react'
import './App.css'

import Header from '../components/Header/Header';
import Main from '../components/Main/Main';
import ReviewForm from '../components/ReviewForm/ReviewForm'

function App() {

  const [page, setPage] = useState('home');
  const [user, setUser] = useState({accountName: ''});
  const [gameData, setGameData] = useState({
    gameName: '',
    gameRating: '',
    gameId: '',
    gameImg: '',
    gameReleased: '',
    gameGenre: [],
  })
  const [userGameReview, setUserGameReview] = useState([]) // for testing purposes

  /* ---PULL FROM GAMES DATA API--- */
  const [gamesData, setGamesData] = useState({results:[]}); // Pull of all data in the Games API array
  
  useEffect(() => {
    const getData = async () => {
      const response = await fetch(`http://34.228.71.240:3060/api/games`) // Update to AWS Server link after initialization
      const JSONdata = await response.json()
      setGamesData(JSONdata || [])
      console.log(JSONdata.results) // Shows Games Data fields in array to pull from 
    }
    getData()
  }, [])


  const handleClick = (gameName, gameRating, gameId, gameImg, gameReleased, gameGenre) =>  {
    setGameData({
      gameName: gameName,
      gameRating: gameRating,
      gameId: gameId,
      gameImg: gameImg,
      gameReleased: gameReleased,
      gameGenre: gameGenre,
    })
    setPage('reviewform');
    console.log(gameData)
  }

  return (
    <>
    <Header setPage={setPage} user={user} setUser={setUser}/>
    <Main page={page} setPage={setPage} setUser={setUser} user={user} gameData={gameData} userGameReview={userGameReview} setUserGameReview={setUserGameReview}/>
    {console.log(page)}
    {console.log(user)}
    
    {user.accountName !== '' ? <> <h1>RAWG Games API</h1> {/* Create games view component and review form creation */}
    {gamesData.results.map((game) => (
      <div className='game-container' key={game.id}> 
      <img src={game.background_image} style={{ maxWidth: 500}}/>
      <h2> Name: {game.name} Rating: {game.rating} Metacritic: {game.metacritic}</h2>
      <button onClick={() => handleClick(game.name, game.rating, game.id, game.background_image, game.released, game.genres)}>Create Review</button>
      </div>
    ))} </>: <></>}
    {/* Code showing the Games API first set of 20 results */}
   
    </>
  )
}

export default App
