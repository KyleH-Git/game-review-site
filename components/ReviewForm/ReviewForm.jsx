import { useState } from 'react'

const ReviewForm = ({gameData, setPage, userGameReview, setUserGameReview, user}) => {

    const [newReview, setReviewForm] = useState({ // new review form state variable
        gameId: '',
        title: '', 
        body: '', 
        stars: null})

    const handleChange = (evt) => { // handles the form submission values that the user is inputting
        evt.preventDefault()
        setReviewForm({ ...newReview, [evt.target.name]: evt.target.value})
        console.log(newReview)
    }

    const handleSubmit = async (evt) => { // New Review submission logic
        evt.preventDefault();
        
        const newReviewSubmission = { // handles the addition of the gameId into the new review submission 
            ...newReview,
            gameId: gameData.gameId
        }
        
        setUserGameReview(prev => [...prev, newReviewSubmission]) // Logic to set the game review into the state variable 
        
        // Set logic to app.post new review submissions into Reviews Database
        try {
            
            // Send create new review req to db, and catpure response. 
            const Response = await fetch("http://3.80.194.147:3000/reviews/new", {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user: user.accountName, 
                    gameAPIId: newReviewSubmission.gameId,
                    stars: newReviewSubmission.stars,
                    title: newReviewSubmission.title,
                    body: newReviewSubmission.body,
                    likes: 0,
                    dislikes: 0
                })
              })
              
            // If login was successful...
            if (Response) {

                setReviewForm({gameId: '', title: '', body: '', stars: null}) // resets submission form
                setPage('home') // Navigates back to main page
                console.log('Check Game Id: ', newReviewSubmission)
            }

        } catch (err) {

            console.log(err);

        } 
            
    }

    return (
        <div>
            <button onClick={() => console.log(userGameReview)}>Check Game Reviews</button> {/* Logic to test checking game review */}
            <div className='game-container' key={gameData.gameId}>
                <img src={gameData.gameImg} style={{ maxWidth: 500}}/>
                <h2>{gameData.gameName}</h2>
                <p>Overall Rating: {gameData.gameRating}</p>
                <p>Date Released: {gameData.gameReleased}</p>
                <div id='genreBox'> 
                    <p>Genre: {gameData.gameGenre.map((genre) => (
                        genre.name + ' '
                    ))}
                    </p>
            </div>
        </div>
            <form>
                <label name="title">Review Title: 
                    <input
                    type="text"
                    name='title'
                    placeholder={`${'userName'}'s review`}
                    value={newReview.title}
                    onChange={handleChange}
                    />
                </label><br/><br/>
                <label name="body">Review:<br/>
                    <textarea 
                    rows="6"
                    cols="50"
                    type="text"
                    name='body'
                    value={newReview.body}
                    placeholder="Type Review Here"
                    onChange={handleChange}>
                    </textarea>
                </label><br/><br/>
                <label name="stars">
                    <button name='stars' value={1} onClick={handleChange}>1 Star</button>
                    <button name='stars' value={2} onClick={handleChange}>2 Stars</button>
                    <button name='stars' value={3} onClick={handleChange}>3 Stars</button>
                    <button name='stars' value={4} onClick={handleChange}>4 Stars</button> 
                    <button name='stars' value={5} onClick={handleChange}>5 Stars</button> 
                </label>
                <br/><br/>
                <button onClick={handleSubmit}>Submit New Review</button>
            </form>
            <div>
            <h3>{`USERNAME'S`} Submitted Reviews</h3> {/* Testing purposes only: views all game reviews created */}
            {userGameReview.map((review, index) => (
                <div key={index} style={{border: '1px solid gray', padding: '1rem', margin: '0.5rem 0'}}>
                <h4>{review.title}</h4>
                <p>{review.body}</p>
                <p>Stars: {review.stars}</p>
                <p>Game ID: {review.gameId}</p>
                </div>
            ))}
            </div>
        </div>
        
        );
};

export default ReviewForm;