import { useState, useEffect } from 'react'

const GameView = (props) => {

    const [userReviews, setUserReviews] = useState([]);

    useEffect(() => {
        const getUserReviews = async () => {
            const response = await fetch(`http://3.80.194.147:3000/reviews/${props.user.accountName}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json'
                },
            }) // Update to AWS Server link after initialization
            const JSONdata = await response.json()
            setUserReviews(JSONdata || [])
          }
          getUserReviews();
    }, [])

    return (
        <>
        <p>Profile</p>
        {console.log(userReviews)}
        {userReviews.map((review) => {
            return(
            <>
                <p>reviews stuff</p>
                <p>{review.title}</p>
                <button>Edit</button>
                <button>Delete</button>
            </>
            )
        })}
        </>

    )
}

export default GameView