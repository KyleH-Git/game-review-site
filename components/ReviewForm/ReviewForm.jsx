import { useState } from 'react'

const ReviewForm = (props) => {

    const [newReview, setReviewForm] = useState({title: '', body: '', stars: null})

    const handleChange = (evt) => {
        evt.preventDefault()
        setReviewForm({ ...newReview, [evt.target.name]: evt.target.value})
        console.log(newReview)
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();

        // Set logic to app.post new review submissions into Reviews Database
        setReviewForm({title: '', body: '', stars: null}) // reset submission
        props.showRequestForm(false)
    }

    return (
        <div>
            <form>
                <label name="title"> Review Title:   
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
        </div>
        );
};

export default ReviewForm;