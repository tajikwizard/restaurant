import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useSelector } from "react-redux";

const Header = () => {
  const cart = useSelector((state) => state.cart);
  console.log(cart);
  return (
    <header className="h-20 flex justify-between items-center fixed top-0 w-full z-50">
      <div className="logo__container ">
        <Link to="/">
          <img src={logo} className="h-20" />
        </Link>
      </div>
      <ul className="flex justify-between text-2xl mx-8">
        <li className="p-2 hover:text-yellow-500 cursor-pointer">
          <Link to="/">Home</Link>
        </li>
        <li className="p-2 hover:text-yellow-500 cursor-pointer">About</li>
        <li className="p-2 hover:text-yellow-500 cursor-pointer">Contact</li>
        <li className="p-2 hover:text-yellow-500 cursor-pointer">
          <Link to="/cart">Cart 🛒 </Link>
          <span className=" font-bold inline-block w-8 h-8 text-md  text-center leading-6 bg-slate-400 text-white rounded-full">
            {cart.length}
          </span>
        </li>
      </ul>
    </header>
  );
};
export default Header;
