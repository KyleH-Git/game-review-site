
const Header = (props) => {

    const handleClick = (event) =>{
        props.setPage(event.target.name);
    }

    const handleLogout = async (req, res) => {
        await fetch('http://3.80.194.147:3000/auth/sign-out')
        props.setUser({accountName: ''})
        props.setPage('home')
    }

    const handleGameSearch = () => {
        props.setGameData({results:[]})
        props.setPage('gamesearch')
    }

    return (
        <header>
            <h1>HEader</h1>
            {props.user.accountName === ''
            ? 
            <>
            <button name="login" onClick={handleClick}>Log In</button>
            <button name="signup" onClick={handleClick}>Sign up</button>
            </>
            : 
            <>
            <button name="profile" onClick={handleClick}>Profile</button>
            <button onClick={handleGameSearch}>Game Search</button>
            <button name="signout" onClick={handleLogout}>Log-Out</button>
            </>
            }
            
        
        </header>

    );
};

export default Header;