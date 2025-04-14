
const Header = (props) => {

    const handleClick = (event) =>{
        props.setPage(event.target.name);
    }

    return (
        <header>
            <h1>HEader</h1>
            <button name="login" onClick={handleClick}>Log In</button>
            <button name="signup" onClick={handleClick}>Sign up</button>
        </header>
    );
};

export default Header;