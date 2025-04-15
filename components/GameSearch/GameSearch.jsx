import { useState } from 'react'

const GameSearch = ({setPage, gameData, setGameData}, props) => {

  const [searchGameURL, setSearchGameURL] = useState('') // State Variables to guide search of games
  
  const handleClick = (gameName, gameRating, gameId, gameImg, gameReleased, gameGenre) =>  { // Sends user to Create Review Page
    setGameData({
      gameName: gameName,
      gameRating: gameRating,
      gameId: gameId,
      gameImg: gameImg,
      gameReleased: gameReleased,
      gameGenre: gameGenre,
    })
    // console.log(gameData) // Log game data that review is made on
    setPage('reviewform');
  }

  const handleChange = (evt) => { // Catalogs input for search parameter by user
    setSearchGameURL(evt.target.value)
  }

  const handleSearchSubmit = async (event) => { // Fetches data from the Games API
    event.preventDefault();
    let response = await fetch(
        `http://34.228.71.240:3060/api/games/?search=${searchGameURL}`
    )
    let JSONdata = await response.json()
    // console.log(JSONdata) // See specific data search
    setGameData(JSONdata)
  }


  return (
    <div>
        <form onSubmit={handleSearchSubmit}> {/* Search bar to submit new game */}
            <input type='text' onChange={handleChange}/>
            <button type='submit'>Search Games</button>
        </form>
    {!gameData 
    ? <></>
    : gameData.results.map((game) => (
        <div className='game-container' key={game.id}> 
          <img src={game.background_image} style={{ maxWidth: 500}}/>
          <h2> Name: {game.name} Rating: {game.rating} Metacritic: {game.metacritic}</h2>
          <button onClick={() => handleClick(game.name, game.rating, game.id, game.background_image, game.released, game.genres)}>Write Review</button>
        </div>
      ))
    }
        <a href="https://rawg.io/" target="_blank"> Powered by RAWG.io</a>
    </div>
  )   
}

export default GameSearch