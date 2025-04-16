import { useState } from 'react'

const GameSearch = ({setPage, gameData, setGameData}, props) => {

  const [searchGameURL, setSearchGameURL] = useState('') // State Variables to guide search of games
  
  const handleClick = (game, evt) =>  { // Sends user to Create Review Page
    setGameData({
      gameName: game.name,
      gameRating: game.rating,
      gameId: game.id,
      gameImg: game.background_image,
      gameReleased: game.released,
      gameGenre: game.genres,
    })
    // console.log(gameData) // Log game data that review is made on
    if (evt.target.name === 'reviewform') {
        setPage('reviewform');
    }
    else if (evt.target.name === 'gamereviews') {
        setPage('gamereviews')
    }
    
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
          <button name='reviewform' onClick={(evt) => handleClick(game, evt)}>Write Review</button>
          <button name='gamereviews' onClick={(evt) => handleClick(game, evt)}>See Written Reviews</button>
        </div>
      ))
    }
        <a href="https://rawg.io/" target="_blank"> Powered by RAWG.io</a>
    </div>
  )   
}

export default GameSearch