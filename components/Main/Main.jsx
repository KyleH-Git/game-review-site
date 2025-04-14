import Reviews from "../Reviews/Reviews";
import LoginForm from "../LoginForm/LoginForm";
import SignupForm from "../SignupForm/SignupForm";
import ReviewForm from "../ReviewForm/ReviewForm";

const Main = (props) => {
    return (
     
        <main>
        {props.page === 'home' ? <Reviews /> : <></>}
        {props.page === 'login' ? <LoginForm setUser={props.setUser}/> : <></>}
        {props.page === 'signup' ? <SignupForm setUser={props.setUser}/> : <></>}
        {props.page === 'reviewform' ? <ReviewForm gameData={props.gameData}/> : <></>}

        </main>
  
    );
};

export default Main;