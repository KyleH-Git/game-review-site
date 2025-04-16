const EditReview = (props) => {

    const handleChange = (evt) => { // handles the form submission values that the user is inputting
        evt.preventDefault()
        props.setReviewForm({ ...props.reviewForm, [evt.target.name]: evt.target.value})
        // console.log(newReview)
    }

    const handleSubmit = async (evt) => { // New Review submission logic
        evt.preventDefault();
        
        try {
            const Response = await fetch(`http://3.80.194.147:3000/reviews/${props.reviewForm.reviewId}/edit`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    stars: props.reviewForm.stars,
                    title: props.reviewForm.title,
                    body: props.reviewForm.body,
                })
              })
              
          
            if (Response) {
                props.setReviewForm({gameId: '', title: '', body: '', stars: null}) // resets submission form
                props.setProfileForm('') // Navigates back to main page
                // console.log('Check Game Id: ', newReviewSubmission)
            }
            props.setClicked(true)

        } catch (err) {

            console.log(err);
        }
    }
    return (
        <>
        <p>Edit Review</p>
        <form>
                <label name="title">Review Title: 
                    <input
                    type="text"
                    name='title'
                    value={props.reviewForm.title}
                    onChange={handleChange}
                    />
                </label><br/><br/>
                <label name="body">Review:<br/>
                    <textarea 
                    rows="6"
                    cols="50"
                    type="text"
                    name='body'
                    value={props.reviewForm.body}
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
        </>
    );
};

export default EditReview;