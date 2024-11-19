import logo from '../assets/troll-face-logo.svg';

export default function Header(){
    return(
        <nav>
            <img className='nav-logo' src={logo}></img>
            <h1>Meme Generator</h1>
        </nav>
    )
}
