const SignupForm = () => {

    return (
        <form action="http://localhost:3000/auth/sign-up" method="POST">

            <p>Signup form</p>
            <label for="accountName">Account Name:</label>
            <input type="text" name="accountName" id="accountName" required/>

            <label for="userName">User Name:</label>
            <input type="text" name="userName" id="userName" required />

            <label for="password">Password:</label>
            <input type="password" name="password" id="password" required />

            <label for="confirmPassword">Confirm Password:</label>
            <input type="password" name="confirmPassword" id="confirmPassword" required />
            <button type="submit" id="signUpButton">Sign up</button>
        </form>
    );
};

export default SignupForm;