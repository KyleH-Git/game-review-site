import { useState, useEffect } from 'react'
import './Reviews.css'

const Reviews = (props) => {

    const [reviews, setReviews] = useState([]);

    useEffect(() => {

        const getReviews = async () => {


            // Fetch all reviews from DB
            const response = await fetch(`http://34.228.71.240:3060/reviews/`)
            // const response = await fetch(`http://localhost:3000/reviews/`)

            // If successful...
            if (response) {

                // Parse JSON data into review array
                const JSONdata = await response.json()

                // GO through each review...
                for (const reviewObj of JSONdata) {
      
                    // Use reviewObj for the gameAPIId
                    const gameResponse = await fetch(`http://34.228.71.240:3060/api/games/${reviewObj.gameAPIId}`);
                    console.log(gameResponse);
                    const JSONgameData = await gameResponse.json();
                    console.log(JSONgameData);
                        
                    // Add game name to review object
                    reviewObj.gameName = JSONgameData.name;
                    console.log(JSONgameData.name);
                    console.log(reviewObj.gameName);
                    
                }

                setReviews(JSONdata || [])
            }

        }

        getReviews();

    }, [])

    return (

        <div className='reviews-container'>
            {!reviews 
                ? <p>Pick a game to review!</p> 
                : reviews.map((review) => {

                    return (
                        <div key = {review._id} className='review-container'>
                            <h3>{review.gameName}</h3>
                            <h4>{review.title}</h4>
                            <p>by {review.user}</p>
                            <p>{review.body}</p>
                            Stars: {review.stars}
                                    {review.stars === 1 ? <p><img src='/star.svg' className='star'/> </p>: 
                                    review.stars === 2 ? <p><img src='/star.svg' className='star'/> <img src='/star.svg' className='star'/> </p> : 
                                    review.stars === 3 ? <p><img src='/star.svg'  className='star'/> <img src='/star.svg'  className='star'/> <img src='/star.svg' className='star'/> </p> : 
                                    review.stars === 4 ? <p><img src='/star.svg'  className='star'/> <img src='/star.svg'  className='star'/> <img src='/star.svg'  className='star'/> <img src='/star.svg' className='star'/> </p> : 
                                    review.stars === 5 ? <p><img src='/star.svg'  className='star'/> <img src='/star.svg'  className='star'/> <img src='/star.svg'  className='star'/><img src='/star.svg'  className='star'/><img src='/star.svg'  className='star'/> </p>: <></> }

                            <span>Likes: {review.likes}</span><span> Disikes: {review.dislikes}</span>
                            {review.user === props.user.accountName ? <span> <button>Edit </button> <button>Delete </button></span>: <></>}
                        </div>
                    )

                })
            }
        </div>
    )
}

export default Reviews;