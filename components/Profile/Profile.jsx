import { useState, useEffect } from 'react'
import EditReview from '../EditReview/EditReview';
import EditUsername from '../EditUsername/EditUsername';

const GameView = (props) => {

    const [userReviews, setUserReviews] = useState([]);
    // const [profileForm, setProfileForm] = useState('');
    const [reviewForm, setReviewForm] = useState({ // new review form state variable
        reviewId: '',
        gameId: '',
        title: '', 
        body: '', 
        stars: null})
    const [clicked, setClicked] = useState(false);

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
            setClicked(false);
          }
          getUserReviews();
    }, [clicked])

    const handleClick = async (event) => {
        console.log(event.target)
        if(event.target.name === 'edit-username'){
            props.setProfilePage('edit-username');
        } else if(event.target.name === 'review-edit'){
            props.setProfilePage('review-edit');
            setReviewForm({
                gameId: event.target.parentElement.value,
                reviewId: event.target.value,
                title: event.target.parentElement.childNodes[0].innerText,
                body: event.target.parentElement.childNodes[1].innerText,
                stars: event.target.parentElement.childNodes[2].innerText,
            });
            setClicked(true);
        } else if (event.target.name === 'review-delete') {
            console.log(event.target.value)
            
            await fetch(`http://3.80.194.147:3000/reviews/${event.target.value}`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json'
                },
              })
              setClicked(true);
        }
    }

    return (
        <>
        <p> {props.user.userName} Profile</p>
        <p> Account: {props.user.accountName}</p>
        {props.profilePage === '' ? 
        <>
        <button name="edit-username" onClick={handleClick}>Change Username</button>
        {console.log(userReviews)}
        {userReviews.map((review) => {
            return(
                
            <div name={review._id} value={review.gameAPIId} key={review._id}>
                {console.log(review._id)}
                <p>{review.title}</p>
                <p>{review.body}</p>
                <p>{review.stars}</p>
                <button name="review-edit"onClick={handleClick} value={review._id}>Edit</button>
                <button name="review-delete"onClick={handleClick} value={review._id}>Delete</button>
            </div>
            )
        })} </> : 
        <>
            {props.profilePage === 'edit-username' ? <EditUsername setProfileForm={props.setProfilePage} user={props.user} setUser={props.setUser}/> 
            : <EditReview 
            setProfileForm={props.setProfilePage} 
            setReviewForm={setReviewForm}
            setClicked={setClicked}
            reviewForm={reviewForm}

            />}
        </>
        }
        </>

    )
}

export default GameView