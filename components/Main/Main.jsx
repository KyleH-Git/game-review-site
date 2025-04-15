import Reviews from "../Reviews/Reviews";
import LoginForm from "../LoginForm/LoginForm";
import SignupForm from "../SignupForm/SignupForm";
import ReviewForm from "../ReviewForm/ReviewForm";
import Profile from "../Profile/Profile.jsx"

const Main = (props) => {
    return (
     
        <main>
        {props.page === 'home' ? <Reviews /> : <></>}
        {props.page === 'login' ? <LoginForm setUser={props.setUser} setPage={props.setPage}/> : <></>}
        {props.page === 'signup' ? <SignupForm setUser={props.setUser} setPage={props.setPage}/> : <></>}
        {props.page === 'reviewform' ? <ReviewForm setPage={props.setPage} gameData={props.gameData} userGameReview={props.userGameReview} setUserGameReview={props.setUserGameReview}/> : <></>}
        {props.page === 'profile' ? <Profile user={props.user}/> : <></>}

        </main>
  
    );
};

export default Main;