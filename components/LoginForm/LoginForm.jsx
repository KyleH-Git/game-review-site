const LoginForm = (props) => {

    const handleSubmit = async (event) => {
        try {

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

            if (Response) {

                event.target.elements.accountName.value = '';
                event.target.elements.userName.value = '';
                event.target.elements.password.value = '';
                
                const signedInUser = await Response.json();
               
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
            <label htmlFor="accountName">Account Name:</label>
            <input type="text" name="accountName" id="accountName" required />

            <label htmlFor="userName">User Name:</label>
            <input type="text" name="userName" id="userName" required />

            <label htmlFor="password">Password:</label>
            <input type="password" name="password" id="password" required />

            <button type="submit" id="signUpButton">Submit! </button>
        </form>
    );

};

export default LoginForm;