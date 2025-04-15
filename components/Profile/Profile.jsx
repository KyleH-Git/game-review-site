import { useState, useEffect } from 'react'

const GameView = (props) => {

    const [userReviews, setUserReviews] = useState([]);

    useEffect(() => {
        const getUserReviews = async () => {
            const response = await fetch(`http://34.228.71.240:3000/reviews/${props.user.accountName}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json'
                },
            }) // Update to AWS Server link after initialization
            const JSONdata = await response.json()
            setUserReviews(JSONdata || [])
            console.log(JSONdata.results) // Shows Games Data fields in array to pull from 
          }
          getUserReviews();
    }, [])

    return (
        <>
        <p>Profile</p>
        {userReviews.map((review) => {
            <>
                <p>reviews stuff</p>
                <p>{review.title}</p>
            </>
        })}
        </>

    )
}

export default GameView