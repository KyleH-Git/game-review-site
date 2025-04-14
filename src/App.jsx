import { useState, useEffect } from 'react'
import './App.css'

import Header from '../components/Header/Header';
import Main from '../components/Main/Main';
import ReviewForm from '../components/ReviewForm/ReviewForm'

function App() {

  const [page, setPage] = useState('home');
  const [user, setUser] = useState(false);
  const [userReviews, addUserReview] = useState([])
  const [isReviewForm, showRequestForm] = useState(false)

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

  const handleViewForm = () => {
    showRequestForm(true)
  }

  return (
    <>
    <Header setPage={setPage} user={user}/>
    {isReviewForm ? null : <button onClick={handleViewForm}>Create New Review</button>}
    <Main page={page} setUser={setUser}/>

    {isReviewForm ? <ReviewForm reviews={userReviews} addUserReview={addUserReview} showRequestForm={showRequestForm}/>: null}
    {console.log(page)}
    {console.log(user)}
    
    {user === true ? <> <h1>RAWG Games API</h1> {/* Create games view component and review form creation */}
    {gamesData.results.map((game) => (
      <h2 key={game.id}>{game.name}</h2>
    ))} </>: <></>}
    {/* Code showing the Games API first set of 20 results */}
   
    </>
  )
}

export default App
