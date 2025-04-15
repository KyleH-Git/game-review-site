const LoginForm = (props) => {

    // Function to run on submission of form
    const handleSubmit = async (event) => {
        try {
            
            // Prevent automatic query to db and page refresh. 
            event.preventDefault();

            
            const Response = await fetch("http://3.80.194.147:3000/auth/sign-in", {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    accountName: event.target.elements.accountName.value,
                    userName: event.target.elements.userName.value,
                    password: event.target.elements.password.value
                })
              })
            
            // If login was successful...
            if (Response) {

                // Initiate form fields 
                event.target.elements.accountName.value = '';
                event.target.elements.userName.value = '';
                event.target.elements.password.value = '';
                
                // Gather user to set (STILL NEEDS TO BE TESTED)
                const signedInUser = await Response.json();
               
                // Set state variable with current user. 
                props.setUser(signedInUser);
                props.setPage('home');
            }

        } catch (err) {

            console.log(err);

        }
    }

    return (
        <form action="http://3.80.194.147:3000/auth/sign-in" method="POST" onSubmit={handleSubmit}>

            <p>login form</p>
            <label>Account Name:</label>
            <input type="text" name="accountName" id="accountName" required />

            <label>User Name:</label>
            <input type="text" name="userName" id="userName" required />

            <label>Password:</label>
            <input type="password" name="password" id="password" required />

            <button type="submit" id="signUpButton">Submit! </button>
        </form>
    );

};

export default LoginForm;