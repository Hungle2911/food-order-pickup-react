import { Link } from "react-router-dom"
const NavBar = () => {
  return (
    <nav>
  <div className="nav-left">
    <img
      src="https://mystickermania.com/cdn/stickers/anime/howls-castle-calcifer-512x512.png"
      alt="Calcifer Logo"
    />
  </div>
  <div className="nav-mid">
    <h1>Calcifer's Hearth</h1>
  </div>
  <div className="nav-right">
    <Link to="/" className="btn-cart">
      <p>Home</p>
    </Link>
    <p>Contact Us</p>
    <Link to="/menu_items" className="btn-cart">
      <p>Menu</p>
    </Link>
    <p>Login</p>
    <Link to="/cart" className="btn-cart">
      <i className="fa-solid fa-cart-shopping" />
    </Link>
  </div>
</nav>
  )
}

export default NavBar
