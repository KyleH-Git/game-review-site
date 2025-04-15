import Reviews from "../Reviews/Reviews";
import LoginForm from "../LoginForm/LoginForm";
import SignupForm from "../SignupForm/SignupForm";
import ReviewForm from "../ReviewForm/ReviewForm";
import GameSearch from "../GameSearch/GameSearch";
import Profile from "../Profile/Profile.jsx"

const Main = (props) => {
    return (
    <>
        <main>
        {props.page === 'home' ? <Reviews /> : <></>}
        {props.page === 'login' ? <LoginForm setUser={props.setUser} setPage={props.setPage}/> : <></>}
        {props.page === 'signup' ? <SignupForm setUser={props.setUser} setPage={props.setPage}/> : <></>}
        {props.page === 'reviewform' ? <ReviewForm setPage={props.setPage} setGameData={props.setGameData} gameData={props.gameData} userGameReview={props.userGameReview} setUserGameReview={props.setUserGameReview} user={props.user}/> : <></>}
        {props.page === 'gamesearch' ? <GameSearch setPage={props.setPage} setGameData={props.setGameData} gameData={props.gameData} /> : <></>}
        {props.page === 'profile' ? <Profile user={props.user}/> : <></>}

        </main>
     </>
    );
};

export default Main;