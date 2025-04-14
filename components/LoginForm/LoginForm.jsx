const LoginForm = (props) => {
    const handleSubmit = (event) => {
        event.preventDefault();
        props.setUser(true);
    }

    return (
        <form onSubmit={handleSubmit}>
            <p>login form</p>
            <button type='submit'>Submit!</button>
        </form>
    );
};

export default LoginForm;